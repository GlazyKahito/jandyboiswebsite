import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedSession } from '@/lib/auth/auth';
import { getDatabase, saveDatabase } from '@/lib/db/store';

export async function GET(req: NextRequest) {
  const session = await getAuthenticatedSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const db = getDatabase();
  return NextResponse.json(db.enquiries);
}

export async function PUT(req: NextRequest) {
  const session = await getAuthenticatedSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    const { id, status } = await req.json();
    const db = getDatabase();
    const idx = db.enquiries.findIndex(e => e.id === id);
    if (idx === -1) return NextResponse.json({ error: 'Enquiry not found.' }, { status: 404 });

    db.enquiries[idx].status = status;
    saveDatabase(db);
    return NextResponse.json({ success: true, enquiry: db.enquiries[idx] });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update enquiry.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getAuthenticatedSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Enquiry ID required.' }, { status: 400 });

  const db = getDatabase();
  db.enquiries = db.enquiries.filter(e => e.id !== id);
  saveDatabase(db);
  return NextResponse.json({ success: true });
}
