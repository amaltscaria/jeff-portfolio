'use client';

import { useRef, useState, ReactNode } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  onClick?: () => void;
  download?: boolean | string;
  target?: string;
  rel?: string;
  strength?: number;
}

export default function MagneticButton({
  children,
  className = '',
  style = {},
  href,
  onClick,
  download,
  target,
  rel,
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const commonProps = {
    ref: ref as React.RefObject<HTMLAnchorElement> & React.RefObject<HTMLButtonElement>,
    className: `magnetic-button ${className}`,
    style: {
      ...style,
      transform: `translate(${position.x}px, ${position.y}px)`,
      transition: position.x === 0 && position.y === 0
        ? 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        : 'transform 0.1s ease-out',
    },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };

  if (href) {
    return (
      <a
        {...commonProps}
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        download={download}
        target={target}
        rel={rel}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      {...commonProps}
      ref={ref as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
