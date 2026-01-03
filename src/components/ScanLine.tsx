'use client';

import { useEffect, useState } from 'react';

export default function ScanLine() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9995] overflow-hidden">
      {/* Horizontal scan line */}
      <div
        className="absolute left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(to right, transparent 0%, var(--accent-cyan) 20%, var(--accent-cyan) 80%, transparent 100%)',
          boxShadow: '0 0 20px var(--accent-cyan), 0 0 40px var(--accent-cyan)',
          animation: 'scanVertical 6s ease-in-out infinite',
        }}
      />

      {/* Trailing glow */}
      <div
        className="absolute left-0 right-0 h-20"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 255, 255, 0.1), transparent)',
          animation: 'scanVertical 6s ease-in-out infinite',
        }}
      />
    </div>
  );
}
