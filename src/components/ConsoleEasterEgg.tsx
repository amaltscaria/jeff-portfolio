'use client';

import { useEffect } from 'react';

export default function ConsoleEasterEgg() {
  useEffect(() => {
    // ASCII Art Banner
    const banner = `
%c
   ╔═══════════════════════════════════════════════════════════════╗
   ║                                                               ║
   ║   ░░█ ▒█▀▀▀ ▒█▀▀▀ ▒█▀▀▀ ▀█▀ ▒█▄░▒█   ▀▀█▀▀ ▒█░▒█ ▒█▀▀▀█      ║
   ║   ░░█ ▒█▀▀▀ ▒█▀▀▀ ▒█▀▀▀ ▒█░ ▒█▒█▒█   ░▒█░░ ▒█▀▀█ ▒█░░▒█      ║
   ║   ▒█▄ ▒█▄▄▄ ▒█░░░ ▒█░░░ ▄█▄ ▒█░░▀█   ░▒█░░ ▒█░▒█ ▒█▄▄▄█      ║
   ║                                                               ║
   ╚═══════════════════════════════════════════════════════════════╝
`;

    const welcomeMessage = `
%c🔐 Hey there, curious one!

%cYou found the secret console. Nice work!
As a security professional, I appreciate your curiosity.

%c┌─────────────────────────────────────────┐
│  Looking to hire a security expert?     │
│  You're already looking at one.         │
└─────────────────────────────────────────┘

%c📧 Email: jeffint69@gmail.com
💼 LinkedIn: linkedin.com/in/jeffin-thomas-69a2a0348
📍 Location: Melbourne, Australia

%c⚡ Skills: Penetration Testing | Network Security | Cloud Security | Vulnerability Assessment

%c// P.S. Try the Konami code on the page... ↑↑↓↓←→←→BA
`;

    const warningMessage = `
%c⚠️  SECURITY NOTICE: This console is monitored for suspicious activity.
    Just kidding! But if you're here to learn, check out my security research section.
`;

    // Log the messages with styling
    console.log(
      banner,
      'color: #00ff9f; font-family: monospace; font-size: 10px;'
    );

    console.log(
      welcomeMessage,
      'color: #00ffff; font-size: 18px; font-weight: bold;', // Header
      'color: #888; font-size: 13px;', // Subtext
      'color: #00ff9f; font-size: 12px; font-family: monospace;', // Box
      'color: #00ffff; font-size: 12px;', // Contact info
      'color: #ffd93d; font-size: 11px;', // Skills
      'color: #888; font-size: 11px; font-style: italic;' // P.S.
    );

    console.log(
      warningMessage,
      'color: #ff6b6b; font-size: 11px;'
    );

    // Add a styled group for technical info
    console.groupCollapsed('%c📊 Technical Details', 'color: #00ffff; font-weight: bold;');
    console.log('%cFramework: Next.js 16', 'color: #888;');
    console.log('%cStyling: Tailwind CSS', 'color: #888;');
    console.log('%cHosted: Vercel', 'color: #888;');
    console.log('%cBuilt with: TypeScript, React', 'color: #888;');
    console.groupEnd();

  }, []);

  return null;
}
