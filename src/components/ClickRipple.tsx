'use client';

import { useEffect, useState } from 'react';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

export default function ClickRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    let idCounter = 0;

    const handleClick = (e: MouseEvent) => {
      const newRipple: Ripple = {
        id: idCounter++,
        x: e.clientX,
        y: e.clientY,
      };

      setRipples(prev => [...prev, newRipple]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== newRipple.id));
      }, 1000);
    };

    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [isMounted]);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9996]">
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className="absolute"
          style={{
            left: ripple.x,
            top: ripple.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {/* Outer ring */}
          <div
            className="absolute rounded-full"
            style={{
              width: 0,
              height: 0,
              border: '2px solid var(--accent-cyan)',
              animation: 'rippleExpand 0.8s ease-out forwards',
            }}
          />
          {/* Inner ring */}
          <div
            className="absolute rounded-full"
            style={{
              width: 0,
              height: 0,
              border: '1px solid var(--accent-green)',
              animation: 'rippleExpand 0.6s ease-out 0.1s forwards',
            }}
          />
          {/* Center dot */}
          <div
            className="absolute rounded-full"
            style={{
              width: 6,
              height: 6,
              backgroundColor: 'var(--accent-cyan)',
              transform: 'translate(-50%, -50%)',
              animation: 'rippleFade 0.4s ease-out forwards',
            }}
          />
        </div>
      ))}
    </div>
  );
}
