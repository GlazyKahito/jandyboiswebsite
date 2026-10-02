import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedSession } from '@/lib/auth/auth';
import { getDatabase, saveDatabase } from '@/lib/db/store';

export async function GET(req: NextRequest) {
  const session = await getAuthenticatedSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const db = getDatabase();
  return NextResponse.json(db.experience.sort((a, b) => a.orderIndex - b.orderIndex));
}

export async function POST(req: NextRequest) {
  const session = await getAuthenticatedSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    const item = await req.json();
    const db = getDatabase();

    const newItem = {
      id: `exp-${Date.now()}`,
      role: item.role || 'Role Title',
      institution: item.institution || 'Institution',
      period: item.period || 'Year — Present',
      location: item.location || 'Location',
      description: item.description || '',
      responsibilities: Array.isArray(item.responsibilities) ? item.responsibilities : [],
      orderIndex: db.experience.length + 1,
      status: item.status || 'published'
    };

    db.experience.push(newItem);
    saveDatabase(db);
    return NextResponse.json({ success: true, item: newItem });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to add experience record.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getAuthenticatedSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    const item = await req.json();
    const db = getDatabase();
    const idx = db.experience.findIndex(e => e.id === item.id);
    if (idx === -1) return NextResponse.json({ error: 'Record not found.' }, { status: 404 });

    db.experience[idx] = { ...db.experience[idx], ...item };
    saveDatabase(db);
    return NextResponse.json({ success: true, item: db.experience[idx] });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update experience record.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getAuthenticatedSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Record ID required.' }, { status: 400 });

  const db = getDatabase();
  db.experience = db.experience.filter(e => e.id !== id);
  saveDatabase(db);
  return NextResponse.json({ success: true });
}
