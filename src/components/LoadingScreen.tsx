'use client';

import { useEffect, useState } from 'react';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('INITIALIZING');
  const [isComplete, setIsComplete] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const loadingMessages = [
    'INITIALIZING',
    'LOADING MODULES',
    'ESTABLISHING CONNECTION',
    'DECRYPTING DATA',
    'BYPASSING FIREWALL',
    'ACCESS GRANTED',
  ];

  useEffect(() => {
    setIsMounted(true);
    // Scroll to top on page load/refresh
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Progress animation - slower for more dramatic effect
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1; // Slower increment
      });
    }, 45);

    // Loading text changes
    let messageIndex = 0;
    const textInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % loadingMessages.length;
      setLoadingText(loadingMessages[messageIndex]);
    }, 600); // Slower text changes

    // Complete after progress reaches 100
    const completeTimeout = setTimeout(() => {
      setIsComplete(true);
      clearInterval(textInterval);
      setLoadingText('ACCESS GRANTED');
    }, 4800); // More time for full animation

    // Hide after animation
    const hideTimeout = setTimeout(() => {
      setIsHidden(true);
    }, 5500); // More time to appreciate the "ACCESS GRANTED"

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
      clearTimeout(completeTimeout);
      clearTimeout(hideTimeout);
    };
  }, []);

  if (isHidden) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{
        backgroundColor: 'var(--bg-primary)',
        opacity: isComplete ? 0 : 1,
        transition: 'opacity 0.5s ease-out',
        pointerEvents: isComplete ? 'none' : 'auto',
      }}
    >
      {/* Scanline effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.03) 2px, rgba(0, 255, 255, 0.03) 4px)',
        }}
      />

      {/* Glitch Name */}
      <div className="relative mb-8">
        <h1
          className="text-5xl md:text-7xl font-bold font-mono"
          style={{
            color: 'var(--accent-cyan)',
            textShadow: 'var(--glow-cyan)',
            animation: 'glitch-text 0.3s infinite',
          }}
        >
          JT
        </h1>
        {/* Glitch layers */}
        <h1
          className="absolute top-0 left-0 text-5xl md:text-7xl font-bold font-mono"
          style={{
            color: 'var(--accent-red)',
            clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
            animation: 'glitch-1 0.5s infinite linear alternate-reverse',
            left: '2px',
          }}
        >
          JT
        </h1>
        <h1
          className="absolute top-0 left-0 text-5xl md:text-7xl font-bold font-mono"
          style={{
            color: 'var(--accent-green)',
            clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
            animation: 'glitch-2 0.5s infinite linear alternate-reverse',
            left: '-2px',
          }}
        >
          JT
        </h1>
      </div>

      {/* Loading text */}
      <div
        className="font-mono text-sm mb-6"
        style={{
          color: 'var(--accent-green)',
          animation: 'flicker 0.5s infinite',
        }}
      >
        [{loadingText}...]
      </div>

      {/* Progress bar container */}
      <div
        className="w-64 h-1 rounded-full overflow-hidden"
        style={{ backgroundColor: 'var(--bg-tertiary)' }}
      >
        {/* Progress bar fill */}
        <div
          className="h-full rounded-full"
          style={{
            width: `${progress}%`,
            backgroundColor: 'var(--accent-cyan)',
            boxShadow: 'var(--glow-cyan)',
            transition: 'width 0.1s ease-out',
          }}
        />
      </div>

      {/* Percentage */}
      <div
        className="font-mono text-xs mt-4"
        style={{ color: 'var(--text-secondary)' }}
      >
        {progress}%
      </div>

      {/* Skip Button */}
      <button
        onClick={() => {
          setIsComplete(true);
          setTimeout(() => setIsHidden(true), 500);
        }}
        className="absolute bottom-8 font-mono text-xs transition-all duration-300 hover:scale-105"
        style={{
          color: 'var(--text-muted)',
          padding: '8px 16px',
          border: '1px solid var(--border-color)',
          borderRadius: '4px',
          backgroundColor: 'transparent',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent-cyan)';
          e.currentTarget.style.color = 'var(--accent-cyan)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-color)';
          e.currentTarget.style.color = 'var(--text-muted)';
        }}
      >
        [SKIP] Press to bypass
      </button>

      {/* Decorative corners */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2" style={{ borderColor: 'var(--accent-cyan)', opacity: 0.5 }} />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2" style={{ borderColor: 'var(--accent-cyan)', opacity: 0.5 }} />
      <div className="absolute bottom-24 left-8 w-16 h-16 border-l-2 border-b-2" style={{ borderColor: 'var(--accent-cyan)', opacity: 0.5 }} />
      <div className="absolute bottom-24 right-8 w-16 h-16 border-r-2 border-b-2" style={{ borderColor: 'var(--accent-cyan)', opacity: 0.5 }} />

      {/* Binary rain decoration - only render on client to avoid hydration mismatch */}
      {isMounted && (
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute font-mono text-xs"
              style={{
                left: `${i * 10 + 5}%`,
                color: 'var(--accent-green)',
                animation: `fall ${2.5 + i * 0.3}s linear infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            >
              {[...Array(20)].map((_, j) => (
                <div key={j}>{(i + j) % 2 === 0 ? '1' : '0'}</div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
