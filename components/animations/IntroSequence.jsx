'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const BOOT_LINES = [
  { at: 6, text: 'mounting archive' },
  { at: 30, text: 'calibrating optics' },
  { at: 58, text: 'indexing specimens' },
  { at: 84, text: 'opening field journal' },
];

const ease = [0.76, 0, 0.24, 1];
const COUNT_MS = 2100;

// Instrument boot sequence: a reticle counts up to 100, the name is stamped in,
// then the whole panel lifts away like a shutter.
export default function IntroSequence({ profile, onComplete }) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState('boot'); // boot -> title
  const reduceMotion = useReducedMotion();
  const rootRef = useRef(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const name = profile?.name || 'Janardhan Aghav';
  const [firstName, ...restName] = name.split(' ');

  const finish = () => {
    sessionStorage.setItem('jandy_intro_seen', 'true');
    onCompleteRef.current();
  };

  useEffect(() => {
    // Returning visitors in this session, and anyone who prefers reduced motion, skip straight in
    if (sessionStorage.getItem('jandy_intro_seen') === 'true' || reduceMotion) {
      // Hide the panel straight away so its exit animation never shows
      if (rootRef.current) rootRef.current.style.display = 'none';
      finish();
      return;
    }

    // Hand-rolled counter: drives the reticle, the boot log and the switch to the title card
    const start = performance.now();
    let frame;
    const tick = (now) => {
      const t = Math.min((now - start) / COUNT_MS, 1);
      const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setCount(Math.round(eased * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const toTitle = setTimeout(() => setPhase('title'), COUNT_MS + 150);
    const done = setTimeout(() => finish(), COUNT_MS + 2100);

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(toTitle);
      clearTimeout(done);
    };
  }, [reduceMotion]);

  return (
    <motion.div
      ref={rootRef}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.95, ease }}
      className="fixed inset-0 z-50 overflow-hidden bg-ink text-parchment"
    >
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      
      {/* Frame readouts */}
      <div className="label absolute left-5 top-5 sm:left-8 sm:top-7">
        <span className="blink mr-2 inline-block h-1.5 w-1.5 bg-phosphor align-middle" />
        SRJC / Biology Archive
      </div>
      <button
        onClick={() => finish()}
        className="label absolute right-5 top-4 flex items-center gap-1 border border-line px-3 py-2 text-parchment transition-colors hover:border-gold hover:text-phosphor sm:right-8 sm:top-6"
      >
        <span>Skip Intro</span>
        <ChevronRight size={12} />
      </button>

      <div className="relative flex h-full flex-col items-center justify-center px-6">
        {phase === 'boot' ? (
          <div key="boot" className="flex flex-col items-center">
            {/* Reticle */}
            <div className="relative h-56 w-56 sm:h-72 sm:w-72">
              <motion.svg
                viewBox="0 0 200 200"
                className="absolute inset-0 h-full w-full"
                animate={{ rotate: 90 }}
                transition={{ duration: 2.1, ease: [0.65, 0, 0.35, 1] }}
                aria-hidden="true"
              >
                <circle cx="100" cy="100" r="96" fill="none" stroke="#C1A477" strokeOpacity="0.18" strokeWidth="0.6" />
                <circle
                  cx="100"
                  cy="100"
                  r="96"
                  fill="none"
                  stroke="#F2A93B"
                  strokeWidth="1"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset={100 - count}
                  transform="rotate(-90 100 100)"
                />
                <circle cx="100" cy="100" r="74" fill="none" stroke="#C1A477" strokeOpacity="0.3" strokeWidth="0.5" strokeDasharray="1 5" />
                {[0, 90, 180, 270].map((deg) => (
                  <line key={deg} x1="100" y1="2" x2="100" y2="16" stroke="#C1A477" strokeWidth="0.8" transform={`rotate(${deg} 100 100)`} />
                ))}
              </motion.svg>

              {/* Crosshair */}
              <div className="absolute inset-x-6 top-1/2 h-px bg-gold/15" />
              <div className="absolute inset-y-6 left-1/2 w-px bg-gold/15" />

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-serif text-6xl font-light tabular-nums text-ivory sm:text-7xl">
                  {String(count).padStart(3, '0')}
                </span>
                <span className="label mt-1">Percent</span>
              </div>
            </div>

            {/* Boot log */}
            <ul className="mt-10 h-24 w-72 space-y-1.5 font-mono text-[11px] text-parchment/70 sm:w-80">
              {BOOT_LINES.filter((line) => count >= line.at).map((line) => (
                <motion.li
                  key={line.text}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-baseline gap-2"
                >
                  <span className="text-phosphor">&gt;</span>
                  <span>{line.text}</span>
                  <span className="flex-1 border-b border-dotted border-line" />
                  <span className="text-moss">ok</span>
                </motion.li>
              ))}
            </ul>
          </div>
        ) : (
          <div key="title" className="text-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="label mb-6 text-gold"
            >
              Field Journal &amp; Teaching Archive
            </motion.div>

            <h1 className="text-3d font-serif text-[clamp(3rem,11vw,9rem)] font-light leading-[0.92] text-ivory">
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  initial={{ y: 180 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease }}
                  className="block"
                >
                  {firstName}
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.18em]">
                <motion.span
                  initial={{ y: 180 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1, ease }}
                  className="block italic text-gold-gradient"
                >
                  {restName.join(' ')}
                </motion.span>
              </span>
            </h1>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.9, delay: 0.25, ease }}
              className="mx-auto mt-6 h-px w-48 origin-center bg-phosphor sm:w-72"
            />
          </div>
        )}
      </div>

      {/* Bottom rail */}
      <div className="label absolute inset-x-5 bottom-5 flex items-center justify-between sm:inset-x-8 sm:bottom-7">
        <span>19.2183° N, 72.9781° E</span>
        <span className="hidden sm:inline">Thane, Maharashtra</span>
        <span className="tabular-nums text-phosphor">{String(count).padStart(3, '0')} / 100</span>
      </div>
    </motion.div>
  );
}
