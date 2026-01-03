'use client';

import { useState } from 'react';

interface GlitchTextProps {
  children: string;
  className?: string;
}

export default function GlitchText({ children, className = '' }: GlitchTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: 'default' }}
    >
      {/* Main text */}
      <span
        className="relative z-10"
        style={{
          animation: isHovered ? 'glitchText 0.3s infinite' : 'none',
        }}
      >
        {children}
      </span>

      {/* Glitch layers - only show on hover */}
      {isHovered && (
        <>
          <span
            className="absolute top-0 left-0 z-0"
            style={{
              color: 'var(--accent-cyan)',
              clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
              animation: 'glitch-1 0.2s infinite linear alternate-reverse',
              transform: 'translate(-2px, 0)',
              opacity: 0.8,
            }}
            aria-hidden="true"
          >
            {children}
          </span>
          <span
            className="absolute top-0 left-0 z-0"
            style={{
              color: 'var(--accent-green)',
              clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
              animation: 'glitch-2 0.2s infinite linear alternate-reverse',
              transform: 'translate(2px, 0)',
              opacity: 0.8,
            }}
            aria-hidden="true"
          >
            {children}
          </span>
        </>
      )}
    </span>
  );
}
