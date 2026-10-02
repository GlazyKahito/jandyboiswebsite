'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { FileDown, Send, BookOpen, Sparkles } from 'lucide-react';
import SpotlightCard from '@/components/ui/SpotlightCard';

export default function HeroSection({ profile }) {
  const { t } = useLanguage();

  const p = profile || {
    name: 'Janardhan Aghav',
    displayName: 'Jandy',
    title: 'Biology Faculty / Senior Educator',
    institution: 'SRJC, Thane',
    location: 'Thane, Maharashtra, India',
    photoUrl: '/images/portrait_jandy_engraving.svg',
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen pt-36 pb-24 px-4 sm:px-6 flex items-center justify-center bg-grain overflow-hidden">
      {/* 21st.dev Cinematic Vignette & Dynamic Ambient Lighting */}
      <div className="absolute inset-0 cinematic-vignette" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[850px] bg-[#A67C52]/12 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#73734E]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Academic Title & Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 text-left space-y-6"
          >
            {/* Header Badge & Institutional Colophon */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#302117]/85 border border-[#A67C52]/50 rounded-full text-xs font-serif text-[#C1A477] shadow-inner backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#C1A477] animate-pulse" />
              <span>{t('hero_greeting') || "Naturalist & Educator's Archive"}</span>
              <span className="text-[#A67C52]/60">•</span>
              <span className="font-mono text-[11px] text-[#E8DCC5]/90">{p.institution}</span>
            </div>

            {/* Main Name Heading with 21st.dev Gold Gradient */}
            <div className="space-y-1.5">
              <div className="flex items-baseline gap-3 flex-wrap">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-bold text-gold-gradient tracking-tight leading-[1.05]">
                  {p.name}
                </h1>
                <span className="text-xl sm:text-2xl font-serif italic text-[#C1A477] border-b border-[#A67C52]/50 pb-0.5">
                  ({p.displayName})
                </span>
              </div>
              <p className="text-lg sm:text-xl font-serif text-[#E8DCC5] font-medium tracking-wide">
                {t('hero_title') || p.title}
              </p>
              <p className="text-xs font-mono text-[#A67C52] uppercase tracking-widest">
                {p.location}
              </p>
            </div>

            {/* Editorial Tagline */}
            <p className="text-sm sm:text-base font-serif text-[#E8DCC5]/85 leading-relaxed max-w-xl">
              {t('hero_tagline') || "Exploring the intricate architecture of living systems, inspiring scientific curiosity, and guiding students towards mastery in Maharashtra State Board & NEET-UG Biology."}
            </p>

            {/* Metric Strip (21st.dev Interactive Cards) */}
            <div className="grid grid-cols-3 gap-3 py-3 border-y border-[#A67C52]/30 max-w-lg">
              <div className="p-2 rounded bg-[#302117]/30 border border-[#A67C52]/20 text-center sm:text-left transition-colors hover:border-[#C1A477]/40">
                <span className="block text-2xl font-serif font-bold text-gold-gradient">8+</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#A67C52]">Years Mentorship</span>
              </div>
              <div className="p-2 rounded bg-[#302117]/30 border border-[#A67C52]/20 text-center sm:text-left transition-colors hover:border-[#C1A477]/40">
                <span className="block text-2xl font-serif font-bold text-gold-gradient">1,200+</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#A67C52]">Students Guided</span>
              </div>
              <div className="p-2 rounded bg-[#302117]/30 border border-[#A67C52]/20 text-center sm:text-left transition-colors hover:border-[#C1A477]/40">
                <span className="block text-2xl font-serif font-bold text-gold-gradient">340+</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#A67C52]">NEET Bio Scores</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => scrollTo('resources')}
                className="btn-shimmer flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#C1A477] to-[#A67C52] text-[#211711] font-serif font-bold text-xs sm:text-sm tracking-wide rounded hover:opacity-95 transition-all shadow-lg active:scale-95"
              >
                <BookOpen size={16} />
                <span>{t('hero_cta_explore') || "Examine Field Notes"}</span>
              </button>

              <a
                href="/api/resume/download"
                download="Janardhan_Aghav_Jandy_Resume.pdf"
                className="flex items-center gap-2 px-4 py-2.5 bg-[#302117]/80 text-[#E8DCC5] border border-[#A67C52] font-serif text-xs sm:text-sm tracking-wide rounded hover:bg-[#A67C52]/25 hover:text-[#F2E9D7] transition-all shadow backdrop-blur-md"
              >
                <FileDown size={16} className="text-[#C1A477]" />
                <span>{t('hero_cta_resume') || "Download Résumé (PDF)"}</span>
              </a>

              <button
                onClick={() => scrollTo('contact')}
                className="flex items-center gap-2 px-4 py-2.5 text-[#C1A477] hover:text-[#F2E9D7] font-serif text-xs sm:text-sm transition-colors"
              >
                <Send size={15} />
                <span>{t('hero_cta_contact') || "Direct Inquiry"}</span>
              </button>
            </div>
          </motion.div>

          {/* Right Column: 21st.dev Spotlight Portrait Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex justify-center"
          >
            <SpotlightCard className="w-72 sm:w-84 md:w-96 aspect-[4/5] p-3 border-2 border-[#A67C52]/80 shadow-2xl">
              {/* Inner ornamental border */}
              <div className="absolute inset-2 border border-[#C1A477]/30 pointer-events-none rounded" />
              
              {/* Naturalist Portrait Canvas */}
              <div className="w-full h-full rounded overflow-hidden relative bg-[#211711] flex flex-col justify-between p-4">
                <img
                  src={p.photoUrl || "/images/portrait_jandy_engraving.svg"}
                  alt={p.name}
                  className="w-full h-[78%] object-contain filter contrast-105 transition-transform duration-500 hover:scale-102"
                />

                <div className="text-center pt-2 border-t border-[#A67C52]/40">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#A67C52] block">
                    Curated Naturalist Dossier
                  </span>
                  <span className="text-xs font-serif italic text-[#E8DCC5] block">
                    "Scientia et Natura" • SRJC Thane
                  </span>
                </div>
              </div>

              {/* Antique wax seal badge in bottom corner */}
              <div className="absolute -bottom-3 -right-3 w-14 h-14 rounded-full bg-gradient-to-br from-[#735334] to-[#3a281d] border-2 border-[#C1A477] shadow-xl flex items-center justify-center text-[#F2E9D7] text-[10px] font-serif font-bold text-center leading-tight">
                SRJC<br/>BIO
              </div>
            </SpotlightCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
