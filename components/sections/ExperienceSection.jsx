'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MapPin } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';

export default function ExperienceSection({ experience = [] }) {
  const { t } = useLanguage();

  return (
    <section id="experience" className="relative border-t border-line px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="04"
          label="Academic Appointments"
          title={t('exp_title') || 'Teaching Chronicles'}
          subtitle={t('exp_subtitle') || 'Classroom Mentorship & Institutional Roles'}
        />

        {/* Appointment log */}
        <div className="border-t border-line">
          {experience.map((item, idx) => (
            <Reveal key={item.id || idx} delay={idx * 0.06}>
              <article className="grid grid-cols-1 gap-4 border-b border-line py-10 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-3">
                  <div className="md:sticky md:top-28">
                    <span className="font-mono text-[11px] text-phosphor">LOG-{String(idx + 1).padStart(2, '0')}</span>
                    <div className="label mt-2 text-gold">{item.period}</div>
                    <div className="label mt-2 flex items-center gap-1.5 text-moss">
                      <MapPin size={11} />
                      <span>{item.location}</span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-9">
                  <h3 className="font-serif text-2xl font-light text-ivory sm:text-3xl">
                    {item.role}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-gold">{item.institution}</p>

                  <p className="mt-4 max-w-3xl text-sm leading-relaxed text-parchment/75">
                    {item.description}
                  </p>

                  {item.responsibilities && item.responsibilities.length > 0 && (
                    <div className="mt-7">
                      <h4 className="label">Core Pedagogical Responsibilities</h4>
                      <ul className="mt-3 grid grid-cols-1 gap-x-8 border-t border-line sm:grid-cols-2">
                        {item.responsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-3 border-b border-line py-3 text-sm text-parchment/75">
                            <span className="mt-0.5 font-mono text-[10px] text-bronze">{String(rIdx + 1).padStart(2, '0')}</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
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
