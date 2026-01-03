'use client';

import { ReactNode } from 'react';

interface CyberCornersProps {
  children: ReactNode;
  className?: string;
  color?: 'cyan' | 'green';
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

export default function CyberCorners({
  children,
  className = '',
  color = 'cyan',
  size = 'md',
  animate = true,
}: CyberCornersProps) {
  const colorValue = color === 'cyan' ? 'var(--accent-cyan)' : 'var(--accent-green)';

  const sizeMap = {
    sm: { corner: 'w-4 h-4', border: '1px' },
    md: { corner: 'w-6 h-6', border: '2px' },
    lg: { corner: 'w-8 h-8', border: '2px' },
  };

  const { corner, border } = sizeMap[size];

  return (
    <div className={`relative ${className}`}>
      {children}

      {/* Corners */}
      <div
        className={`absolute top-0 left-0 ${corner} border-l-[${border}] border-t-[${border}] pointer-events-none`}
        style={{
          borderColor: colorValue,
          opacity: animate ? undefined : 0.5,
          animation: animate ? 'cornerPulse 2s ease-in-out infinite' : 'none',
        }}
      />
      <div
        className={`absolute top-0 right-0 ${corner} border-r-[${border}] border-t-[${border}] pointer-events-none`}
        style={{
          borderColor: colorValue,
          opacity: animate ? undefined : 0.5,
          animation: animate ? 'cornerPulse 2s ease-in-out infinite 0.5s' : 'none',
        }}
      />
      <div
        className={`absolute bottom-0 left-0 ${corner} border-l-[${border}] border-b-[${border}] pointer-events-none`}
        style={{
          borderColor: colorValue,
          opacity: animate ? undefined : 0.5,
          animation: animate ? 'cornerPulse 2s ease-in-out infinite 1s' : 'none',
        }}
      />
      <div
        className={`absolute bottom-0 right-0 ${corner} border-r-[${border}] border-b-[${border}] pointer-events-none`}
        style={{
          borderColor: colorValue,
          opacity: animate ? undefined : 0.5,
          animation: animate ? 'cornerPulse 2s ease-in-out infinite 1.5s' : 'none',
        }}
      />
    </div>
  );
}
