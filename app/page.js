import { getDatabase } from '@/lib/db/store';
import PortfolioShell from '@/components/layout/PortfolioShell';

export const dynamic = 'force-dynamic';

export default function Home() {
  const db = getDatabase();

  const initialData = {
    profile: db.profile.status === 'published' ? db.profile : null,
    education: db.education
      .filter((item) => item.status === 'published')
      .sort((a, b) => a.orderIndex - b.orderIndex),
    experience: db.experience
      .filter((item) => item.status === 'published')
      .sort((a, b) => a.orderIndex - b.orderIndex),
    skills: db.skills
      .filter((item) => item.status === 'published')
      .sort((a, b) => a.orderIndex - b.orderIndex),
    achievements: db.achievements.filter((item) => item.status === 'published'),
    resources: db.resources.filter((item) => item.status === 'published'),
    translations: db.translations,
  };

  return <PortfolioShell initialData={initialData} />;
}
