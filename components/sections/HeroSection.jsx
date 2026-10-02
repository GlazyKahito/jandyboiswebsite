'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useSmoothScroll } from '@/components/layout/SmoothScroll';
import { FileDown, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import LiveClock from '@/components/ui/LiveClock';

const TICKER = [
  'Plant Physiology',
  'Human Anatomy',
  'Cytogenetics',
  'Laboratory Histology',
  'HSC Biology',
  'NEET-UG',
  'Botany',
  'Zoology',
];

// Facts as listed on the college's faculty page
const READOUTS = [
  { value: 'Biology', label: 'Subject' },
  { value: 'M.Sc., B.Ed.', label: 'Qualification' },
  { value: 'XI & XII', label: 'Classes · HSC Board' },
];

const ease = [0.16, 1, 0.3, 1];

export default function HeroSection({ profile }) {
  const { t } = useLanguage();
  const { scrollTo } = useSmoothScroll();

  const p = profile || {
    name: 'Janardhan Aghav',
    displayName: 'Jandy',
    title: 'Biology Faculty / Senior Educator',
    institution: 'SRJC, Thane',
    location: 'Thane, Maharashtra, India',
    photoUrl: '/images/portrait_jandy_engraving.svg',
  };

  const [firstName, ...restName] = (p.name || '').split(' ');

  // Parallax: the plate drifts up and the title sinks slightly while scrolling away
  const { scrollY } = useScroll();
  const plateY = useTransform(scrollY, [0, 900], [0, -70]);
  const titleY = useTransform(scrollY, [0, 900], [0, 50]);

  return (
    <section id="hero" className="relative flex min-h-screen flex-col overflow-hidden pt-32 sm:pt-36">
      {/* Ambient lighting */}
      <div className="cinematic-vignette absolute inset-0" />
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-phosphor/[0.07] blur-[150px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6">
        <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-10">

          {/* Left: title block */}
          <motion.div style={{ y: titleY }} className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="label flex flex-wrap items-center gap-x-3 gap-y-1"
            >
              <span className="blink h-1.5 w-1.5 bg-phosphor" />
              <span className="text-gold">{t('hero_greeting') || "Naturalist & Educator's Archive"}</span>
              <span className="text-bronze/50">/</span>
              <span>{p.institution}</span>
            </motion.div>

            <h1 className="mt-7 break-words font-serif text-[clamp(3.25rem,8.6vw,7.75rem)] font-light leading-[0.92] text-ivory">
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.05, ease }}
                className="block"
              >
                {firstName}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.15, ease }}
                className="block italic text-gold-gradient"
              >
                {restName.join(' ')}
              </motion.span>
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease }}
              className="mt-8 space-y-6"
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="border border-gold/40 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-gold">
                  aka “{p.displayName}”
                </span>
                <span className="font-serif text-xl text-parchment sm:text-2xl">
                  {t('hero_title') || p.title}
                </span>
              </div>

              <p className="max-w-xl text-[15px] leading-relaxed text-parchment/75 sm:text-base">
                {t('hero_tagline') || "Exploring the intricate architecture of living systems, inspiring scientific curiosity, and guiding students towards mastery in Maharashtra State Board & NEET-UG Biology."}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button onClick={() => scrollTo('resources')} className="btn btn-primary btn-shimmer">
                  <span>{t('hero_cta_explore') || "Examine Field Notes"}</span>
                  <ArrowDownRight size={14} />
                </button>

                <a
                  href="/api/resume/download"
                  download="Janardhan_Aghav_Jandy_Resume.pdf"
                  className="btn btn-ghost"
                >
                  <FileDown size={14} className="text-gold" />
                  <span>{t('hero_cta_resume') || "Download Résumé (PDF)"}</span>
                </a>

                <button
                  onClick={() => scrollTo('contact')}
                  className="group flex items-center gap-1.5 px-2 py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-gold transition-colors hover:text-phosphor"
                >
                  <span>{t('hero_cta_contact') || "Direct Inquiry"}</span>
                  <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: specimen plate */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="flex justify-center lg:col-span-5 lg:justify-end"
          >
            <motion.figure style={{ y: plateY }} className="panel ticks w-full max-w-sm p-3">
              <div className="label flex items-center justify-between pb-3">
                <span>Plate 01</span>
                <span className="text-moss">Specimen: Educator</span>
              </div>

              <div className="relative aspect-[4/5] overflow-hidden bg-walnut">
                <img
                  src={p.photoUrl || "/images/portrait_jandy_engraving.svg"}
                  alt={p.name}
                  className="h-full w-full object-contain p-4"
                />
                <div className="scanlines pointer-events-none absolute inset-0" />
                {/* Crosshair */}
                <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-phosphor/15" />
                <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px bg-phosphor/15" />
                <span className="absolute left-2 top-2 font-mono text-[9px] uppercase tracking-widest text-bronze">x 1.00</span>
                <span className="absolute bottom-2 right-2 font-mono text-[9px] uppercase tracking-widest text-bronze">Fig. A</span>
              </div>

              <figcaption className="flex items-end justify-between gap-3 pt-3">
                <span className="font-serif text-base italic text-parchment">“Scientia et Natura”</span>
                <span className="label text-right">{p.location}</span>
              </figcaption>
            </motion.figure>
          </motion.div>
        </div>

        {/* Instrument readout strip */}
        <motion.dl
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-14 grid grid-cols-3 border-y border-line lg:mt-20 lg:grid-cols-4"
        >
          {READOUTS.map((m, idx) => (
            <div key={m.label} className={`py-5 pr-3 ${idx > 0 ? 'border-l border-line pl-4 sm:pl-6' : ''}`}>
              <dt className="label">{m.label}</dt>
              <dd className="mt-2 font-serif text-xl font-light text-ivory sm:text-4xl">{m.value}</dd>
            </div>
          ))}
          <div className="col-span-3 border-t border-line py-5 lg:col-span-1 lg:border-l lg:border-t-0 lg:pl-6">
            <dt className="label">Station</dt>
            <dd className="mt-2 font-mono text-xs leading-relaxed text-parchment/80">
              19.2183° N, 72.9781° E
              <span className="block text-gold"><LiveClock /></span>
              <span className="block text-moss">
                <span className="blink mr-1.5 inline-block h-1.5 w-1.5 bg-moss align-middle" />
                Accepting enquiries
              </span>
            </dd>
          </div>
        </motion.dl>
      </div>

      {/* Subject ticker */}
      <div className="relative z-10 mt-10 overflow-hidden border-y border-line bg-soot/60" aria-hidden="true">
        <div className="marquee flex w-max py-3">
          {[...TICKER, ...TICKER].map((item, idx) => (
            <span key={idx} className="label flex items-center whitespace-nowrap pr-10 text-parchment/60">
              <span className="mr-10 text-phosphor">✦</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
