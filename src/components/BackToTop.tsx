'use client';

import { useEffect, useState } from 'react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    setIsLaunching(true);

    // Delay scroll to show launch animation
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }, 300);

    // Reset after scroll completes
    setTimeout(() => {
      setIsLaunching(false);
    }, 1500);
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed z-50 group"
      style={{
        bottom: '32px',
        right: '32px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible
          ? isLaunching
            ? 'translateY(-100vh)'
            : 'translateY(0)'
          : 'translateY(100px)',
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: isLaunching
          ? 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)'
          : 'transform 0.3s ease, opacity 0.3s ease',
      }}
    >
      {/* Rocket Container */}
      <div
        className="relative flex flex-col items-center"
        style={{
          animation: isVisible && !isLaunching ? 'rocketHover 2s ease-in-out infinite' : 'none',
        }}
      >
        {/* Rocket Body */}
        <div
          className="relative w-12 h-16 rounded-t-full flex items-center justify-center transition-all duration-300"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '2px solid var(--accent-cyan)',
            boxShadow: isLaunching
              ? '0 0 30px var(--accent-cyan), 0 0 60px var(--accent-green)'
              : '0 0 15px rgba(0, 255, 255, 0.3)',
          }}
        >
          {/* Window */}
          <div
            className="w-5 h-5 rounded-full"
            style={{
              backgroundColor: 'var(--accent-cyan)',
              boxShadow: '0 0 10px var(--accent-cyan)',
            }}
          />

          {/* Fins */}
          <div
            className="absolute -left-2 bottom-0 w-3 h-6"
            style={{
              backgroundColor: 'var(--accent-green)',
              clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
            }}
          />
          <div
            className="absolute -right-2 bottom-0 w-3 h-6"
            style={{
              backgroundColor: 'var(--accent-green)',
              clipPath: 'polygon(0 0, 100% 100%, 0 100%)',
            }}
          />
        </div>

        {/* Flame */}
        <div
          className="flex flex-col items-center -mt-1"
          style={{
            opacity: isLaunching ? 1 : 0.5,
            transform: isLaunching ? 'scaleY(2)' : 'scaleY(1)',
            transition: 'all 0.3s ease',
          }}
        >
          <div
            className="w-6 h-4"
            style={{
              background: 'linear-gradient(to bottom, var(--accent-cyan), var(--accent-green), transparent)',
              clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
              animation: isLaunching ? 'flameFlicker 0.1s infinite' : 'none',
            }}
          />
          <div
            className="w-4 h-3 -mt-1"
            style={{
              background: 'linear-gradient(to bottom, #ff6b00, #ff0, transparent)',
              clipPath: 'polygon(50% 100%, 0 0, 100% 0)',
              animation: isLaunching ? 'flameFlicker 0.08s infinite' : 'none',
            }}
          />
        </div>

        {/* Hover Text */}
        <span
          className="absolute -left-16 top-1/2 -translate-y-1/2 font-mono text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ color: 'var(--accent-cyan)' }}
        >
          LAUNCH
        </span>
      </div>

      {/* Exhaust particles when launching */}
      {isLaunching && (
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: i % 2 === 0 ? 'var(--accent-cyan)' : 'var(--accent-green)',
                animation: `exhaustParticle 0.5s ease-out ${i * 0.05}s forwards`,
                left: `${(i - 4) * 8}px`,
              }}
            />
          ))}
        </div>
      )}
    </button>
  );
}
