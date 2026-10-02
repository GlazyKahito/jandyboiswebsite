'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { BookOpenCheck, Microscope, HeartHandshake } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import Reveal from '@/components/ui/Reveal';
import ScrollRevealText from '@/components/ui/ScrollRevealText';

const PILLARS = [
  {
    icon: Microscope,
    title: 'Empirical Inquiry',
    text: 'Moving students from rote text to observable biological phenomena in the lab.',
  },
  {
    icon: BookOpenCheck,
    title: 'Visual Blackboard Pedagogy',
    text: 'Hand-drawn anatomical systems that demystify multi-layered physiological processes.',
  },
  {
    icon: HeartHandshake,
    title: 'Student-Centric Guidance',
    text: 'Individualized academic mentorship for Maharashtra HSC & NEET-UG aspirants.',
  },
];

export default function AboutSection({ profile }) {
  const { t } = useLanguage();

  const bio = profile?.bio || 'Janardhan Aghav (affectionately known as Jandy) is a dedicated Biology educator at SRJC, Thane.';
  const philosophy = profile?.philosophy || 'Biology is not a tedious catalogue of nomenclature; it is the poetic architecture of existence.';
  const quote = profile?.quote || 'To observe nature closely is to study the grandest manuscript ever written.';

  return (
    <section id="about" className="relative px-4 py-24 sm:px-6 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          index="02"
          label="Ex Libris / Manuscript Folio"
          title={t('about_title') || 'Academic Philosophy & Biography'}
          subtitle={t('about_subtitle') || 'From Botanical Specimens to Cellular Mechanisms'}
        />

        {/* Pull quote */}
        <Reveal>
          <blockquote className="border-l border-phosphor pl-6 sm:pl-10">
            <ScrollRevealText
              text={`“${quote}”`}
              className="max-w-5xl font-serif text-2xl font-light italic leading-[1.2] text-ivory sm:text-4xl"
            />
            <footer className="label mt-6">— Janardhan Aghav (Jandy)</footer>
          </blockquote>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:mt-24 lg:grid-cols-12 lg:gap-16">
          {/* Biography */}
          <Reveal className="space-y-5 text-[15px] leading-relaxed text-parchment/80 sm:text-base lg:col-span-7">
            <p className="first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-gold">
              {bio}
            </p>

            <p>
              At <strong className="font-medium text-ivory">SRJC, Thane</strong>, Professor Aghav guides higher secondary students through the intricate complexities of the living kingdom. His lectures interweave historical naturalist perspectives with modern cytological breakthroughs—bridging the gap between classical taxonomy and recombinant DNA genetics.
            </p>

            <p>
              Whether guiding dissecting microscope sessions or conducting rigorous NEET question deconstruction workshops, his focus remains steadfast: cultivating students who not only excel in examinations, but also possess a lifelong reverence for biological sciences.
            </p>

            <p className="border-t border-line pt-5 font-mono text-[11px] leading-relaxed text-bronze/80">
              {t('about_demo_note') || "Note: Biographical details shown reflect provisional demo data, fully editable via the Faculty Admin Portal."}
            </p>
          </Reveal>

          {/* Creed & pillars */}
          <Reveal delay={0.1} className="lg:col-span-5">
            <div className="panel ticks p-6 sm:p-8">
              <div className="label text-phosphor">Pedagogical Creed</div>
              <p className="mt-4 font-serif text-xl font-light leading-snug text-parchment">
                {philosophy}
              </p>
            </div>

            <ul className="mt-2 divide-y divide-line border-b border-line">
              {PILLARS.map((pillar, idx) => (
                <li key={pillar.title} className="flex items-start gap-4 py-5">
                  <span className="font-mono text-[11px] text-bronze">{String(idx + 1).padStart(2, '0')}</span>
                  <div className="flex-1">
                    <h3 className="font-serif text-lg text-ivory">{pillar.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-parchment/65">{pillar.text}</p>
                  </div>
                  <pillar.icon size={18} className="mt-1 shrink-0 text-gold" strokeWidth={1.5} />
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
