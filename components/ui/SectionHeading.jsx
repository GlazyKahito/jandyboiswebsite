'use client';

import React from 'react';
import Reveal from '@/components/ui/Reveal';

export default function SectionHeading({ index, label, title, subtitle }) {
  return (
    <Reveal className="mb-14 sm:mb-20">
      <div className="label flex items-center gap-4">
        <span className="text-phosphor">[{index}]</span>
        <span>{label}</span>
        <span className="h-px flex-1 bg-line" />
        <span className="hidden sm:inline">{index} / 08</span>
      </div>
      <h2 className="mt-7 max-w-4xl font-serif text-4xl font-light leading-[1.05] text-ivory sm:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl font-mono text-xs leading-relaxed text-bronze sm:text-sm">
          <span className="text-phosphor">{'//'}</span> {subtitle}
        </p>
      )}
    </Reveal>
  );
}
