'use client';

import { useEffect, useState } from 'react';

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

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
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed z-50 font-mono text-sm border border-[var(--accent-cyan)] text-[var(--accent-cyan)] bg-[var(--bg-primary)]/90 backdrop-blur-sm rounded-lg hover:bg-[var(--accent-cyan)] hover:text-[var(--bg-primary)] transition-all duration-300"
      style={{
        bottom: '32px',
        right: '32px',
        padding: '12px 16px',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        pointerEvents: isVisible ? 'auto' : 'none',
      }}
    >
      ↑ Top
    </button>
  );
}
