'use client';

import { useEffect, useState, useRef } from 'react';

interface TextScrambleProps {
  children: string;
  className?: string;
  scrambleOnHover?: boolean;
  scrambleOnView?: boolean;
  duration?: number;
}

const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`01';

export default function TextScramble({
  children,
  className = '',
  scrambleOnHover = false,
  scrambleOnView = true,
  duration = 1000,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(scrambleOnView ? '' : children);
  const [isScrambling, setIsScrambling] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const scramble = () => {
    if (isScrambling) return;
    setIsScrambling(true);

    const originalText = children;
    const scrambleIterations = 3;
    let iteration = 0;

    const interval = setInterval(() => {
      setDisplayText(
        originalText
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iteration / scrambleIterations) {
              return originalText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (iteration >= originalText.length * scrambleIterations) {
        clearInterval(interval);
        setDisplayText(originalText);
        setIsScrambling(false);
      }

      iteration += 1;
    }, duration / (children.length * scrambleIterations));
  };

  useEffect(() => {
    if (!scrambleOnView || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          scramble();
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [scrambleOnView, hasAnimated]);

  return (
    <span
      ref={ref}
      className={`${className} font-mono`}
      onMouseEnter={scrambleOnHover ? scramble : undefined}
      style={{
        display: 'inline-block',
        minWidth: `${children.length}ch`,
      }}
    >
      {displayText || children}
    </span>
  );
}
