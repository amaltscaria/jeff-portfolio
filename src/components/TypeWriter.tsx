'use client';

import { useEffect, useState } from 'react';

interface TypeWriterProps {
  text: string;
  delay?: number;
  startDelay?: number;
  className?: string;
  onComplete?: () => void;
  cursor?: boolean;
}

export default function TypeWriter({
  text,
  delay = 50,
  startDelay = 0,
  className = '',
  onComplete,
  cursor = true,
}: TypeWriterProps) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    // Start delay before typing begins
    timeout = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;

      const typeNextChar = () => {
        if (currentIndex < text.length) {
          setDisplayText(text.slice(0, currentIndex + 1));
          currentIndex++;
          timeout = setTimeout(typeNextChar, delay);
        } else {
          setIsTyping(false);
          if (onComplete) onComplete();
        }
      };

      typeNextChar();
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [text, delay, startDelay, onComplete]);

  // Cursor blink effect
  useEffect(() => {
    if (!cursor) return;

    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, [cursor]);

  return (
    <span className={className}>
      {displayText}
      {cursor && (
        <span
          style={{
            opacity: showCursor ? 1 : 0,
            color: 'var(--accent-cyan)',
            marginLeft: '2px',
          }}
        >
          ▋
        </span>
      )}
    </span>
  );
}
