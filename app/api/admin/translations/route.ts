import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedSession } from '@/lib/auth/auth';
import { getDatabase, saveDatabase } from '@/lib/db/store';

export async function GET(req: NextRequest) {
  const session = await getAuthenticatedSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const db = getDatabase();
  return NextResponse.json(db.translations);
}

export async function PUT(req: NextRequest) {
  const session = await getAuthenticatedSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    const translations = await req.json();
    const db = getDatabase();
    db.translations = { ...db.translations, ...translations };
    saveDatabase(db);
    return NextResponse.json({ success: true, translations: db.translations });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update translations.' }, { status: 500 });
  }
}
