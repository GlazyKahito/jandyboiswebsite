'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { useSmoothScroll } from '@/components/layout/SmoothScroll';
import { FileDown, Globe, Menu, X, Lock } from 'lucide-react';

const SECTION_IDS = ['hero', 'about', 'education', 'experience', 'skills', 'achievements', 'resources', 'contact'];

export default function FloatingNav() {
  const { language, setLanguage, t } = useLanguage();
  const { scrollTo: smoothScrollTo } = useSmoothScroll();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  useEffect(() => {
    const handleScroll = () => {
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: t('nav_home') || 'Archive' },
    { id: 'about', label: t('nav_about') || 'About' },
    { id: 'education', label: t('nav_education') || 'Education' },
    { id: 'experience', label: t('nav_experience') || 'Chronicles' },
    { id: 'skills', label: t('nav_expertise') || 'Mastery' },
    { id: 'achievements', label: t('nav_achievements') || 'Milestones' },
    { id: 'resources', label: t('nav_resources') || 'Teaching Folio' },
    { id: 'contact', label: t('nav_contact') || 'Correspondence' },
  ];

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    smoothScrollTo(id);
  };

  const languages = [
    { code: 'en', native: 'English' },
    { code: 'mr', native: 'मराठी' },
    { code: 'hi', native: 'हिंदी' },
  ];

  return (
    <>
      {/* Scroll progress hairline */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-50 h-px origin-left bg-phosphor"
        aria-hidden="true"
      />

      <header className="pointer-events-none fixed inset-x-0 top-4 z-40 px-3 sm:px-6">
        <div className="pointer-events-auto mx-auto flex max-w-7xl items-center justify-between gap-3">

          {/* Crest */}
          <button
            onClick={() => scrollTo('hero')}
            className="nav-glass group flex items-center gap-2.5 px-2.5 py-2 transition-transform active:scale-95"
          >
            <span className="flex h-7 w-7 items-center justify-center border border-gold/60 font-serif text-sm text-gold transition-colors group-hover:border-phosphor group-hover:text-phosphor">
              J
            </span>
            <span className="hidden whitespace-nowrap pr-1.5 text-left sm:block">
              <span className="block font-mono text-[11px] font-medium uppercase leading-none tracking-[0.14em] text-ivory">
                Janardhan Aghav
              </span>
              <span className="mt-1 block font-mono text-[10px] uppercase leading-none tracking-[0.14em] text-bronze">
                SRJC / Biology
              </span>
            </span>
          </button>

          {/* Center dock with sliding pill */}
          <nav className="nav-glass relative hidden items-center gap-0.5 p-1 xl:flex">
            {navLinks.map((link, idx) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`relative z-10 whitespace-nowrap px-2.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.08em] transition-colors ${
                    isActive ? 'font-medium text-ink' : 'text-parchment/65 hover:text-ivory'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      className="absolute inset-0 -z-10 bg-gold"
                    />
                  )}
                  <span className={`mr-1.5 hidden 2xl:inline ${isActive ? 'text-ink/60' : 'text-bronze/70'}`}>
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right actions: language, résumé, admin */}
          <div className="nav-glass flex items-center gap-1 p-1">
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-parchment transition-colors hover:text-phosphor"
                title="Select Language"
              >
                <Globe size={13} className="text-bronze" />
                <span>{language}</span>
              </button>

              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className="nav-glass absolute right-0 top-full z-50 mt-2 w-36 py-1"
                  >
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLanguage(l.code);
                          setLangDropdownOpen(false);
                        }}
                        className={`flex w-full items-center justify-between px-3 py-2 text-left text-xs transition-colors hover:bg-gold/10 ${
                          language === l.code ? 'text-phosphor' : 'text-parchment'
                        }`}
                      >
                        <span>{l.native}</span>
                        <span className="font-mono text-[10px] uppercase text-bronze">{l.code}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="/api/resume/download"
              download="Janardhan_Aghav_Jandy_Resume.pdf"
              className="btn-shimmer flex items-center gap-1.5 border border-gold/50 px-2.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-gold transition-colors hover:border-phosphor hover:text-phosphor"
              title="Download Academic CV (PDF)"
            >
              <FileDown size={13} />
              <span className="hidden md:inline">Résumé</span>
            </a>

            <a
              href="/admin"
              className="p-2 text-bronze transition-colors hover:text-phosphor"
              title="Faculty Portal"
              aria-label="Faculty Portal"
            >
              <Lock size={13} />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-parchment transition-colors hover:text-phosphor xl:hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile index menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.2 }}
              className="nav-glass ticks pointer-events-auto mx-auto mt-2 max-w-md p-4 xl:hidden"
            >
              <div className="label mb-2">Index</div>
              <div className="divide-y divide-line">
                {navLinks.map((link, idx) => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className={`flex w-full items-baseline gap-3 py-2.5 text-left transition-colors ${
                      activeSection === link.id ? 'text-phosphor' : 'text-parchment hover:text-ivory'
                    }`}
                  >
                    <span className="font-mono text-[10px] text-bronze">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="font-serif text-lg">{link.label}</span>
                  </button>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-line pt-3 font-mono text-[11px] uppercase tracking-wider">
                <a href="/api/resume/download" className="flex items-center gap-1.5 text-gold hover:text-phosphor">
                  <FileDown size={13} />
                  <span>Download CV</span>
                </a>
                <a href="/admin" className="flex items-center gap-1.5 text-bronze hover:text-parchment">
                  <Lock size={12} />
                  <span>Faculty Login</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
