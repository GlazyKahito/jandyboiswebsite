'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Award, Calendar, BookmarkCheck, ShieldAlert } from 'lucide-react';

export default function AchievementsSection({ achievements = [] }) {
  const { t } = useLanguage();

  return (
    <section id="achievements" className="py-20 px-4 sm:px-6 relative bg-[#1c130d] border-t border-[#A67C52]/20">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.2em] text-[#C1A477]">
            <Award size={15} className="text-[#A67C52]" />
            <span>Honours &amp; Accolades</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F2E9D7]">
            {t('nav_achievements') || 'Milestones & Recognitions'}
          </h2>
          <p className="text-sm font-serif italic text-[#A67C52]">
            Educational Contributions &amp; Academic Commendations
          </p>
        </div>

        {/* Achievement Grid */}
        <div className="space-y-6">
          {achievements.map((item, idx) => (
            <div
              key={item.id || idx}
              className="academic-panel rounded-lg p-6 transition-all academic-panel-hover flex flex-col sm:flex-row items-start justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#302117] border border-[#A67C52] flex items-center justify-center shrink-0 text-[#C1A477] mt-1">
                  <BookmarkCheck size={20} />
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-lg font-serif font-bold text-[#F2E9D7]">
                      {item.title}
                    </h3>
                    {item.isDemo && (
                      <span className="text-[10px] font-mono text-[#A67C52] bg-[#211711] px-2 py-0.5 rounded border border-[#A67C52]/30">
                        Demo Milestone
                      </span>
                    )}
                  </div>

                  <div className="text-xs font-serif text-[#C1A477] font-medium">
                    {item.issuer}
                  </div>

                  <p className="text-xs sm:text-sm font-serif text-[#E8DCC5]/80 leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-[#A67C52]/20">
                <div className="flex items-center gap-1 text-xs font-mono text-[#A67C52]">
                  <Calendar size={13} />
                  <span>{item.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Demo disclaimer banner */}
        <div className="mt-8 p-3 bg-[#302117]/50 border border-[#A67C52]/30 rounded text-center text-xs font-mono text-[#A67C52]/80 flex items-center justify-center gap-2">
          <ShieldAlert size={14} />
          <span>Awards displayed represent editable sample records for demonstration purposes.</span>
        </div>

      </div>
    </section>
  );
}
