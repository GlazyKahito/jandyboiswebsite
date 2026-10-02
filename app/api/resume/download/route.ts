import { NextResponse } from 'next/server';
import { generateResumePdfBuffer } from '@/lib/resume/generator';

export async function GET() {
  try {
    const pdfBuffer = await generateResumePdfBuffer();

    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Janardhan_Aghav_Jandy_Resume.pdf"',
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    console.error('Error generating curriculum vitae PDF:', error);
    return NextResponse.json(
      { error: 'Failed to generate academic résumé dossier.' },
      { status: 500 }
    );
  }
}
