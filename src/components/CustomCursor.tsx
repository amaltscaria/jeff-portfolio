'use client';

import { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.style.cursor === 'pointer' ||
        window.getComputedStyle(target).cursor === 'pointer'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Hide default cursor */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Main cursor dot */}
      <div
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          width: isHovering ? '12px' : '8px',
          height: isHovering ? '12px' : '8px',
          backgroundColor: isClicking ? 'var(--accent-green)' : 'var(--accent-cyan)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.15s, height 0.15s, background-color 0.15s',
          opacity: isVisible ? 1 : 0,
          boxShadow: isHovering
            ? '0 0 20px var(--accent-cyan), 0 0 40px var(--accent-cyan)'
            : '0 0 10px var(--accent-cyan)',
        }}
      />

      {/* Outer ring */}
      <div
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          width: isHovering ? '50px' : '35px',
          height: isHovering ? '50px' : '35px',
          border: `2px solid ${isClicking ? 'var(--accent-green)' : 'var(--accent-cyan)'}`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s ease-out, height 0.2s ease-out, border-color 0.15s, opacity 0.15s',
          opacity: isVisible ? 0.6 : 0,
        }}
      />

      {/* Crosshair lines */}
      <div
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          width: isHovering ? '60px' : '45px',
          height: '1px',
          backgroundColor: 'var(--accent-cyan)',
          pointerEvents: 'none',
          zIndex: 9997,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s ease-out, opacity 0.15s',
          opacity: isVisible ? 0.3 : 0,
        }}
      />
      <div
        style={{
          position: 'fixed',
          left: position.x,
          top: position.y,
          width: '1px',
          height: isHovering ? '60px' : '45px',
          backgroundColor: 'var(--accent-cyan)',
          pointerEvents: 'none',
          zIndex: 9997,
          transform: 'translate(-50%, -50%)',
          transition: 'height 0.2s ease-out, opacity 0.15s',
          opacity: isVisible ? 0.3 : 0,
        }}
      />

      {/* Corner brackets when hovering */}
      {isHovering && (
        <>
          {/* Top-left */}
          <div style={{
            position: 'fixed',
            left: position.x - 20,
            top: position.y - 20,
            width: '10px',
            height: '10px',
            borderLeft: '2px solid var(--accent-green)',
            borderTop: '2px solid var(--accent-green)',
            pointerEvents: 'none',
            zIndex: 9999,
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.15s',
          }} />
          {/* Top-right */}
          <div style={{
            position: 'fixed',
            left: position.x + 10,
            top: position.y - 20,
            width: '10px',
            height: '10px',
            borderRight: '2px solid var(--accent-green)',
            borderTop: '2px solid var(--accent-green)',
            pointerEvents: 'none',
            zIndex: 9999,
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.15s',
          }} />
          {/* Bottom-left */}
          <div style={{
            position: 'fixed',
            left: position.x - 20,
            top: position.y + 10,
            width: '10px',
            height: '10px',
            borderLeft: '2px solid var(--accent-green)',
            borderBottom: '2px solid var(--accent-green)',
            pointerEvents: 'none',
            zIndex: 9999,
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.15s',
          }} />
          {/* Bottom-right */}
          <div style={{
            position: 'fixed',
            left: position.x + 10,
            top: position.y + 10,
            width: '10px',
            height: '10px',
            borderRight: '2px solid var(--accent-green)',
            borderBottom: '2px solid var(--accent-green)',
            pointerEvents: 'none',
            zIndex: 9999,
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.15s',
          }} />
        </>
      )}
    </>
  );
}
