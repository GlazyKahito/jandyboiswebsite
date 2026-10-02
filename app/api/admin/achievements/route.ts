import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedSession } from '@/lib/auth/auth';
import { getDatabase, saveDatabase } from '@/lib/db/store';

export async function GET(req: NextRequest) {
  const session = await getAuthenticatedSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const db = getDatabase();
  return NextResponse.json(db.achievements);
}

export async function POST(req: NextRequest) {
  const session = await getAuthenticatedSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    const item = await req.json();
    const db = getDatabase();

    const newItem = {
      id: `ach-${Date.now()}`,
      title: item.title || 'Milestone Title',
      issuer: item.issuer || 'Issuing Authority',
      year: item.year || new Date().getFullYear().toString(),
      description: item.description || '',
      isDemo: Boolean(item.isDemo ?? true),
      status: item.status || 'published'
    };

    db.achievements.push(newItem);
    saveDatabase(db);
    return NextResponse.json({ success: true, item: newItem });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to add achievement.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getAuthenticatedSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    const item = await req.json();
    const db = getDatabase();
    const idx = db.achievements.findIndex(a => a.id === item.id);
    if (idx === -1) return NextResponse.json({ error: 'Achievement not found.' }, { status: 404 });

    db.achievements[idx] = { ...db.achievements[idx], ...item };
    saveDatabase(db);
    return NextResponse.json({ success: true, item: db.achievements[idx] });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update achievement.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getAuthenticatedSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Achievement ID required.' }, { status: 400 });

  const db = getDatabase();
  db.achievements = db.achievements.filter(a => a.id !== id);
  saveDatabase(db);
  return NextResponse.json({ success: true });
}
