'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { GraduationCap, Award, BookOpen, AlertCircle } from 'lucide-react';

export default function EducationSection({ education = [] }) {
  const { t } = useLanguage();

  return (
    <section id="education" className="py-20 px-4 sm:px-6 relative bg-[#211711] border-t border-[#A67C52]/20">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.2em] text-[#C1A477]">
            <GraduationCap size={15} className="text-[#A67C52]" />
            <span>Academic Credentials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F2E9D7]">
            {t('edu_title') || 'Scholastic Qualifications'}
          </h2>
          <p className="text-sm font-serif italic text-[#A67C52]">
            {t('edu_subtitle') || 'Degrees & Pedagogical Training'}
          </p>
        </div>

        {/* Education Timeline */}
        <div className="relative border-l-2 border-[#A67C52]/40 ml-4 sm:ml-8 space-y-10 pl-6 sm:pl-10">
          {education.map((item, idx) => (
            <div key={item.id || idx} className="relative group">
              {/* Timeline marker icon */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-1 w-8 h-8 rounded-full bg-[#302117] border-2 border-[#A67C52] flex items-center justify-center text-[#C1A477] shadow group-hover:scale-110 transition-transform">
                <GraduationCap size={14} />
              </div>

              {/* Education Card */}
              <div className="academic-panel rounded p-6 transition-all academic-panel-hover">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <h3 className="text-xl font-serif font-bold text-[#F2E9D7]">
                    {item.degree}
                  </h3>
                  <span className="text-xs font-mono text-[#A67C52] tracking-wider uppercase bg-[#211711] px-2.5 py-1 rounded border border-[#A67C52]/30 w-fit">
                    {item.year}
                  </span>
                </div>

                <div className="text-sm font-serif text-[#C1A477] mb-2 font-medium">
                  {item.field} — <span className="text-[#E8DCC5]/80">{item.institution}</span>
                </div>

                <p className="text-xs sm:text-sm font-serif text-[#E8DCC5]/80 leading-relaxed">
                  {item.details}
                </p>

                {item.isProvisional && (
                  <div className="mt-4 pt-3 border-t border-[#A67C52]/20 flex items-center gap-1.5 text-[11px] font-mono text-[#A67C52]">
                    <AlertCircle size={13} className="shrink-0" />
                    <span>Provisional Credential — Record awaiting formal archival verification</span>
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
