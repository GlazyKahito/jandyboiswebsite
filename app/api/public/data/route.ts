import { NextResponse } from 'next/server';
import { getDatabase } from '@/lib/db/store';

export async function GET() {
  try {
    const db = getDatabase();

    const publicData = {
      profile: db.profile.status === 'published' ? db.profile : null,
      education: db.education
        .filter(item => item.status === 'published')
        .sort((a, b) => a.orderIndex - b.orderIndex),
      experience: db.experience
        .filter(item => item.status === 'published')
        .sort((a, b) => a.orderIndex - b.orderIndex),
      skills: db.skills
        .filter(item => item.status === 'published')
        .sort((a, b) => a.orderIndex - b.orderIndex),
      achievements: db.achievements
        .filter(item => item.status === 'published'),
      resources: db.resources
        .filter(item => item.status === 'published'),
      translations: db.translations
    };

    return NextResponse.json(publicData, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120'
      }
    });
  } catch (error) {
    console.error('Error fetching public portfolio data:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve academic portfolio records.' },
      { status: 500 }
    );
  }
}
