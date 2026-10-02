import { NextRequest, NextResponse } from 'next/server';
import { getAuthenticatedSession } from '@/lib/auth/auth';
import { getDatabase, saveDatabase } from '@/lib/db/store';

export async function GET(req: NextRequest) {
  const session = await getAuthenticatedSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const db = getDatabase();
  return NextResponse.json(db.resources);
}

export async function POST(req: NextRequest) {
  const session = await getAuthenticatedSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    const item = await req.json();
    const db = getDatabase();

    const newItem = {
      id: `res-${Date.now()}`,
      title: item.title || 'Untitled Resource',
      description: item.description || '',
      category: item.category || 'Biology Notes',
      topic: item.topic || 'General Life Sciences',
      classLevel: item.classLevel || 'Class XII',
      language: item.language || 'English',
      fileUrl: item.fileUrl || '/api/resources/download/photosynthesis-master-folio.pdf',
      fileType: item.fileType || 'PDF',
      fileSize: item.fileSize || '1.2 MB',
      uploadDate: new Date().toISOString().split('T')[0],
      isDemo: Boolean(item.isDemo ?? false),
      status: item.status || 'published'
    };

    db.resources.unshift(newItem);
    saveDatabase(db);
    return NextResponse.json({ success: true, item: newItem });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to add teaching resource.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await getAuthenticatedSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  try {
    const item = await req.json();
    const db = getDatabase();
    const idx = db.resources.findIndex(r => r.id === item.id);
    if (idx === -1) return NextResponse.json({ error: 'Resource not found.' }, { status: 404 });

    db.resources[idx] = { ...db.resources[idx], ...item };
    saveDatabase(db);
    return NextResponse.json({ success: true, item: db.resources[idx] });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to update resource.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getAuthenticatedSession(req);
  if (!session) return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Resource ID required.' }, { status: 400 });

  const db = getDatabase();
  db.resources = db.resources.filter(r => r.id !== id);
  saveDatabase(db);
  return NextResponse.json({ success: true });
}
