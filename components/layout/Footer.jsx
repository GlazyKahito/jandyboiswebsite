'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Lock, FileDown, ShieldCheck, Heart } from 'lucide-react';

export default function Footer({ profile }) {
  const { language, setLanguage } = useLanguage();
  const p = profile || {
    name: 'Janardhan Aghav',
    displayName: 'Jandy',
    institution: 'SRJC, Thane',
  };

  return (
    <footer className="py-12 px-4 sm:px-6 bg-[#160f0a] border-t border-[#A67C52]/30 text-[#E8DCC5]/70 text-xs font-serif">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-between">
          <div className="md:col-span-6 space-y-2">
            <div className="flex items-center gap-2 text-[#F2E9D7] font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-[#302117] border border-[#A67C52] flex items-center justify-center text-[#C1A477] text-xs font-mono">
                J
              </span>
              <span>{p.name} ({p.displayName}) — Faculty Portfolio</span>
            </div>
            <p className="text-xs text-[#E8DCC5]/60 max-w-md">
              Department of Biological Sciences, {p.institution}, Maharashtra, India. Dedicated to rigorous botanical and physiological scholarship.
            </p>
          </div>

          <div className="md:col-span-6 flex flex-wrap items-center md:justify-end gap-4 text-xs font-mono">
            {/* Language switcher */}
            <div className="flex items-center gap-2 p-1 bg-[#211711] border border-[#A67C52]/30 rounded">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2 py-0.5 rounded text-[11px] ${language === 'en' ? 'bg-[#A67C52] text-[#211711] font-bold' : 'hover:text-[#E8DCC5]'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('mr')}
                className={`px-2 py-0.5 rounded text-[11px] ${language === 'mr' ? 'bg-[#A67C52] text-[#211711] font-bold' : 'hover:text-[#E8DCC5]'}`}
              >
                मराठी
              </button>
              <button
                onClick={() => setLanguage('hi')}
                className={`px-2 py-0.5 rounded text-[11px] ${language === 'hi' ? 'bg-[#A67C52] text-[#211711] font-bold' : 'hover:text-[#E8DCC5]'}`}
              >
                हिंदी
              </button>
            </div>

            {/* CV download */}
            <a
              href="/api/resume/download"
              className="flex items-center gap-1 text-[#C1A477] hover:underline"
            >
              <FileDown size={13} />
              <span>Download CV</span>
            </a>

            {/* Faculty Portal */}
            <a
              href="/admin"
              className="flex items-center gap-1 text-[#A67C52] hover:text-[#E8DCC5] transition-colors"
            >
              <Lock size={12} />
              <span>Faculty Desk</span>
            </a>
          </div>
        </div>

        {/* Academic Colophon & Disclaimer */}
        <div className="pt-6 border-t border-[#A67C52]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#A67C52]">
          <p>
            © {new Date().getFullYear()} Janardhan Aghav (Jandy). All pedagogical rights reserved.
          </p>

          <p className="text-center sm:text-right font-mono text-[10px] text-[#73734E]">
            Verified: Faculty of SRJC, Thane. Fictional sample demo records are editable via Admin.
          </p>
        </div>

      </div>
    </footer>
  );
}
