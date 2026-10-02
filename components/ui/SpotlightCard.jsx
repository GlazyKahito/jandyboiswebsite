'use client';

import React, { useRef, useState } from 'react';

export default function SpotlightCard({ 
  children, 
  className = '', 
  spotlightColor = 'rgba(193, 164, 119, 0.12)',
  ...props 
}) {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden academic-panel rounded-lg ${className}`}
      {...props}
    >
      {/* 21st.dev Interactive Radial Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
        }}
      />
      
      {/* Card Contents */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
