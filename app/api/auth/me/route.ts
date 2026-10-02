import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedSession } from '@/lib/auth/auth';
import { getDatabase } from '@/lib/db/store';

export async function GET(req: NextRequest) {
  const session = await getAuthenticatedSession(req);
  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const db = getDatabase();
  return NextResponse.json({
    authenticated: true,
    user: {
      id: db.admin.id,
      email: db.admin.email,
      name: db.admin.name
    }
  });
}
