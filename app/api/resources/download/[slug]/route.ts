import { NextRequest, NextResponse } from 'next/server';
import { generateResourcePdfBuffer } from '@/lib/resources/generator';
import { getDatabase } from '@/lib/db/store';

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const cleanSlug = slug.replace(/\.pdf$/i, '');

    const db = getDatabase();
    const resource = db.resources.find(r => 
      r.fileUrl.includes(cleanSlug) || 
      r.id.toLowerCase() === cleanSlug.toLowerCase() ||
      r.title.toLowerCase().includes(cleanSlug.replace(/-/g, ' ').toLowerCase())
    );

    const title = resource ? resource.title : cleanSlug.replace(/-/g, ' ').toUpperCase();
    const category = resource ? resource.category : 'Biology Study Folio';
    const classLevel = resource ? resource.classLevel : 'Higher Secondary / NEET';
    const language = resource ? resource.language : 'English';

    const pdfBuffer = generateResourcePdfBuffer(cleanSlug, title, category, classLevel, language);

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${cleanSlug}.pdf"`,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('Error generating resource PDF:', error);
    return NextResponse.json(
      { error: 'Resource document not found or generation failed.' },
      { status: 500 }
    );
  }
}
