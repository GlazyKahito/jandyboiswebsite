'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Feather, Compass, BookOpenCheck, Microscope, HeartHandshake } from 'lucide-react';

export default function AboutSection({ profile }) {
  const { t } = useLanguage();

  const bio = profile?.bio || 'Janardhan Aghav (affectionately known as Jandy) is a dedicated Biology educator at SRJC, Thane.';
  const philosophy = profile?.philosophy || 'Biology is not a tedious catalogue of nomenclature; it is the poetic architecture of existence.';
  const quote = profile?.quote || 'To observe nature closely is to study the grandest manuscript ever written.';

  return (
    <section id="about" className="py-24 px-4 sm:px-6 relative bg-[#1d140e] border-t border-[#A67C52]/20">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.2em] text-[#C1A477]">
            <Feather size={14} className="text-[#A67C52]" />
            <span>Ex Libris • Manuscript Folio</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#F2E9D7]">
            {t('about_title') || 'Academic Philosophy & Biography'}
          </h2>
          <p className="text-sm sm:text-base font-serif italic text-[#A67C52]">
            {t('about_subtitle') || 'From Botanical Specimens to Cellular Mechanisms'}
          </p>
        </div>

        {/* The Open Journal Page Container */}
        <div className="relative bg-[#261b14] border-2 border-[#A67C52]/60 rounded-lg p-6 sm:p-12 shadow-2xl">
          {/* Paper double framing */}
          <div className="absolute inset-3 border border-[#C1A477]/20 pointer-events-none rounded" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Philosophical Quote & Pillar Icons */}
            <div className="md:col-span-5 space-y-6 md:border-r md:border-[#A67C52]/30 md:pr-8">
              <div className="p-5 bg-[#302117]/70 border border-[#A67C52]/40 rounded-sm relative">
                <span className="text-3xl font-serif text-[#C1A477] absolute -top-3 left-3 bg-[#261b14] px-1 leading-none">“</span>
                <p className="font-serif italic text-sm text-[#E8DCC5] leading-relaxed pt-2">
                  {quote}
                </p>
                <div className="mt-3 pt-3 border-t border-[#A67C52]/20 text-right">
                  <span className="text-xs font-mono tracking-wider text-[#A67C52] uppercase">
                    — Janardhan Aghav (Jandy)
                  </span>
                </div>
              </div>

              {/* Core Pillars */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-[#302117] border border-[#A67C52] flex items-center justify-center shrink-0 text-[#C1A477]">
                    <Microscope size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif font-semibold text-[#F2E9D7]">Empirical Inquiry</h4>
                    <p className="text-xs font-serif text-[#E8DCC5]/70">Moving students from rote text to observable biological phenomena in the lab.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-[#302117] border border-[#A67C52] flex items-center justify-center shrink-0 text-[#C1A477]">
                    <BookOpenCheck size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif font-semibold text-[#F2E9D7]">Visual Blackboard Pedagogy</h4>
                    <p className="text-xs font-serif text-[#E8DCC5]/70">Hand-drawn anatomical systems that demystify multi-layered physiological processes.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded bg-[#302117] border border-[#A67C52] flex items-center justify-center shrink-0 text-[#C1A477]">
                    <HeartHandshake size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-serif font-semibold text-[#F2E9D7]">Student-Centric Guidance</h4>
                    <p className="text-xs font-serif text-[#E8DCC5]/70">Individualized academic mentorship for Maharashtra HSC &amp; NEET-UG aspirants.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Biography & Philosophy */}
            <div className="md:col-span-7 space-y-6 text-[#E8DCC5]/90 font-serif leading-relaxed">
              <div className="space-y-4 text-sm sm:text-base">
                <p>
                  <span className="text-2xl font-bold font-serif text-[#C1A477] float-left mr-2 leading-none">B</span>
                  {bio}
                </p>

                <p>
                  At <strong className="text-[#F2E9D7]">SRJC, Thane</strong>, Professor Aghav guides higher secondary students through the intricate complexities of the living kingdom. His lectures interweave historical naturalist perspectives with modern cytological breakthroughs—bridging the gap between classical taxonomy and recombinant DNA genetics.
                </p>

                <div className="p-4 bg-[#302117]/50 border-l-2 border-[#A67C52] my-4">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[#C1A477] mb-1">
                    Pedagogical Creed
                  </h4>
                  <p className="text-xs sm:text-sm italic text-[#E8DCC5]">
                    {philosophy}
                  </p>
                </div>

                <p>
                  Whether guiding dissecting microscope sessions or conducting rigorous NEET question deconstruction workshops, his focus remains steadfast: cultivating students who not only excel in examinations, but also possess a lifelong reverence for biological sciences.
                </p>
              </div>

              {/* Demo note */}
              <div className="pt-4 border-t border-[#A67C52]/20">
                <p className="text-[11px] font-mono text-[#A67C52]/80">
                  {t('about_demo_note') || "Note: Biographical details shown reflect provisional demo data, fully editable via the Faculty Admin Portal."}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
