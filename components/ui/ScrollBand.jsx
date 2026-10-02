'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

// Oversized outlined type that drifts sideways as the page scrolls
export default function ScrollBand({ items = [], reverse = false }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.5 });
  const x = useTransform(smooth, [0, 1], reverse ? ['-38%', '0%'] : ['0%', '-38%']);

  const row = [...items, ...items, ...items];

  return (
    <div ref={ref} className="relative overflow-hidden border-t border-line py-10 sm:py-14" aria-hidden="true">
      <motion.div style={{ x }} className="flex w-max items-center whitespace-nowrap">
        {row.map((item, idx) => (
          <span
            key={idx}
            className={`flex items-center font-serif text-[15vw] font-light leading-none sm:text-[9vw] ${
              idx % 2 === 0 ? 'text-outline italic' : 'text-ivory/90'
            }`}
          >
            {item}
            <span className="mx-[3vw] font-mono text-[2vw] text-phosphor sm:text-[1.2vw]">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
