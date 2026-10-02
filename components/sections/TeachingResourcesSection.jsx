'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Download, Search, Languages } from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';

const CATEGORIES = [
  'All',
  'Biology Notes',
  'Study Materials',
  'Worksheets',
  'Diagrams & Lab Sheets',
  'Presentations & Question Banks'
];

const LEVELS = ['All', 'Class XI', 'Class XII', 'NEET-UG'];

export default function TeachingResourcesSection({ resources = [] }) {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');

  const filteredResources = resources.filter((res) => {
    const matchesSearch =
      res.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.topic.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;
    const matchesLevel = selectedLevel === 'All' || res.classLevel === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedLevel('All');
  };

  return (
    <section id="resources" className="relative border-t border-line bg-soot/50 px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="07"
          label="Curricular Archives & Syllabi"
          title={t('res_title') || 'The Botanical & Zoological Folio'}
          subtitle={t('res_subtitle') || 'Downloadable Handouts, High-Yield Notes & Diagrammatic Guides'}
        />

        {/* Query console */}
        <Reveal className="panel mb-8">
          <div className="flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between sm:p-5">
            <div className="relative w-full md:max-w-sm">
              <Search size={15} className="absolute left-0 top-1/2 -translate-y-1/2 text-bronze" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('res_search_placeholder') || "Search notes, diagrams, topics..."}
                className="field pl-7"
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="label shrink-0">Level</span>
              <div className="flex gap-1.5 overflow-x-auto">
                {LEVELS.map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`shrink-0 border px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                      selectedLevel === lvl
                        ? 'border-gold bg-gold text-ink'
                        : 'border-line text-parchment/65 hover:border-gold/50 hover:text-ivory'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Category tabs with sliding underline */}
          <div className="flex items-center gap-1 overflow-x-auto border-t border-line px-2 sm:px-3">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`relative shrink-0 px-3 py-3.5 font-mono text-[11px] uppercase tracking-wider transition-colors ${
                    isSelected ? 'text-ivory' : 'text-parchment/55 hover:text-parchment'
                  }`}
                >
                  <span>{cat}</span>
                  {isSelected && (
                    <motion.span
                      layoutId="categoryPill"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      className="absolute inset-x-0 -bottom-px h-px bg-phosphor"
                    />
                  )}
                </button>
              );
            })}
            <span className="label ml-auto hidden shrink-0 pl-4 pr-2 md:block">
              {String(filteredResources.length).padStart(2, '0')} / {String(resources.length).padStart(2, '0')} records
            </span>
          </div>
        </Reveal>

        {filteredResources.length === 0 ? (
          <div className="panel space-y-4 px-6 py-16 text-center">
            <p className="font-mono text-xs text-phosphor">&gt; 0 records returned</p>
            <p className="text-sm text-parchment/70">
              No matching biological study materials found for this query.
            </p>
            <button onClick={resetFilters} className="btn btn-ghost">
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredResources.map((res, idx) => (
              <Reveal key={res.id} delay={(idx % 3) * 0.06} className="flex">
                <SpotlightCard className="group flex w-full flex-col justify-between p-6">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <span className="label">{res.category}</span>
                      <span className="label shrink-0 text-moss">{res.classLevel}</span>
                    </div>

                    <h3 className="mt-6 font-serif text-xl leading-snug text-ivory transition-colors group-hover:text-gold">
                      {res.title}
                    </h3>

                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-bronze">
                      <span>{res.topic}</span>
                      <span className="text-bronze/40">/</span>
                      <span className="flex items-center gap-1 text-parchment/55">
                        <Languages size={11} />
                        {res.language}
                      </span>
                    </div>

                    <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-parchment/65">
                      {res.description}
                    </p>
                  </div>

                  <div className="mt-7 flex items-center justify-between border-t border-line pt-4">
                    <span className="label">
                      {res.fileType} · {res.fileSize}
                    </span>

                    <a
                      href={res.fileUrl}
                      download
                      className="flex items-center gap-1.5 border border-gold/50 px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-gold transition-colors hover:border-gold hover:bg-gold hover:text-ink"
                      title={`Download ${res.title}`}
                    >
                      <Download size={13} />
                      <span>{t('res_download_btn') || 'Download'}</span>
                    </a>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
