'use client';

import React, { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { LanguageProvider } from '@/context/LanguageContext';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
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
import ScrollBand from '@/components/ui/ScrollBand';

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
      <MotionConfig reducedMotion="user">
        <SmoothScroll paused={!introFinished}>
          {/* Cinematic 3D book-opening intro */}
          {!introFinished && (
            <BookOpeningIntro onComplete={() => setIntroFinished(true)} />
          )}

          {/* Main Website Experience */}
          <div className="relative min-h-screen overflow-x-clip bg-ink text-parchment">
            {/* Fixed blueprint grid and film grain */}
            <div className="pointer-events-none fixed inset-0 z-0 bg-grid" aria-hidden="true" />
            <div className="pointer-events-none fixed inset-0 z-30 film-grain" aria-hidden="true" />

            <FloatingNav />
            <main className="relative z-10">
              <HeroSection profile={profile} />
              <AboutSection profile={profile} />
              <ScrollBand items={['Botany', 'Zoology', 'Cytology', 'Genetics']} />
              <EducationSection education={education} />
              <ExperienceSection experience={experience} />
              <SkillsSection skills={skills} />
              <AchievementsSection achievements={achievements} />
              <TeachingResourcesSection resources={resources} />
              <ScrollBand items={['Observe', 'Question', 'Sketch', 'Understand']} reverse />
              <ContactSection profile={profile} />
            </main>
            <Footer profile={profile} />
          </div>
        </SmoothScroll>
      </MotionConfig>
    </LanguageProvider>
  );
}
