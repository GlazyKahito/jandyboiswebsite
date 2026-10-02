'use client';

import React, { useState } from 'react';
import { LanguageProvider } from '@/context/LanguageContext';
import BookOpeningIntro from '@/components/animations/BookOpeningIntro';
import FloatingNav from '@/components/navigation/FloatingNav';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import EducationSection from '@/components/sections/EducationSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import SkillsSection from '@/components/sections/SkillsSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import TeachingResourcesSection from '@/components/sections/TeachingResourcesSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';

export default function PortfolioShell({ initialData }) {
  const [introFinished, setIntroFinished] = useState(false);

  const {
    profile,
    education = [],
    experience = [],
    skills = [],
    achievements = [],
    resources = [],
    translations = {}
  } = initialData || {};

  return (
    <LanguageProvider initialTranslations={translations}>
      {/* Cinematic 3D book-opening intro */}
      {!introFinished && (
        <BookOpeningIntro onComplete={() => setIntroFinished(true)} />
      )}

      {/* Main Website Experience */}
      <div className="min-h-screen bg-[#211711] text-[#E8DCC5] selection:bg-[#A67C52] selection:text-[#211711] overflow-x-hidden">
        <FloatingNav />
        <main>
          <HeroSection profile={profile} />
          <AboutSection profile={profile} />
          <EducationSection education={education} />
          <ExperienceSection experience={experience} />
          <SkillsSection skills={skills} />
          <AchievementsSection achievements={achievements} />
          <TeachingResourcesSection resources={resources} />
          <ContactSection profile={profile} />
        </main>
        <Footer profile={profile} />
      </div>
    </LanguageProvider>
  );
}
