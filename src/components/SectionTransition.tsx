'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';

interface SectionTransitionProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;
  duration?: number;
  className?: string;
  staggerChildren?: boolean;
  staggerDelay?: number;
}

export default function SectionTransition({
  children,
  direction = 'up',
  delay = 0,
  duration = 800,
  className = '',
  staggerChildren = false,
  staggerDelay = 100,
}: SectionTransitionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const getInitialTransform = () => {
    switch (direction) {
      case 'up':
        return 'translateY(60px)';
      case 'down':
        return 'translateY(-60px)';
      case 'left':
        return 'translateX(60px)';
      case 'right':
        return 'translateX(-60px)';
      case 'fade':
      default:
        return 'translateY(0)';
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0)' : getInitialTransform(),
        transition: `opacity ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
        willChange: 'opacity, transform',
      }}
    >
      {staggerChildren ? (
        <StaggeredContent isVisible={isVisible} staggerDelay={staggerDelay} duration={duration}>
          {children}
        </StaggeredContent>
      ) : (
        children
      )}
    </div>
  );
}

// Staggered animation for child elements
function StaggeredContent({
  children,
  isVisible,
  staggerDelay,
  duration,
}: {
  children: ReactNode;
  isVisible: boolean;
  staggerDelay: number;
  duration: number;
}) {
  return (
    <div className="stagger-container">
      {Array.isArray(children) ? (
        children.map((child, index) => (
          <div
            key={index}
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: `opacity ${duration}ms ease-out ${index * staggerDelay}ms, transform ${duration}ms ease-out ${index * staggerDelay}ms`,
            }}
          >
            {child}
          </div>
        ))
      ) : (
        children
      )}
    </div>
  );
}

// Cyber line separator with animation
export function CyberDivider({ delay = 0 }: { delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className="relative flex items-center justify-center overflow-hidden" style={{ padding: '48px 0' }}>
      {/* Left line */}
      <div
        className="h-px flex-1"
        style={{
          background: `linear-gradient(to right, transparent, var(--accent-cyan))`,
          transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'right',
          transition: 'transform 1s ease-out',
        }}
      />

      {/* Center diamond */}
      <div
        className="mx-4 relative"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1) rotate(45deg)' : 'scale(0) rotate(45deg)',
          transition: 'opacity 0.5s ease-out 0.5s, transform 0.5s ease-out 0.5s',
        }}
      >
        <div
          className="w-3 h-3"
          style={{
            backgroundColor: 'var(--accent-cyan)',
            boxShadow: 'var(--glow-cyan)',
          }}
        />
      </div>

      {/* Right line */}
      <div
        className="h-px flex-1"
        style={{
          background: `linear-gradient(to left, transparent, var(--accent-cyan))`,
          transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left',
          transition: 'transform 1s ease-out',
        }}
      />

      {/* Scanning line effect */}
      {isVisible && (
        <div
          className="absolute top-1/2 h-8 w-1 -translate-y-1/2"
          style={{
            background: 'linear-gradient(to bottom, transparent, var(--accent-green), transparent)',
            animation: 'scanLine 2s ease-in-out infinite',
            opacity: 0.5,
          }}
        />
      )}
    </div>
  );
}
