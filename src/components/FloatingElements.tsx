'use client';

import { useEffect, useState } from 'react';

const techSymbols = [
  { symbol: '</>', size: 'text-2xl' },
  { symbol: '{ }', size: 'text-xl' },
  { symbol: '[ ]', size: 'text-lg' },
  { symbol: '#', size: 'text-3xl' },
  { symbol: '@', size: 'text-2xl' },
  { symbol: '~/', size: 'text-xl' },
  { symbol: '>>>', size: 'text-lg' },
  { symbol: '/**/', size: 'text-xl' },
  { symbol: '0x', size: 'text-2xl' },
  { symbol: '&&', size: 'text-xl' },
  { symbol: '||', size: 'text-lg' },
  { symbol: '=>', size: 'text-2xl' },
];

interface FloatingElement {
  id: number;
  symbol: string;
  size: string;
  x: number;
  y: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // Generate random floating elements
    const generated: FloatingElement[] = techSymbols.map((item, index) => ({
      id: index,
      symbol: item.symbol,
      size: item.size,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: 15 + Math.random() * 20,
      delay: Math.random() * -20,
      opacity: 0.03 + Math.random() * 0.05,
    }));

    setElements(generated);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
      {elements.map((el) => (
        <div
          key={el.id}
          className={`absolute font-mono ${el.size} text-[var(--accent-cyan)]`}
          style={{
            left: `${el.x}%`,
            top: `${el.y}%`,
            opacity: el.opacity,
            animation: `floatParallax ${el.duration}s ease-in-out infinite`,
            animationDelay: `${el.delay}s`,
          }}
        >
          {el.symbol}
        </div>
      ))}
    </div>
  );
}
