'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}

// Words light up one by one as the block scrolls through the viewport
export default function ScrollRevealText({ text, className = '' }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.35'],
  });

  const words = String(text).split(/\s+/).filter(Boolean);

  return (
    <p ref={ref} className={className}>
      {words.map((word, idx) => (
        <Word
          key={idx}
          progress={scrollYProgress}
          range={[idx / words.length, (idx + 1) / words.length]}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}
