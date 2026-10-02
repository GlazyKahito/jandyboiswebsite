'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Sparkles, Dna, Leaf, Activity, Beaker } from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';

export default function SkillsSection({ skills = [] }) {
  const { t } = useLanguage();

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'Botany':
        return <Leaf size={16} className="text-[#C1A477]" />;
      case 'Zoology':
        return <Activity size={16} className="text-[#C1A477]" />;
      case 'Cytology & Genetics':
        return <Dna size={16} className="text-[#C1A477]" />;
      default:
        return <Beaker size={16} className="text-[#C1A477]" />;
    }
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 relative bg-[#1c130d] border-t border-[#A67C52]/20">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.2em] text-[#C1A477]">
            <Sparkles size={15} className="text-[#A67C52]" />
            <span>Curricular &amp; Laboratory Disciplines</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-gold-gradient">
            {t('skills_title') || 'Domains of Scientific Mastery'}
          </h2>
          <p className="text-sm font-serif italic text-[#A67C52]">
            {t('skills_subtitle') || 'Botany, Zoology, Genetics & Practical Pedagogy'}
          </p>
        </div>

        {/* 21st.dev Spotlight Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, idx) => (
            <SpotlightCard
              key={skill.id || idx}
              spotlightColor="rgba(193, 164, 119, 0.16)"
              className="p-6 flex flex-col justify-between group transition-transform hover:-translate-y-1 duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#302117] border border-[#A67C52]/60 flex items-center justify-center group-hover:border-[#C1A477] transition-colors shadow">
                    {getCategoryIcon(skill.category)}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#C1A477] bg-[#211711] px-2.5 py-1 rounded-full border border-[#A67C52]/30">
                    {skill.category}
                  </span>
                </div>

                <h3 className="text-lg font-serif font-bold text-[#F2E9D7] mb-2 group-hover:text-[#C1A477] transition-colors">
                  {skill.name}
                </h3>

                <p className="text-xs font-serif text-[#E8DCC5]/80 leading-relaxed">
                  {skill.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#A67C52]/20 flex items-center justify-between text-[11px] font-mono text-[#A67C52]">
                <span>Senior Faculty Specialization</span>
                <span className="text-[#C1A477]">✦</span>
              </div>
            </SpotlightCard>
          ))}
        </div>

      </div>
    </section>
  );
}
