'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { AlertCircle } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';

export default function EducationSection({ education = [] }) {
  const { t } = useLanguage();

  return (
    <section id="education" className="relative border-t border-line bg-soot/50 px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="03"
          label="Academic Credentials"
          title={t('edu_title') || 'Scholastic Qualifications'}
          subtitle={t('edu_subtitle') || 'Degrees & Pedagogical Training'}
        />

        {/* Credential register */}
        <div className="border-t border-line">
          {education.map((item, idx) => (
            <Reveal key={item.id || idx} delay={idx * 0.06}>
              <article className="group grid grid-cols-1 gap-4 border-b border-line py-8 transition-colors hover:bg-gold/[0.03] md:grid-cols-12 md:gap-8 md:px-4">
                <div className="flex items-baseline gap-4 md:col-span-3 md:block">
                  <span className="font-mono text-[11px] text-phosphor">E-{String(idx + 1).padStart(2, '0')}</span>
                  <span className="label md:mt-2 md:block">{item.year}</span>
                </div>

                <div className="md:col-span-9">
                  <h3 className="font-serif text-2xl font-light text-ivory transition-colors group-hover:text-gold sm:text-3xl">
                    {item.degree}
                  </h3>
                  <p className="mt-2 text-sm text-gold">
                    {item.field} <span className="text-bronze/60">/</span>{' '}
                    <span className="text-parchment/70">{item.institution}</span>
                  </p>
                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-parchment/70">
                    {item.details}
                  </p>

                  {item.isProvisional && (
                    <div className="mt-5 inline-flex items-center gap-2 border border-phosphor/30 px-2.5 py-1.5 font-mono text-[10.5px] uppercase tracking-wider text-phosphor/90">
                      <AlertCircle size={12} className="shrink-0" />
                      <span>Provisional Credential — Record awaiting formal archival verification</span>
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
