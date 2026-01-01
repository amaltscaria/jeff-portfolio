'use client';

import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#certifications', label: 'Certs' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto flex items-center justify-between" style={{padding: '16px 24px'}}>
        {/* Logo */}
        <a href="#" className="font-mono text-[var(--accent-cyan)] font-bold text-lg hover:text-[var(--accent-green)] transition-colors">
          &lt;JT /&gt;
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center" style={{gap: '32px'}}>
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="font-mono text-sm text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors">
              {link.label}
            </a>
          ))}
          <a href="/Jeffin_Thomas_Resume.pdf" download className="font-mono text-sm border border-[var(--accent-cyan)] text-[var(--accent-cyan)] rounded hover:bg-[var(--accent-cyan)] hover:text-[var(--bg-primary)] transition-colors" style={{padding: '8px 16px'}}>
            Resume
          </a>
          <a href="#contact" className="font-mono text-sm bg-[var(--accent-cyan)] text-[var(--bg-primary)] rounded hover:bg-[var(--accent-green)] transition-colors" style={{padding: '8px 16px'}}>
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-[var(--accent-cyan)] text-2xl"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[var(--bg-secondary)] border-t border-[var(--border-color)]">
          <div className="flex flex-col" style={{padding: '16px 24px', gap: '16px'}}>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="font-mono text-sm text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/Jeffin_Thomas_Resume.pdf"
              download
              onClick={closeMenu}
              className="font-mono text-sm border border-[var(--accent-cyan)] text-[var(--accent-cyan)] rounded hover:bg-[var(--accent-cyan)] hover:text-[var(--bg-primary)] transition-colors text-center"
              style={{padding: '10px 16px'}}
            >
              Download Resume
            </a>
            <a
              href="#contact"
              onClick={closeMenu}
              className="font-mono text-sm bg-[var(--accent-cyan)] text-[var(--bg-primary)] rounded hover:bg-[var(--accent-green)] transition-colors text-center"
              style={{padding: '10px 16px'}}
            >
              Contact Me
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
