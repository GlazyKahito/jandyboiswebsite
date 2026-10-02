'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Dna, Leaf, Activity, Beaker } from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';

const CATEGORY_ICONS = {
  'Botany': Leaf,
  'Zoology': Activity,
  'Cytology & Genetics': Dna,
};

export default function SkillsSection({ skills = [] }) {
  const { t } = useLanguage();

  return (
    <section id="skills" className="relative border-t border-line bg-soot/50 px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="05"
          label="Curricular & Laboratory Disciplines"
          title={t('skills_title') || 'Domains of Scientific Mastery'}
          subtitle={t('skills_subtitle') || 'Botany, Zoology, Genetics & Practical Pedagogy'}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, idx) => {
            const Icon = CATEGORY_ICONS[skill.category] || Beaker;
            return (
              <Reveal key={skill.id || idx} delay={(idx % 3) * 0.06} className="flex">
                <SpotlightCard className="group flex w-full flex-col justify-between p-6 sm:p-7">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] text-phosphor">S-{String(idx + 1).padStart(2, '0')}</span>
                      <span className="label">{skill.category}</span>
                    </div>

                    <Icon size={26} strokeWidth={1.25} className="mt-8 text-gold transition-colors group-hover:text-phosphor" />

                    <h3 className="mt-5 font-serif text-2xl font-light leading-tight text-ivory">
                      {skill.name}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-parchment/65">
                      {skill.description}
                    </p>
                  </div>

                  <div className="label mt-8 flex items-center justify-between border-t border-line pt-4 text-bronze/80">
                    <span>Senior Faculty Specialization</span>
                    <span className="text-gold">✦</span>
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
