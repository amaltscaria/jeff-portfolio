'use client';

import { useEffect, useRef, useState } from 'react';

interface SkillBarProps {
  name: string;
  percentage: number;
  delay?: number;
  color?: 'cyan' | 'green';
}

export default function SkillBar({ name, percentage, delay = 0, color = 'cyan' }: SkillBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  // Intersection Observer for triggering animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  // Animate percentage counter
  useEffect(() => {
    if (!isVisible) return;

    const duration = 1500; // 1.5 seconds
    const steps = 60;
    const increment = percentage / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= percentage) {
        setCurrentPercentage(percentage);
        clearInterval(timer);
      } else {
        setCurrentPercentage(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, percentage]);

  const barColor = color === 'cyan' ? 'var(--accent-cyan)' : 'var(--accent-green)';
  const glowColor = color === 'cyan' ? 'var(--glow-cyan)' : 'var(--glow-green)';

  return (
    <div ref={ref} style={{ marginBottom: '20px' }}>
      {/* Label and Percentage */}
      <div className="flex justify-between items-center" style={{ marginBottom: '8px' }}>
        <span className="font-mono text-sm text-[var(--text-secondary)]">{name}</span>
        <span
          className="font-mono text-sm font-bold"
          style={{ color: barColor }}
        >
          {currentPercentage}%
        </span>
      </div>

      {/* Progress Bar Background */}
      <div
        className="relative h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: 'var(--bg-tertiary)' }}
      >
        {/* Progress Bar Fill */}
        <div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{
            width: isVisible ? `${percentage}%` : '0%',
            backgroundColor: barColor,
            boxShadow: isVisible ? glowColor : 'none',
            transition: 'width 1.5s ease-out',
          }}
        />

        {/* Animated Shine Effect */}
        {isVisible && (
          <div
            className="absolute top-0 left-0 h-full w-20 opacity-30"
            style={{
              background: `linear-gradient(90deg, transparent, white, transparent)`,
              animation: 'shine 2s ease-in-out infinite',
            }}
          />
        )}
      </div>
    </div>
  );
}
