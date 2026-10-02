'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Sparkles, Volume2, VolumeX, ChevronRight } from 'lucide-react';

export default function BookOpeningIntro({ onComplete }) {
  const [stage, setStage] = useState(0); // 0: Book closed, 1: Book opening, 2: Reveal engraving & title, 3: Completed
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Check if user has already seen intro this session
    const seen = sessionStorage.getItem('jandy_intro_seen');
    if (seen === 'true') {
      onComplete();
      return;
    }

    // Sequence timer
    const t1 = setTimeout(() => setStage(1), 800); // Start opening
    const t2 = setTimeout(() => setStage(2), 2400); // Reveal engraving & title
    const t3 = setTimeout(() => {
      sessionStorage.setItem('jandy_intro_seen', 'true');
      onComplete();
    }, 5500); // Complete

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem('jandy_intro_seen', 'true');
    onComplete();
  };

  const playAmbientSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 1.2);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch (e) {
      console.warn('Audio not allowed', e);
    }
  };

  const toggleSound = () => {
    if (!soundEnabled) {
      playAmbientSound();
      setSoundEnabled(true);
    } else {
      setSoundEnabled(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#191715] text-[#E8DCC5] overflow-hidden"
    >
      {/* Ambient background glow & dust particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#A67C52]/10 rounded-full blur-[120px]" />
        
        {/* Floating dust particles */}
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#C1A477]/40 rounded-full"
            style={{
              top: `${(i * 19) % 95}%`,
              left: `${(i * 23) % 95}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Controls: Skip & Audio */}
      <div className="absolute top-6 right-8 flex items-center gap-4 z-20">
        <button
          onClick={toggleSound}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#C1A477] border border-[#A67C52]/40 rounded hover:bg-[#A67C52]/20 transition-colors"
          title="Toggle ambient page sound"
        >
          {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          <span>{soundEnabled ? 'Ambient Sound On' : 'Sound Off'}</span>
        </button>

        <button
          onClick={handleSkip}
          className="flex items-center gap-1 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-[#E8DCC5] bg-[#302117] border border-[#A67C52] rounded hover:bg-[#A67C52] hover:text-[#211711] transition-all shadow-lg"
        >
          <span>Skip Intro</span>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* 3D Vintage Book Container */}
      <div className="relative perspective-1000 w-[320px] sm:w-[420px] md:w-[540px] h-[400px] sm:h-[460px] flex items-center justify-center">
        {/* Shadow underneath */}
        <div className="absolute -bottom-10 w-[80%] h-8 bg-black/60 rounded-full blur-xl" />

        {/* The Antique Book Cover & Pages */}
        <div className="relative w-full h-full transform-style-3d flex items-center justify-center">
          {/* Base Page Spread (Inside) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: stage >= 1 ? 1 : 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-[#F2E9D7] text-[#211711] rounded shadow-2xl border-4 border-[#302117] p-6 sm:p-8 flex flex-col justify-between overflow-hidden"
          >
            {/* Aged Paper Grain Texture & Ornamental Inner Frame */}
            <div className="absolute inset-3 border border-[#A67C52]/50 pointer-events-none" />
            <div className="absolute inset-4 border border-[#A67C52]/20 pointer-events-none" />
            
            {/* Center Book Spine Crease */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#A67C52]/60 via-[#302117]/30 to-[#A67C52]/60 shadow-[0_0_12px_rgba(0,0,0,0.4)]" />

            {/* Stage 2 Content: Botanical Engraving & Scholarly Reveal */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: stage >= 2 ? 1 : 0, scale: stage >= 2 ? 1 : 0.8 }}
                transition={{ duration: 1 }}
                className="w-24 h-24 sm:w-28 sm:h-28 mb-3 rounded-full border border-[#A67C52] p-1 bg-[#E8DCC5] shadow-inner flex items-center justify-center overflow-hidden"
              >
                <img
                  src="/images/portrait_jandy_engraving.svg"
                  alt="Janardhan Aghav"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: stage >= 2 ? 1 : 0, y: stage >= 2 ? 0 : 15 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="text-[10px] sm:text-xs tracking-[0.25em] uppercase text-[#73734E] font-serif block mb-1">
                  Private Academic Archive • Folio MDCCCCXXVI
                </span>
                <h1 className="text-2xl sm:text-4xl font-serif font-bold tracking-tight text-[#211711] mb-1">
                  JANARDHAN AGHAV
                </h1>
                <div className="inline-block px-3 py-0.5 bg-[#A67C52]/15 border border-[#A67C52]/40 rounded-full text-xs font-serif italic text-[#A67C52] tracking-wide mb-2">
                  "Jandy"
                </div>
                <h2 className="text-sm sm:text-base font-serif tracking-widest uppercase text-[#302117] font-semibold">
                  BIOLOGY EDUCATOR
                </h2>
                <p className="text-xs font-serif text-[#73734E] mt-1">
                  SRJC, Thane • Maharashtra, India
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: stage >= 2 ? 1 : 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-4"
              >
                <button
                  onClick={handleSkip}
                  className="px-5 py-2 text-xs font-serif tracking-wider uppercase bg-[#302117] text-[#E8DCC5] hover:bg-[#A67C52] hover:text-[#211711] transition-all rounded shadow-md border border-[#A67C52]"
                >
                  Enter Archive & Explore Portfolio
                </button>
              </motion.div>
            </div>

            {/* Bottom Book Page Numerals */}
            <div className="flex justify-between text-[9px] text-[#A67C52]/70 font-mono tracking-widest uppercase z-10">
              <span>Folio 01 — Frontispiece</span>
              <span>Ex Libris • Naturalia</span>
            </div>
          </motion.div>

          {/* Front Cover that Flips Open */}
          <motion.div
            initial={{ rotateY: 0 }}
            animate={{ rotateY: stage >= 1 ? -150 : 0 }}
            transition={{ duration: 1.8, ease: [0.65, 0, 0.35, 1] }}
            style={{ transformOrigin: 'left center' }}
            className={`absolute inset-0 bg-gradient-to-r from-[#1b120c] via-[#302117] to-[#211711] rounded shadow-2xl border-4 border-[#A67C52]/80 p-8 flex flex-col justify-between backface-hidden ${stage >= 2 ? 'pointer-events-none opacity-0' : ''}`}
          >
            {/* Embossed Leather Spine & Gold Foil Border */}
            <div className="absolute inset-3 border-2 border-[#C1A477]/40 pointer-events-none" />
            <div className="absolute inset-5 border border-[#A67C52]/30 pointer-events-none" />

            <div className="text-center z-10">
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#C1A477] font-serif">
                SRJC Thane • Department of Biology
              </span>
            </div>

            <div className="text-center z-10 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border border-[#C1A477] flex items-center justify-center mb-4 text-[#C1A477] bg-[#211711]/60">
                <BookOpen size={28} />
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#F2E9D7] tracking-wider mb-2">
                FLORA ET FAUNA
              </h2>
              <p className="text-xs text-[#C1A477] font-serif italic">
                Scholastic Field Journal &amp; Lecture Dossier
              </p>
            </div>

            <div className="text-center z-10">
              <p className="text-[10px] text-[#A67C52] tracking-widest uppercase font-mono">
                Click to Open Archive
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
