'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, Dna, Leaf, Activity, Beaker } from 'lucide-react';

export default function SkillsSection({ skills = [] }) {
  const { t } = useLanguage();

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Botany':
        return <Leaf size={16} className="text-[#A67C52]" />;
      case 'Zoology':
        return <Activity size={16} className="text-[#A67C52]" />;
      case 'Cytology & Genetics':
        return <Dna size={16} className="text-[#A67C52]" />;
      default:
        return <Beaker size={16} className="text-[#A67C52]" />;
    }
  };

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 relative bg-[#211711] border-t border-[#A67C52]/20">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.2em] text-[#C1A477]">
            <Sparkles size={15} className="text-[#A67C52]" />
            <span>Curricular &amp; Laboratory Disciplines</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F2E9D7]">
            {t('skills_title') || 'Domains of Scientific Mastery'}
          </h2>
          <p className="text-sm font-serif italic text-[#A67C52]">
            {t('skills_subtitle') || 'Botany, Zoology, Genetics & Practical Pedagogy'}
          </p>
        </div>

        {/* Editorial Layout of Expertise (No generic percentage bars!) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, idx) => (
            <div
              key={skill.id || idx}
              className="academic-panel rounded-lg p-5 flex flex-col justify-between transition-all academic-panel-hover group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded bg-[#302117] border border-[#A67C52]/50 group-hover:border-[#C1A477] transition-colors">
                    {getCategoryIcon(skill.category)}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#73734E] bg-[#211711] px-2 py-0.5 rounded border border-[#A67C52]/20">
                    {skill.category}
                  </span>
                </div>

                <h3 className="text-base font-serif font-bold text-[#F2E9D7] mb-2 group-hover:text-[#C1A477] transition-colors">
                  {skill.name}
                </h3>

                <p className="text-xs font-serif text-[#E8DCC5]/75 leading-relaxed">
                  {skill.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#A67C52]/20 flex items-center justify-between text-[11px] font-mono text-[#A67C52]">
                <span>Senior Faculty Specialization</span>
                <span className="text-[#C1A477]">✦</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
