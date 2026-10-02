'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { useSmoothScroll } from '@/components/layout/SmoothScroll';
import { Lock, FileDown, ArrowUp } from 'lucide-react';

const LANGS = [
  { code: 'en', label: 'EN' },
  { code: 'mr', label: 'मराठी' },
  { code: 'hi', label: 'हिंदी' },
];

export default function Footer({ profile }) {
  const { language, setLanguage } = useLanguage();
  const { scrollTo } = useSmoothScroll();
  const p = profile || {
    name: 'Janardhan Aghav',
    displayName: 'Jandy',
    institution: 'SRJC, Thane',
  };

  return (
    <footer className="relative z-10 overflow-hidden border-t border-line bg-ink px-4 pt-16 sm:px-6">
      <div className="mx-auto max-w-7xl">

        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="label text-phosphor">Colophon</div>
            <p className="mt-4 max-w-md font-serif text-2xl font-light leading-snug text-ivory">
              {p.name} ({p.displayName}) — Faculty Portfolio
            </p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-parchment/60">
              Department of Biological Sciences, {p.institution}, Maharashtra, India. Dedicated to rigorous botanical and physiological scholarship.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="label">Language</div>
            <div className="mt-4 inline-flex border border-line">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLanguage(l.code)}
                  className={`px-3 py-1.5 font-mono text-[11px] transition-colors ${
                    language === l.code ? 'bg-gold text-ink' : 'text-parchment/70 hover:text-ivory'
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="label">Access</div>
            <ul className="mt-4 space-y-2.5 font-mono text-xs uppercase tracking-wider">
              <li>
                <a href="/api/resume/download" className="flex items-center gap-2 text-gold transition-colors hover:text-phosphor">
                  <FileDown size={13} />
                  <span>Download CV</span>
                </a>
              </li>
              <li>
                <a href="/admin" className="flex items-center gap-2 text-bronze transition-colors hover:text-parchment">
                  <Lock size={12} />
                  <span>Faculty Desk</span>
                </a>
              </li>
              <li>
                <button onClick={() => scrollTo('hero')} className="flex items-center gap-2 uppercase tracking-wider text-bronze transition-colors hover:text-parchment">
                  <ArrowUp size={13} />
                  <span>Back to top</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Colophon & disclaimer */}
        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 font-mono text-[11px] text-bronze sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} Janardhan Aghav (Jandy). All pedagogical rights reserved.
          </p>
          <p className="text-moss sm:text-right">
            Verified: Faculty of {p.institution}. Fictional sample demo records are editable via Admin.
          </p>
        </div>

        {/* Oversized wordmark */}
        <div
          className="pointer-events-none mt-6 select-none whitespace-nowrap text-center font-serif text-[22vw] font-light italic leading-[0.95] text-gold/10"
          aria-hidden="true"
        >
          {p.displayName}
        </div>
      </div>
    </footer>
  );
}
