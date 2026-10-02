import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedSession } from '@/lib/auth/auth';
import { getDatabase, saveDatabase } from '@/lib/db/store';

export async function GET(req: NextRequest) {
  const session = await getAuthenticatedSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const db = getDatabase();
  return NextResponse.json(db.education.sort((a, b) => a.orderIndex - b.orderIndex));
}

export async function POST(req: NextRequest) {
  const session = await getAuthenticatedSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    const item = await req.json();
    const db = getDatabase();

    const newItem = {
      id: `edu-${Date.now()}`,
      degree: item.degree || 'Degree Title',
      field: item.field || 'Field of Study',
      institution: item.institution || 'Institution Name',
      year: item.year || 'Year',
      details: item.details || '',
      isProvisional: Boolean(item.isProvisional),
      orderIndex: db.education.length + 1,
      status: item.status || 'published'
    };

    db.education.push(newItem);
    saveDatabase(db);
    return NextResponse.json({ success: true, item: newItem });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to add education record.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getAuthenticatedSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    const item = await req.json();
    const db = getDatabase();
    const idx = db.education.findIndex(e => e.id === item.id);
    if (idx === -1) return NextResponse.json({ error: 'Record not found.' }, { status: 404 });

    db.education[idx] = { ...db.education[idx], ...item };
    saveDatabase(db);
    return NextResponse.json({ success: true, item: db.education[idx] });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update education record.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getAuthenticatedSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Record ID required.' }, { status: 400 });

  const db = getDatabase();
  db.education = db.education.filter(e => e.id !== id);
  saveDatabase(db);
  return NextResponse.json({ success: true });
}
