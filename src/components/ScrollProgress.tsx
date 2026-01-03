'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      setProgress(Math.min(100, Math.max(0, scrollPercent)));
      setIsVisible(scrollTop > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9998] h-1"
      style={{
        backgroundColor: 'var(--bg-tertiary)',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      {/* Progress fill */}
      <div
        className="h-full"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-green))',
          boxShadow: '0 0 10px var(--accent-cyan), 0 0 20px var(--accent-green)',
          transition: 'width 0.1s ease-out',
        }}
      />

      {/* Percentage indicator */}
      <div
        className="absolute top-2 font-mono text-xs"
        style={{
          left: `${Math.min(progress, 95)}%`,
          transform: 'translateX(-50%)',
          color: 'var(--accent-cyan)',
          opacity: isVisible && progress > 5 ? 1 : 0,
          transition: 'opacity 0.3s ease',
          textShadow: '0 0 10px var(--accent-cyan)',
        }}
      >
        {Math.round(progress)}%
      </div>

      {/* Glowing dot at end of progress */}
      <div
        className="absolute top-0 h-1 w-2"
        style={{
          left: `${progress}%`,
          transform: 'translateX(-100%)',
          background: 'var(--accent-cyan)',
          boxShadow: '0 0 10px var(--accent-cyan), 0 0 20px var(--accent-cyan)',
          borderRadius: '0 2px 2px 0',
        }}
      />
    </div>
  );
}
