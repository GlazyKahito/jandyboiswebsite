'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  FileDown, 
  Send, 
  Globe, 
  Menu, 
  X, 
  Sparkles, 
  BookOpen, 
  GraduationCap, 
  Briefcase, 
  Award, 
  FolderDown, 
  Compass,
  Lock
} from 'lucide-react';

export default function FloatingNav() {
  const { language, setLanguage, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check current visible section
      const sections = ['hero', 'about', 'education', 'experience', 'skills', 'achievements', 'resources', 'contact'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: t('nav_home') || 'Archive', icon: Compass },
    { id: 'about', label: t('nav_about') || 'About', icon: BookOpen },
    { id: 'education', label: t('nav_education') || 'Education', icon: GraduationCap },
    { id: 'experience', label: t('nav_experience') || 'Chronicles', icon: Briefcase },
    { id: 'skills', label: t('nav_expertise') || 'Mastery', icon: Sparkles },
    { id: 'achievements', label: t('nav_achievements') || 'Milestones', icon: Award },
    { id: 'resources', label: t('nav_resources') || 'Teaching Folio', icon: FolderDown },
    { id: 'contact', label: t('nav_contact') || 'Correspondence', icon: Send },
  ];

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' },
  ];

  return (
    <>
      <header
        className={`fixed top-4 left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-6 pointer-events-none`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Logo / Scholar Crest */}
          <button
            onClick={() => scrollTo('hero')}
            className="flex items-center gap-2.5 px-3.5 py-2 rounded-full nav-glass group transition-transform active:scale-95"
          >
            <div className="w-7 h-7 rounded-full bg-[#302117] border border-[#C1A477] flex items-center justify-center text-[#C1A477] group-hover:rotate-12 transition-transform">
              <span className="font-serif font-bold text-xs">J</span>
            </div>
            <div className="text-left hidden sm:block">
              <span className="text-xs font-serif font-bold tracking-wider text-[#F2E9D7] block leading-none">
                JANARDHAN AGHAV
              </span>
              <span className="text-[10px] text-[#A67C52] tracking-widest font-mono uppercase block mt-0.5">
                SRJC • BIOLOGY
              </span>
            </div>
          </button>

          {/* Center Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 px-3 py-1.5 rounded-full nav-glass">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`px-3 py-1 text-xs font-serif tracking-wider transition-all rounded-full ${
                    isActive
                      ? 'bg-[#A67C52] text-[#211711] font-semibold shadow-sm'
                      : 'text-[#E8DCC5]/80 hover:text-[#F2E9D7] hover:bg-[#A67C52]/15'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Actions: Language Switcher, Résumé CTA & Faculty Desk */}
          <div className="flex items-center gap-2 nav-glass px-2.5 py-1.5 rounded-full">
            {/* Language dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-1 text-xs text-[#E8DCC5] hover:text-[#C1A477] transition-colors rounded-full hover:bg-[#A67C52]/20"
                title="Select Language"
              >
                <Globe size={13} className="text-[#A67C52]" />
                <span className="uppercase font-mono text-[11px] font-medium">{language}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-32 bg-[#211711] border border-[#A67C52] rounded shadow-xl py-1 z-50 overflow-hidden">
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => {
                        setLanguage(l.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#A67C52]/20 transition-colors ${
                        language === l.code ? 'text-[#C1A477] font-semibold bg-[#302117]' : 'text-[#E8DCC5]'
                      }`}
                    >
                      <span>{l.native}</span>
                      <span className="text-[10px] text-[#A67C52] uppercase font-mono">{l.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Download Résumé CTA */}
            <a
              href="/api/resume/download"
              download="Janardhan_Aghav_Jandy_Resume.pdf"
              className="flex items-center gap-1.5 px-3 py-1 text-xs font-serif font-medium tracking-wide bg-[#302117] text-[#C1A477] border border-[#A67C52]/70 rounded-full hover:bg-[#A67C52] hover:text-[#211711] transition-all shadow-sm"
              title="Download Vintage Academic CV (PDF)"
            >
              <FileDown size={13} />
              <span className="hidden md:inline">Résumé</span>
            </a>

            {/* Admin Desk Link */}
            <a
              href="/admin"
              className="p-1.5 text-[#A67C52] hover:text-[#C1A477] hover:bg-[#A67C52]/20 rounded-full transition-colors"
              title="Faculty Portal"
            >
              <Lock size={13} />
            </a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-[#E8DCC5] hover:text-[#C1A477] transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 max-w-md mx-auto pointer-events-auto bg-[#211711]/95 backdrop-blur-md border border-[#A67C52]/60 rounded-2xl p-4 shadow-2xl">
            <div className="grid grid-cols-2 gap-2 mb-3">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`flex items-center gap-2 p-2 rounded text-xs font-serif text-left transition-colors ${
                    activeSection === link.id
                      ? 'bg-[#A67C52] text-[#211711] font-semibold'
                      : 'text-[#E8DCC5] hover:bg-[#302117]'
                  }`}
                >
                  <link.icon size={13} className="shrink-0 text-[#C1A477]" />
                  <span className="truncate">{link.label}</span>
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-[#A67C52]/30 flex items-center justify-between">
              <a
                href="/api/resume/download"
                className="flex items-center gap-1.5 text-xs text-[#C1A477] font-serif hover:underline"
              >
                <FileDown size={14} />
                <span>Download Academic CV (PDF)</span>
              </a>

              <a
                href="/admin"
                className="text-[11px] text-[#A67C52] font-mono hover:text-[#E8DCC5] flex items-center gap-1"
              >
                <Lock size={12} />
                <span>Faculty Login</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
