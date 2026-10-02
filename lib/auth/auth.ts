import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { getDatabase } from '../db/store';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'jandy-academic-vintage-dark-academia-secret-key-2026-biology'
);

const COOKIE_NAME = 'jandy_faculty_session';

export async function createSessionToken(userId: string, email: string): Promise<string> {
  return new SignJWT({ userId, email, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifyToken(token: string): Promise<{ userId: string; email: string } | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (payload && payload.userId && payload.email) {
      return {
        userId: payload.userId as string,
        email: payload.email as string,
      };
    }
    return null;
  } catch {
    return null;
  }
}

export async function authenticateAdmin(email: string, passwordPlain: string): Promise<{ success: boolean; error?: string; token?: string }> {
  const db = getDatabase();
  const admin = db.admin;

  if (admin.email.toLowerCase() !== email.toLowerCase().trim()) {
    return { success: false, error: 'Invalid faculty credentials.' };
  }

  const match = await bcrypt.compare(passwordPlain, admin.passwordHash);
  if (!match) {
    return { success: false, error: 'Invalid faculty credentials.' };
  }

  const token = await createSessionToken(admin.id, admin.email);
  return { success: true, token };
}

export async function getAuthenticatedSession(req?: NextRequest): Promise<{ userId: string; email: string } | null> {
  let token: string | undefined;

  if (req) {
    const cookie = req.cookies.get(COOKIE_NAME);
    if (cookie) token = cookie.value;
  } else {
    try {
      const cookieStore = await cookies();
      const cookie = cookieStore.get(COOKIE_NAME);
      if (cookie) token = cookie.value;
    } catch {
      // not in request scope
    }
  }

  if (!token) return null;
  return verifyToken(token);
}

export { COOKIE_NAME };
