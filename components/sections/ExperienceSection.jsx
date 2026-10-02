'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';

export default function ExperienceSection({ experience = [] }) {
  const { t } = useLanguage();

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 relative bg-[#1c130d] border-t border-[#A67C52]/20">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.2em] text-[#C1A477]">
            <Briefcase size={15} className="text-[#A67C52]" />
            <span>Academic Appointments</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F2E9D7]">
            {t('exp_title') || 'Teaching Chronicles'}
          </h2>
          <p className="text-sm font-serif italic text-[#A67C52]">
            {t('exp_subtitle') || 'Classroom Mentorship & Institutional Roles'}
          </p>
        </div>

        {/* Experience Timeline */}
        <div className="relative border-l-2 border-[#A67C52]/40 ml-4 sm:ml-8 space-y-12 pl-6 sm:pl-10">
          {experience.map((item, idx) => (
            <div key={item.id || idx} className="relative group">
              {/* Timeline marker */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-1 w-8 h-8 rounded-full bg-[#302117] border-2 border-[#A67C52] flex items-center justify-center text-[#C1A477] shadow group-hover:scale-110 transition-transform">
                <Briefcase size={14} />
              </div>

              {/* Experience Card */}
              <div className="academic-panel rounded p-6 sm:p-7 transition-all academic-panel-hover">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h3 className="text-xl font-serif font-bold text-[#F2E9D7]">
                    {item.role}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#A67C52]">
                    <Calendar size={13} />
                    <span>{item.period}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm font-serif text-[#C1A477] mb-3">
                  <span className="font-semibold">{item.institution}</span>
                  <span className="text-[#A67C52]/60">•</span>
                  <span className="flex items-center gap-1 text-xs text-[#73734E] font-mono">
                    <MapPin size={12} />
                    {item.location}
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-serif text-[#E8DCC5]/85 leading-relaxed mb-4">
                  {item.description}
                </p>

                {item.responsibilities && item.responsibilities.length > 0 && (
                  <div className="space-y-2 pt-3 border-t border-[#A67C52]/20">
                    <h4 className="text-[11px] font-mono uppercase tracking-widest text-[#C1A477]">
                      Core Pedagogical Responsibilities
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.responsibilities.map((resp, rIdx) => (
                        <div key={rIdx} className="flex items-start gap-2 text-xs font-serif text-[#E8DCC5]/80">
                          <CheckCircle2 size={13} className="text-[#A67C52] shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
