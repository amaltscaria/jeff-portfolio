'use client';

import { useEffect, useState } from 'react';

type Theme = 'cyber-green' | 'cyber-red' | 'cyber-purple';

const themes: { id: Theme; name: string; icon: string; accent: string }[] = [
  { id: 'cyber-green', name: 'Matrix', icon: '💚', accent: '#00ff41' },
  { id: 'cyber-red', name: 'Crimson', icon: '❤️', accent: '#ff4141' },
  { id: 'cyber-purple', name: 'Neon', icon: '💜', accent: '#bc8cff' },
];

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState<Theme>('cyber-green');
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Load saved theme
    const saved = localStorage.getItem('portfolio-theme') as Theme;
    if (saved && themes.find(t => t.id === saved)) {
      setCurrentTheme(saved);
      applyTheme(saved);
    }
  }, []);

  const applyTheme = (theme: Theme) => {
    document.documentElement.setAttribute('data-theme', theme);
  };

  const switchTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    applyTheme(theme);
    localStorage.setItem('portfolio-theme', theme);
    setIsOpen(false);
  };

  if (!isMounted) return null;

  const current = themes.find(t => t.id === currentTheme)!;

  return (
    <div className="fixed top-24 right-6 z-50">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '2px solid var(--accent-primary)',
          boxShadow: isOpen ? 'var(--glow-primary)' : 'none',
        }}
        title="Switch Theme"
      >
        <span className="text-xl">{current.icon}</span>
      </button>

      {/* Theme Options */}
      <div
        className="absolute top-14 right-0 overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isOpen ? '200px' : '0',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div
          className="rounded-lg overflow-hidden"
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
          }}
        >
          {themes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => switchTheme(theme.id)}
              className="w-full flex items-center gap-3 transition-all duration-200 hover:bg-[var(--bg-tertiary)]"
              style={{
                padding: '12px 16px',
                borderBottom: '1px solid var(--border-color)',
                backgroundColor: currentTheme === theme.id ? 'var(--bg-tertiary)' : 'transparent',
              }}
            >
              <span className="text-lg">{theme.icon}</span>
              <span
                className="font-mono text-sm"
                style={{ color: currentTheme === theme.id ? theme.accent : 'var(--text-secondary)' }}
              >
                {theme.name}
              </span>
              {currentTheme === theme.id && (
                <span className="ml-auto text-xs" style={{ color: theme.accent }}>●</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
