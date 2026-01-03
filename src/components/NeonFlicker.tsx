'use client';

import { useState, ReactNode } from 'react';

interface NeonFlickerProps {
  children: ReactNode;
  className?: string;
  color?: 'cyan' | 'green' | 'purple' | 'red';
}

export default function NeonFlicker({
  children,
  className = '',
  color = 'cyan',
}: NeonFlickerProps) {
  const [isHovered, setIsHovered] = useState(false);

  const colorMap = {
    cyan: 'var(--accent-cyan)',
    green: 'var(--accent-green)',
    purple: 'var(--accent-purple)',
    red: 'var(--accent-red)',
  };

  const glowMap = {
    cyan: 'var(--glow-cyan)',
    green: 'var(--glow-green)',
    purple: '0 0 20px rgba(188, 140, 255, 0.5)',
    red: '0 0 20px rgba(255, 107, 107, 0.5)',
  };

  return (
    <span
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        color: colorMap[color],
        textShadow: isHovered ? glowMap[color] : 'none',
        animation: isHovered ? 'neonFlicker 0.15s infinite' : 'none',
        transition: 'text-shadow 0.3s ease',
      }}
    >
      {children}
    </span>
  );
}
