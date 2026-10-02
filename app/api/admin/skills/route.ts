import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedSession } from '@/lib/auth/auth';
import { getDatabase, saveDatabase } from '@/lib/db/store';

export async function GET(req: NextRequest) {
  const session = await getAuthenticatedSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const db = getDatabase();
  return NextResponse.json(db.skills.sort((a, b) => a.orderIndex - b.orderIndex));
}

export async function POST(req: NextRequest) {
  const session = await getAuthenticatedSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    const item = await req.json();
    const db = getDatabase();

    const newItem = {
      id: `skill-${Date.now()}`,
      name: item.name || 'Skill Name',
      category: item.category || 'Botany',
      description: item.description || '',
      orderIndex: db.skills.length + 1,
      status: item.status || 'published'
    };

    db.skills.push(newItem);
    saveDatabase(db);
    return NextResponse.json({ success: true, item: newItem });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to add skill.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getAuthenticatedSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    const item = await req.json();
    const db = getDatabase();
    const idx = db.skills.findIndex(s => s.id === item.id);
    if (idx === -1) return NextResponse.json({ error: 'Skill not found.' }, { status: 404 });

    db.skills[idx] = { ...db.skills[idx], ...item };
    saveDatabase(db);
    return NextResponse.json({ success: true, item: db.skills[idx] });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update skill.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getAuthenticatedSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Skill ID required.' }, { status: 400 });

  const db = getDatabase();
  db.skills = db.skills.filter(s => s.id !== id);
  saveDatabase(db);
  return NextResponse.json({ success: true });
}
