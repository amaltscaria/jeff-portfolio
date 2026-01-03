'use client';

import { useEffect, useState, useCallback } from 'react';

interface Command {
  id: string;
  label: string;
  icon: string;
  action: () => void;
  shortcut?: string;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: Command[] = [
    { id: 'home', label: 'Go to Home', icon: '🏠', action: () => scrollTo('top'), shortcut: 'H' },
    { id: 'about', label: 'Go to About', icon: '👤', action: () => scrollTo('about'), shortcut: 'A' },
    { id: 'skills', label: 'Go to Skills', icon: '⚡', action: () => scrollTo('skills'), shortcut: 'S' },
    { id: 'certs', label: 'Go to Certifications', icon: '🏆', action: () => scrollTo('certifications'), shortcut: 'C' },
    { id: 'projects', label: 'Go to Projects', icon: '💼', action: () => scrollTo('projects'), shortcut: 'P' },
    { id: 'experience', label: 'Go to Experience', icon: '📅', action: () => scrollTo('experience'), shortcut: 'E' },
    { id: 'contact', label: 'Go to Contact', icon: '📧', action: () => scrollTo('contact') },
    { id: 'resume', label: 'Download Resume', icon: '📄', action: () => window.open('/Jeffin_Thomas_Resume.pdf', '_blank'), shortcut: 'R' },
    { id: 'linkedin', label: 'Open LinkedIn', icon: '💼', action: () => window.open('https://www.linkedin.com/in/jeffin-thomas-69a2a0348/', '_blank'), shortcut: 'L' },
    { id: 'email', label: 'Send Email', icon: '✉️', action: () => window.location.href = 'mailto:jeffint69@gmail.com' },
    { id: 'theme-green', label: 'Theme: Matrix (Green)', icon: '💚', action: () => setTheme('cyber-green') },
    { id: 'theme-red', label: 'Theme: Crimson (Red)', icon: '❤️', action: () => setTheme('cyber-red') },
    { id: 'theme-purple', label: 'Theme: Neon (Purple)', icon: '💜', action: () => setTheme('cyber-purple') },
    // Secret Commands
    { id: 'sudo-hire', label: 'sudo hire-me', icon: '🔐', action: () => showSecret('ACCESS GRANTED: Hiring sequence initiated... 🚀') },
    { id: 'hack', label: 'hack the planet', icon: '🌍', action: () => showSecret('HACK THE PLANET! 💻🔥') },
    { id: 'matrix', label: 'enter the matrix', icon: '💊', action: () => showSecret('You took the red pill... Welcome to the real world.') },
    { id: 'ping', label: 'ping jeffin', icon: '📡', action: () => showSecret('PONG! Jeffin is online and ready to connect!') },
    { id: 'whoami', label: 'whoami', icon: '🤖', action: () => showSecret('You are a potential employer/collaborator viewing an awesome portfolio!') },
    { id: 'coffee', label: 'brew coffee', icon: '☕', action: () => showSecret('☕ Coffee brewing... Productivity increased by 200%!') },
  ];

  const showSecret = (message: string) => {
    setIsOpen(false);
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-[10001] flex items-center justify-center bg-black/80';
    overlay.innerHTML = `
      <div class="text-center font-mono" style="animation: fadeIn 0.3s ease-out">
        <p style="color: var(--accent-cyan); font-size: 24px; text-shadow: 0 0 20px var(--accent-cyan);">${message}</p>
      </div>
    `;
    document.body.appendChild(overlay);
    setTimeout(() => {
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.5s ease-out';
      setTimeout(() => overlay.remove(), 500);
    }, 2000);
  };

  const scrollTo = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const setTheme = (theme: string) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    setIsOpen(false);
  };

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(search.toLowerCase())
  );

  const executeCommand = useCallback((command: Command) => {
    command.action();
    setIsOpen(false);
    setSearch('');
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Open with Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        setSearch('');
        setSelectedIndex(0);
      }

      // Close with Escape
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
        setSearch('');
        setSelectedIndex(0);
      }

      // Navigate with arrows
      if (isOpen && e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1));
      }

      if (isOpen && e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      }

      // Execute with Enter
      if (isOpen && e.key === 'Enter' && filteredCommands[selectedIndex]) {
        e.preventDefault();
        executeCommand(filteredCommands[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, executeCommand]);

  // Reset selected index when search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  if (!isOpen) {
    return (
      <div
        className="fixed bottom-6 left-6 z-50 font-mono text-xs"
        style={{ color: 'var(--text-muted)' }}
      >
        Press <kbd className="px-2 py-1 rounded text-[var(--accent-cyan)]" style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}>Ctrl+K</kbd> for commands
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[10000] flex items-start justify-center pt-[20vh]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Palette */}
      <div
        className="relative w-full max-w-lg mx-4 rounded-lg overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--accent-cyan)',
          boxShadow: '0 0 30px rgba(0, 255, 255, 0.2)',
        }}
      >
        {/* Search Input */}
        <div
          className="flex items-center gap-3 border-b"
          style={{ padding: '16px', borderColor: 'var(--border-color)' }}
        >
          <span style={{ color: 'var(--accent-cyan)' }}>⌘</span>
          <input
            type="text"
            placeholder="Type a command..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent outline-none font-mono"
            style={{ color: 'var(--text-primary)' }}
          />
          <kbd
            className="px-2 py-1 rounded text-xs font-mono"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-muted)',
              border: '1px solid var(--border-color)',
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Commands List */}
        <div className="max-h-80 overflow-y-auto" style={{ padding: '8px' }}>
          {filteredCommands.length === 0 ? (
            <div
              className="text-center font-mono"
              style={{ padding: '24px', color: 'var(--text-muted)' }}
            >
              No commands found
            </div>
          ) : (
            filteredCommands.map((command, index) => (
              <button
                key={command.id}
                onClick={() => executeCommand(command)}
                className="w-full flex items-center gap-3 rounded transition-all duration-150"
                style={{
                  padding: '12px 16px',
                  backgroundColor: index === selectedIndex ? 'var(--bg-tertiary)' : 'transparent',
                  borderLeft: index === selectedIndex ? '2px solid var(--accent-cyan)' : '2px solid transparent',
                }}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <span className="text-xl">{command.icon}</span>
                <span
                  className="flex-1 text-left font-mono text-sm"
                  style={{ color: index === selectedIndex ? 'var(--accent-cyan)' : 'var(--text-secondary)' }}
                >
                  {command.label}
                </span>
                {command.shortcut && (
                  <kbd
                    className="px-2 py-1 rounded text-xs font-mono"
                    style={{
                      backgroundColor: 'var(--bg-primary)',
                      color: 'var(--text-muted)',
                      border: '1px solid var(--border-color)',
                    }}
                  >
                    {command.shortcut}
                  </kbd>
                )}
              </button>
            ))
          )}
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between border-t font-mono text-xs"
          style={{ padding: '12px 16px', borderColor: 'var(--border-color)', color: 'var(--text-muted)' }}
        >
          <span>
            <span style={{ color: 'var(--accent-cyan)' }}>↑↓</span> Navigate
          </span>
          <span>
            <span style={{ color: 'var(--accent-cyan)' }}>↵</span> Select
          </span>
          <span>
            <span style={{ color: 'var(--accent-cyan)' }}>ESC</span> Close
          </span>
        </div>
      </div>
    </div>
  );
}
