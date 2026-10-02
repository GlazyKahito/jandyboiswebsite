'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { 
  FileText, 
  Download, 
  Search, 
  FolderDown, 
  Filter, 
  Sparkles, 
  BookOpen, 
  Languages, 
  CheckCircle,
  FileCode
} from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';

export default function TeachingResourcesSection({ resources = [] }) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const categories = [
    'All',
    'Biology Notes',
    'Study Materials',
    'Worksheets',
    'Diagrams & Lab Sheets',
    'Presentations & Question Banks'
  ];

  const levels = ['All', 'Class XI', 'Class XII', 'NEET-UG'];

  const filteredResources = resources.filter((res) => {
    const matchesSearch = 
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.topic.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || res.classLevel === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <section id="resources" className="py-24 px-4 sm:px-6 relative bg-[#211711] border-t border-[#A67C52]/20">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-14 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.2em] text-[#C1A477]">
            <FolderDown size={15} className="text-[#A67C52]" />
            <span>Curricular Archives &amp; Syllabi</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-gold-gradient">
            {t('res_title') || 'The Botanical & Zoological Folio'}
          </h2>
          <p className="text-sm sm:text-base font-serif italic text-[#A67C52]">
            {t('res_subtitle') || 'Downloadable Handouts, High-Yield Notes & Diagrammatic Guides'}
          </p>
        </div>

        {/* Filter & Search Bar with 21st.dev styling */}
        <div className="academic-panel rounded-xl p-5 mb-10 space-y-4 shadow-xl">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A67C52]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('res_search_placeholder') || "Search notes, diagrams, topics..."}
                className="w-full pl-10 pr-4 py-2 bg-[#191715] border border-[#A67C52]/50 rounded text-xs sm:text-sm text-[#E8DCC5] placeholder:text-[#E8DCC5]/40 focus:outline-none focus:border-[#C1A477] transition-colors"
              />
            </div>

            {/* Academic Level Select */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              <span className="text-xs font-mono uppercase text-[#A67C52] shrink-0">Level:</span>
              <div className="flex gap-1.5 overflow-x-auto pb-1 w-full md:w-auto">
                {levels.map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`px-3 py-1 rounded-full text-xs font-mono transition-all shrink-0 ${
                      selectedLevel === lvl
                        ? 'bg-[#A67C52] text-[#211711] font-bold shadow'
                        : 'bg-[#191715] text-[#E8DCC5]/70 hover:text-[#E8DCC5] border border-[#A67C52]/30'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Category Tabs with 21st.dev Animated Sliding Pill */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-3 border-t border-[#A67C52]/20 pb-1">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative px-3.5 py-1.5 text-xs font-serif tracking-wide transition-colors shrink-0 ${
                    isSelected ? 'text-[#F2E9D7] font-semibold' : 'text-[#E8DCC5]/65 hover:text-[#E8DCC5]'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="categoryPill"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      className="absolute inset-0 bg-[#302117] border border-[#A67C52] rounded shadow-inner -z-10"
                    />
                  )}
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Resources Grid with SpotlightCards */}
        {filteredResources.length === 0 ? (
          <div className="text-center py-16 academic-panel rounded-lg space-y-3">
            <BookOpen size={32} className="mx-auto text-[#A67C52]/50" />
            <p className="font-serif text-[#E8DCC5]/70 text-sm">
              No matching biological study materials found for this query.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); setSelectedLevel('All'); }}
              className="text-xs font-mono uppercase text-[#C1A477] underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((res) => (
              <SpotlightCard
                key={res.id}
                spotlightColor="rgba(193, 164, 119, 0.15)"
                className="p-5 flex flex-col justify-between group transition-transform hover:-translate-y-1 duration-300"
              >
                <div className="space-y-3">
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#A67C52] bg-[#211711] px-2 py-0.5 rounded border border-[#A67C52]/30">
                      {res.category}
                    </span>
                    <span className="text-[10px] font-mono text-[#73734E] bg-[#211711] px-2 py-0.5 rounded border border-[#73734E]/30">
                      {res.classLevel}
                    </span>
                  </div>

                  <h3 className="text-base font-serif font-bold text-[#F2E9D7] group-hover:text-[#C1A477] transition-colors leading-snug">
                    {res.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs font-serif text-[#A67C52]">
                    <span className="italic">{res.topic}</span>
                    <span>•</span>
                    <span className="font-mono text-[11px] text-[#E8DCC5]/60 flex items-center gap-1">
                      <Languages size={11} />
                      {res.language}
                    </span>
                  </div>

                  <p className="text-xs font-serif text-[#E8DCC5]/75 leading-relaxed line-clamp-3">
                    {res.description}
                  </p>
                </div>

                {/* Card Footer: Shimmer Download Action */}
                <div className="mt-5 pt-3 border-t border-[#A67C52]/20 flex items-center justify-between">
                  <div className="text-[10px] font-mono text-[#A67C52]">
                    <span>{res.fileType}</span>
                    <span className="mx-1">•</span>
                    <span>{res.fileSize}</span>
                  </div>

                  <a
                    href={res.fileUrl}
                    download
                    className="btn-shimmer flex items-center gap-1.5 px-3 py-1.5 bg-[#302117] hover:bg-[#A67C52] hover:text-[#211711] text-[#C1A477] border border-[#A67C52]/60 rounded text-xs font-serif font-medium transition-all shadow-sm"
                    title={`Download ${res.title}`}
                  >
                    <Download size={13} />
                    <span>{t('res_download_btn') || 'Download'}</span>
                  </a>
                </div>
              </SpotlightCard>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
