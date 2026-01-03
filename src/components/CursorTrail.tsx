'use client';

import { useEffect, useState } from 'react';

interface TrailDot {
  id: number;
  x: number;
  y: number;
}

export default function CursorTrail() {
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    let idCounter = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const newDot: TrailDot = {
        id: idCounter++,
        x: e.clientX,
        y: e.clientY,
      };

      setTrail(prev => [...prev.slice(-12), newDot]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMounted]);

  // Clean up old dots
  useEffect(() => {
    if (trail.length === 0) return;

    const timer = setTimeout(() => {
      setTrail(prev => prev.slice(1));
    }, 50);

    return () => clearTimeout(timer);
  }, [trail]);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9997]">
      {trail.map((dot, index) => {
        const opacity = (index + 1) / trail.length;
        const scale = 0.3 + (index / trail.length) * 0.7;

        return (
          <div
            key={dot.id}
            className="absolute rounded-full"
            style={{
              left: dot.x,
              top: dot.y,
              width: 8,
              height: 8,
              backgroundColor: 'var(--accent-cyan)',
              boxShadow: `0 0 ${10 * opacity}px var(--accent-cyan)`,
              opacity: opacity * 0.6,
              transform: `translate(-50%, -50%) scale(${scale})`,
              transition: 'opacity 0.1s ease-out',
            }}
          />
        );
      })}
    </div>
  );
}
