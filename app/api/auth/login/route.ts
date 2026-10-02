import { NextRequest, NextResponse } from 'next/server';
import { authenticateAdmin, COOKIE_NAME } from '@/lib/auth/auth';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    const result = await authenticateAdmin(email, password);

    if (!result.success || !result.token) {
      return NextResponse.json(
        { error: result.error || 'Invalid credentials.' },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: 'Faculty session established.',
      email: email.trim()
    });

    response.cookies.set({
      name: COOKIE_NAME,
      value: result.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal authentication error.' },
      { status: 500 }
    );
  }
}
