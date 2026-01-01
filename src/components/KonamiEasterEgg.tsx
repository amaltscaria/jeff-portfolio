'use client';

import { useEffect, useState, useCallback } from 'react';

// Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp',
  'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight',
  'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA'
];

export default function KonamiEasterEgg() {
  const [inputSequence, setInputSequence] = useState<string[]>([]);
  const [isActivated, setIsActivated] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const activateEasterEgg = useCallback(() => {
    setIsActivated(true);

    // Play glitch sound effect (optional)
    try {
      const audio = new Audio('/glitch-sound.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {}); // Ignore if no sound file
    } catch {}

    // Auto-hide after animation
    setTimeout(() => {
      setIsActivated(false);
    }, 5000);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newSequence = [...inputSequence, e.code].slice(-KONAMI_CODE.length);
      setInputSequence(newSequence);

      // Check if sequence matches Konami code
      if (newSequence.length === KONAMI_CODE.length &&
          newSequence.every((key, i) => key === KONAMI_CODE[i])) {
        activateEasterEgg();
        setInputSequence([]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputSequence, activateEasterEgg]);

  // Show hint after 30 seconds on page
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(true);
      setTimeout(() => setShowHint(false), 5000);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  if (!isActivated) {
    return showHint ? (
      <div
        className="fixed bottom-20 left-6 z-50 font-mono text-xs animate-pulse"
        style={{ color: 'var(--text-muted)' }}
      >
        💡 Try the Konami code...
      </div>
    ) : null;
  }

  return (
    <div className="fixed inset-0 z-[10000] pointer-events-none overflow-hidden">
      {/* Glitch overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(45deg, rgba(0,255,255,0.1), rgba(0,255,65,0.1), rgba(255,0,255,0.1))',
          animation: 'easterEggFlash 0.15s infinite',
        }}
      />

      {/* Scan lines intensified */}
      <div
        className="absolute inset-0"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.1) 2px, rgba(0, 255, 255, 0.1) 4px)',
          animation: 'scanDown 0.5s linear infinite',
        }}
      />

      {/* Hacker message */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="text-center"
          style={{
            animation: 'glitchText 0.3s infinite',
          }}
        >
          <div
            className="text-6xl md:text-8xl font-bold font-mono"
            style={{
              color: 'var(--accent-cyan)',
              textShadow: `
                0 0 10px var(--accent-cyan),
                0 0 20px var(--accent-cyan),
                0 0 40px var(--accent-cyan),
                0 0 80px var(--accent-green)
              `,
              animation: 'glitchText 0.1s infinite',
            }}
          >
            ACCESS GRANTED
          </div>
          <div
            className="mt-4 text-xl md:text-2xl font-mono"
            style={{
              color: 'var(--accent-green)',
              animation: 'flicker 0.5s infinite',
            }}
          >
            [SECURITY CLEARANCE: LEVEL 5]
          </div>
          <div
            className="mt-6 text-sm font-mono"
            style={{ color: 'var(--text-secondary)' }}
          >
            Welcome to the matrix, Neo.
          </div>
          <div
            className="mt-2 text-xs font-mono"
            style={{ color: 'var(--text-muted)' }}
          >
            ↑↑↓↓←→←→BA
          </div>
        </div>
      </div>

      {/* Matrix rain overlay - intensified */}
      <div className="absolute inset-0 opacity-30">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute font-mono text-sm"
            style={{
              left: `${(i / 30) * 100}%`,
              color: 'var(--accent-green)',
              animation: `matrixFall ${1 + Math.random() * 2}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`,
              textShadow: '0 0 10px var(--accent-green)',
            }}
          >
            {[...Array(30)].map((_, j) => (
              <div key={j} style={{ opacity: 1 - j * 0.03 }}>
                {String.fromCharCode(0x30A0 + Math.random() * 96)}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Corner decorations */}
      <div className="absolute top-8 left-8">
        <div className="font-mono text-xs" style={{ color: 'var(--accent-cyan)' }}>
          [SYSTEM OVERRIDE]
        </div>
      </div>
      <div className="absolute top-8 right-8 text-right">
        <div className="font-mono text-xs" style={{ color: 'var(--accent-green)' }}>
          ENCRYPTION: AES-256
        </div>
      </div>
      <div className="absolute bottom-8 left-8">
        <div className="font-mono text-xs" style={{ color: 'var(--accent-cyan)' }}>
          IP: 127.0.0.1
        </div>
      </div>
      <div className="absolute bottom-8 right-8 text-right">
        <div className="font-mono text-xs" style={{ color: 'var(--accent-green)' }}>
          [FIREWALL BYPASSED]
        </div>
      </div>
    </div>
  );
}
