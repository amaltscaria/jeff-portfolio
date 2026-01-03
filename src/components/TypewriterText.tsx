'use client';

import { useEffect, useState, useRef } from 'react';

interface TypewriterTextProps {
  children: string;
  className?: string;
  speed?: number;
  delay?: number;
  cursor?: boolean;
}

export default function TypewriterText({
  children,
  className = '',
  speed = 50,
  delay = 0,
  cursor = true,
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);
  const [showCursor, setShowCursor] = useState(cursor);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (hasTyped) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTyped) {
          setHasTyped(true);

          setTimeout(() => {
            setIsTyping(true);
            let currentIndex = 0;

            const typeInterval = setInterval(() => {
              if (currentIndex <= children.length) {
                setDisplayText(children.slice(0, currentIndex));
                currentIndex++;
              } else {
                clearInterval(typeInterval);
                setIsTyping(false);
                // Hide cursor after typing completes
                setTimeout(() => setShowCursor(false), 2000);
              }
            }, speed);
          }, delay);

          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [children, speed, delay, hasTyped]);

  return (
    <span ref={ref} className={className}>
      {displayText}
      {showCursor && (
        <span
          className="inline-block w-[2px] h-[1em] ml-1 align-middle"
          style={{
            backgroundColor: 'var(--accent-cyan)',
            animation: isTyping ? 'none' : 'cursor-blink 1s infinite',
          }}
        />
      )}
    </span>
  );
}
