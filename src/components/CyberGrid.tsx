'use client';

import { useEffect, useState } from 'react';

export default function CyberGrid() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[0] overflow-hidden">
      {/* Horizontal lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to bottom, transparent 0%, transparent 49%, rgba(0, 255, 255, 0.03) 50%, transparent 51%, transparent 100%)
          `,
          backgroundSize: '100% 80px',
          animation: 'gridMoveVertical 20s linear infinite',
        }}
      />

      {/* Vertical lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, transparent 0%, transparent 49%, rgba(0, 255, 255, 0.03) 50%, transparent 51%, transparent 100%)
          `,
          backgroundSize: '80px 100%',
          animation: 'gridMoveHorizontal 25s linear infinite',
        }}
      />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 opacity-20" style={{ borderColor: 'var(--accent-cyan)' }} />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 opacity-20" style={{ borderColor: 'var(--accent-cyan)' }} />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 opacity-20" style={{ borderColor: 'var(--accent-cyan)' }} />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 opacity-20" style={{ borderColor: 'var(--accent-cyan)' }} />

      {/* Scanning highlight */}
      <div
        className="absolute left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent, var(--accent-cyan), transparent)',
          opacity: 0.3,
          animation: 'scanVertical 8s ease-in-out infinite',
        }}
      />
    </div>
  );
}
