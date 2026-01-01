'use client';

import { useEffect, useState } from 'react';

interface TerminalLine {
  command: string;
  output: string;
  commandDelay?: number;
  outputDelay?: number;
}

const terminalLines: TerminalLine[] = [
  { command: 'whoami', output: 'Jeffin Thomas', commandDelay: 0 },
  { command: 'cat role.txt', output: 'Cybersecurity Professional & Network Engineer', commandDelay: 100 },
  { command: 'cat education.txt', output: 'Master of Cybersecurity — Monash University (2025)', commandDelay: 100 },
  { command: 'cat location.txt', output: 'Melbourne, Australia', commandDelay: 100 },
  { command: './display_name.sh', output: '', commandDelay: 100 },
];

export default function TerminalSequence() {
  const [visibleLines, setVisibleLines] = useState(0);
  const [typingStage, setTypingStage] = useState<'command' | 'output'>('command');
  const [currentText, setCurrentText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [showName, setShowName] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Typing animation
  useEffect(() => {
    if (visibleLines >= terminalLines.length) {
      setIsComplete(true);
      return;
    }

    const currentLine = terminalLines[visibleLines];
    const targetText = typingStage === 'command' ? currentLine.command : currentLine.output;

    if (currentText.length < targetText.length) {
      const timeout = setTimeout(() => {
        setCurrentText(targetText.slice(0, currentText.length + 1));
      }, typingStage === 'command' ? 80 : 30);
      return () => clearTimeout(timeout);
    } else {
      // Finished typing current text
      if (typingStage === 'command') {
        // Move to output
        const timeout = setTimeout(() => {
          setTypingStage('output');
          setCurrentText('');
        }, 200);
        return () => clearTimeout(timeout);
      } else {
        // Move to next line
        const timeout = setTimeout(() => {
          if (visibleLines === terminalLines.length - 1) {
            // Last line - show the name
            setShowName(true);
          }
          setVisibleLines((prev) => prev + 1);
          setTypingStage('command');
          setCurrentText('');
        }, 400);
        return () => clearTimeout(timeout);
      }
    }
  }, [visibleLines, typingStage, currentText]);

  const renderLine = (index: number) => {
    const line = terminalLines[index];
    const isCurrentLine = index === visibleLines;
    const isPastLine = index < visibleLines;

    if (!isPastLine && !isCurrentLine) return null;

    return (
      <div key={index}>
        {/* Command */}
        <div className="mb-2">
          <span className="text-[var(--accent-green)]">$ </span>
          <span className="text-[var(--accent-cyan)]">
            {isPastLine ? line.command : (typingStage === 'command' ? currentText : line.command)}
          </span>
          {isCurrentLine && typingStage === 'command' && (
            <span style={{ opacity: showCursor ? 1 : 0, color: 'var(--accent-cyan)' }}>▋</span>
          )}
        </div>

        {/* Output */}
        {(isPastLine || (isCurrentLine && typingStage === 'output')) && line.output && (
          <div className="text-[var(--text-secondary)] ml-4 mb-4">
            {isPastLine ? line.output : currentText}
            {isCurrentLine && typingStage === 'output' && (
              <span style={{ opacity: showCursor ? 1 : 0, color: 'var(--accent-cyan)' }}>▋</span>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {terminalLines.slice(0, visibleLines + 1).map((_, index) => renderLine(index))}

      {/* Glitch Name - shows after last command */}
      {showName && (
        <div className="relative inline-block text-4xl font-bold text-[var(--accent-cyan)] my-4 [text-shadow:var(--glow-cyan)] animate-[fadeIn_0.5s_ease-out]">
          <span className="relative">
            JEFFIN THOMAS
            <span
              className="absolute top-0 left-0 w-full h-full text-[var(--accent-red)] animate-[glitch-1_2s_infinite_linear_alternate-reverse] [clip-path:polygon(0_0,100%_0,100%_45%,0_45%)]"
              style={{left: '2px'}}
            >
              JEFFIN THOMAS
            </span>
            <span
              className="absolute top-0 left-0 w-full h-full text-[var(--accent-green)] animate-[glitch-2_3s_infinite_linear_alternate-reverse] [clip-path:polygon(0_55%,100%_55%,100%_100%,0_100%)]"
              style={{left: '-2px'}}
            >
              JEFFIN THOMAS
            </span>
          </span>
        </div>
      )}

      {/* Final cursor */}
      {isComplete && (
        <div className="mt-4">
          <span className="text-[var(--accent-green)]">$ </span>
          <span
            className="text-[var(--accent-cyan)]"
            style={{ opacity: showCursor ? 1 : 0 }}
          >
            ▋
          </span>
        </div>
      )}
    </>
  );
}
