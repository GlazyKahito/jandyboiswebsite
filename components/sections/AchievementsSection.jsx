'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { ShieldAlert } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';

export default function AchievementsSection({ achievements = [] }) {
  const { t } = useLanguage();

  return (
    <section id="achievements" className="relative border-t border-line px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="06"
          label="Honours & Accolades"
          title={t('nav_achievements') || 'Milestones & Recognitions'}
          subtitle="Educational Contributions & Academic Commendations"
        />

        {/* Honours ledger */}
        <div className="border-t border-line">
          {achievements.map((item, idx) => (
            <Reveal key={item.id || idx} delay={idx * 0.05}>
              <article className="group grid grid-cols-1 gap-3 border-b border-line py-7 transition-colors hover:bg-gold/[0.03] md:grid-cols-12 md:items-baseline md:gap-8 md:px-4">
                <div className="font-serif text-3xl font-light text-gold md:col-span-2 sm:text-4xl">
                  {item.year}
                </div>

                <div className="md:col-span-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-serif text-xl text-ivory transition-colors group-hover:text-gold sm:text-2xl">
                      {item.title}
                    </h3>
                    {item.isDemo && (
                      <span className="border border-line px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-bronze">
                        Demo Milestone
                      </span>
                    )}
                  </div>
                  <div className="label mt-2">{item.issuer}</div>
                </div>

                <p className="text-sm leading-relaxed text-parchment/65 md:col-span-4">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Demo disclaimer banner */}
        <div className="mt-8 flex items-center gap-2 font-mono text-[11px] text-bronze/80">
          <ShieldAlert size={13} className="shrink-0" />
          <span>Awards displayed represent editable sample records for demonstration purposes.</span>
        </div>
      </div>
    </section>
  );
}
