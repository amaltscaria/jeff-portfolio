'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  description: string;
  tools: string[];
  findings: string[];
  cvssRange?: string;
  pdfUrl: string;
  thumbnail: string;
  screenshots: string[];
}

const caseStudies: Record<string, CaseStudy> = {
  'vuln-assessment': {
    id: 'vuln-assessment',
    title: 'SkillsBridge Vulnerability Assessment',
    category: 'Vulnerability Assessment',
    description: 'Comprehensive security assessment of a web application identifying critical vulnerabilities including SQL injection points, authentication weaknesses, and server misconfigurations.',
    tools: ['Nmap', 'Nikto', 'Burp Suite', 'Kali Linux'],
    findings: [
      'SQL Injection vulnerabilities in login forms',
      'Outdated Apache server with known CVEs',
      'Missing security headers (CSP, X-Frame-Options)',
      'Information disclosure through error messages'
    ],
    cvssRange: '4.3 - 9.8',
    pdfUrl: '/reports/vulnerability-assessment-skillsbridge.pdf',
    thumbnail: '/screenshots/vuln-assessment/scan-05.png',
    screenshots: [
      '/screenshots/vuln-assessment/scan-05.png',
      '/screenshots/vuln-assessment/scan-06.png',
      '/screenshots/vuln-assessment/scan-07.png',
      '/screenshots/vuln-assessment/scan-08.png'
    ]
  },
  'buffer-overflow': {
    id: 'buffer-overflow',
    title: 'Binary Exploitation & Memory Attacks',
    category: 'Binary Exploitation',
    description: 'Deep dive into buffer overflow exploitation techniques including ASLR bypass, Stack Guard bypass, and format string attacks on vulnerable binaries.',
    tools: ['GDB', 'Python', 'pwntools', 'ROPgadget'],
    findings: [
      'Successfully bypassed ASLR using information leaks',
      'Exploited stack-based buffer overflow for code execution',
      'Demonstrated format string vulnerability exploitation',
      'Achieved privilege escalation through ret2libc'
    ],
    pdfUrl: '/reports/buffer-overflow-exploitation.pdf',
    thumbnail: '/screenshots/buffer-overflow/exploit-03.png',
    screenshots: [
      '/screenshots/buffer-overflow/exploit-03.png',
      '/screenshots/buffer-overflow/exploit-04.png',
      '/screenshots/buffer-overflow/exploit-05.png',
      '/screenshots/buffer-overflow/exploit-06.png',
      '/screenshots/buffer-overflow/exploit-07.png'
    ]
  },
  'pentest-deathnote': {
    id: 'pentest-deathnote',
    title: 'Penetration Test: Deathnote VM',
    category: 'Penetration Testing',
    description: 'Full penetration test engagement on a vulnerable machine, from initial reconnaissance to root access, including threat modeling and DFD analysis.',
    tools: ['Nmap', 'Metasploit', 'Hydra', 'LinPEAS'],
    findings: [
      'Authentication Bypass (CVSS 7.5)',
      'Remote Code Execution (CVSS 9.8)',
      'Privilege Escalation via sudo misconfiguration (CVSS 8.2)',
      'Sensitive data exposure in config files'
    ],
    cvssRange: '7.5 - 9.8',
    pdfUrl: '/reports/penetration-testing-deathnote.pdf',
    thumbnail: '/screenshots/pentest/attack-04.png',
    screenshots: [
      '/screenshots/pentest/attack-04.png',
      '/screenshots/pentest/attack-05.png',
      '/screenshots/pentest/attack-06.png',
      '/screenshots/pentest/attack-07.png',
      '/screenshots/pentest/attack-08.png'
    ]
  },
  'web-security': {
    id: 'web-security',
    title: 'OWASP Web Security Labs',
    category: 'Web Application Security',
    description: 'Hands-on completion of PortSwigger Web Security Academy labs covering SQL injection, XSS, CSRF, and other OWASP Top 10 vulnerabilities.',
    tools: ['Burp Suite', 'Browser DevTools', 'SQLMap'],
    findings: [
      'SQL Injection: Union-based & Blind extraction',
      'XSS: Reflected, Stored, and DOM-based attacks',
      'CSRF: Token bypass techniques',
      'CORS misconfiguration exploitation'
    ],
    pdfUrl: '/reports/web-security-labs.pdf',
    thumbnail: '/screenshots/web-security/websec-2.png',
    screenshots: [
      '/screenshots/web-security/websec-2.png',
      '/screenshots/web-security/websec-3.png',
      '/screenshots/web-security/websec-4.png',
      '/screenshots/web-security/websec-5.png'
    ]
  },
  'network-security': {
    id: 'network-security',
    title: 'Enterprise Network Security Design',
    category: 'Network Security',
    description: 'Design and implementation of a secure enterprise network with VPN tunnels, firewall policies, and intrusion detection systems.',
    tools: ['MikroTik', 'Snort IDS', 'GNS3', 'Wireshark'],
    findings: [
      'Site-to-Site VPN with IPsec encryption',
      'Remote-Access VPN for secure employee access',
      'Custom Snort IDS rules for threat detection',
      'Comprehensive firewall ACL policies'
    ],
    pdfUrl: '/reports/network-security-design.pdf',
    thumbnail: '/screenshots/network-security/network-03.png',
    screenshots: [
      '/screenshots/network-security/network-03.png',
      '/screenshots/network-security/network-04.png',
      '/screenshots/network-security/network-05.png',
      '/screenshots/network-security/network-06.png',
      '/screenshots/network-security/network-07.png'
    ]
  },
  'risk-analysis': {
    id: 'risk-analysis',
    title: 'Security Risk Assessment & CVSS Analysis',
    category: 'Risk Management',
    description: 'Comprehensive risk assessment using CVSS scoring methodology to quantify and prioritize security vulnerabilities with mitigation strategies.',
    tools: ['CVSS Calculator', 'Risk Matrix', 'Excel', 'NIST Framework'],
    findings: [
      'Quantified 15+ vulnerabilities using CVSS v3.1',
      'Created risk priority matrix for remediation',
      'Developed mitigation timeline and strategies',
      'Mapped findings to business impact levels'
    ],
    cvssRange: '4.3 - 9.8',
    pdfUrl: '/reports/risk-analysis-skillsbridge.pdf',
    thumbnail: '/screenshots/risk-analysis/risk-1.png',
    screenshots: [
      '/screenshots/risk-analysis/risk-1.png',
      '/screenshots/risk-analysis/risk-2.png',
      '/screenshots/risk-analysis/risk-3.png'
    ]
  }
};

export default function ResearchGalleryPage() {
  const params = useParams();
  const id = params.id as string;
  const study = caseStudies[id];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = useCallback(() => {
    if (!study) return;
    setCurrentIndex((prev) => (prev === 0 ? study.screenshots.length - 1 : prev - 1));
  }, [study]);

  const handleNext = useCallback(() => {
    if (!study) return;
    setCurrentIndex((prev) => (prev === study.screenshots.length - 1 ? 0 : prev + 1));
  }, [study]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  if (!study) {
    return (
      <main className="min-h-screen bg-[var(--bg-primary)]">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-mono text-[var(--accent-red)]">Case Study Not Found</h1>
            <Link href="/#research" className="mt-4 inline-block font-mono text-[var(--accent-cyan)] hover:underline">
              ← Back to Research
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between" style={{ padding: '16px 24px' }}>
          <Link
            href="/#research"
            className="font-mono text-sm text-[var(--accent-cyan)] hover:text-[var(--accent-green)] transition-colors"
          >
            ← Back to Portfolio
          </Link>
          <div className="flex items-center" style={{ gap: '16px' }}>
            <span className="font-mono text-sm text-[var(--text-muted)]">
              {currentIndex + 1} / {study.screenshots.length}
            </span>
            <a
              href={study.pdfUrl}
              download
              className="font-mono text-sm border border-[var(--accent-green)] text-[var(--accent-green)] rounded hover:bg-[var(--accent-green)] hover:text-[var(--bg-primary)] transition-all flex items-center"
              style={{ padding: '8px 16px', gap: '6px' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Report
            </a>
          </div>
        </div>
      </nav>

      {/* Content */}
      <section className="relative z-10" style={{ padding: '100px 5% 48px 5%' }}>
        <div className="w-full flex flex-col items-center">

          {/* Title */}
          <div className="text-center w-full" style={{ marginBottom: '32px' }}>
            <span className="font-mono text-xs text-[var(--accent-cyan)]">
              [{study.category}]
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-primary)]" style={{ marginTop: '8px' }}>
              {study.title}
            </h1>
            <p className="text-[var(--text-secondary)]" style={{ marginTop: '12px', maxWidth: '768px', marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
              {study.description}
            </p>
          </div>

          {/* Image Viewer */}
          <div className="w-full max-w-5xl" style={{ marginBottom: '24px' }}>
            <div
              className="relative bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg overflow-hidden"
              style={{ minHeight: '500px' }}
            >
              {/* Nav Buttons */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-[var(--bg-primary)]/80 border border-[var(--border-color)] rounded-lg text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)] hover:text-[var(--bg-primary)] transition-all font-mono backdrop-blur-sm"
                style={{ padding: '16px 20px' }}
              >
                ‹
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-[var(--bg-primary)]/80 border border-[var(--border-color)] rounded-lg text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)] hover:text-[var(--bg-primary)] transition-all font-mono backdrop-blur-sm"
                style={{ padding: '16px 20px' }}
              >
                ›
              </button>

              {/* Image */}
              <div className="w-full h-full flex items-center justify-center" style={{ minHeight: '500px', padding: '20px' }}>
                <img
                  src={study.screenshots[currentIndex]}
                  alt={`${study.title} screenshot ${currentIndex + 1}`}
                  style={{ maxWidth: '100%', maxHeight: '60vh', objectFit: 'contain' }}
                />
              </div>

              {/* Cyber corners */}
              <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[var(--accent-cyan)] pointer-events-none" />
              <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[var(--accent-cyan)] pointer-events-none" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[var(--accent-cyan)] pointer-events-none" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[var(--accent-cyan)] pointer-events-none" />

              {/* Keyboard hints */}
              <div
                className="absolute bottom-4 left-1/2 -translate-x-1/2 flex font-mono text-xs text-[var(--text-muted)] bg-[var(--bg-primary)]/80 backdrop-blur-sm rounded"
                style={{ padding: '8px 16px', gap: '16px' }}
              >
                <span>[←] Prev</span>
                <span>[→] Next</span>
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          <div className="flex flex-wrap justify-center w-full max-w-4xl" style={{ gap: '12px', marginBottom: '48px' }}>
            {study.screenshots.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative overflow-hidden rounded border-2 transition-all ${
                  idx === currentIndex
                    ? 'border-[var(--accent-cyan)] shadow-[0_0_15px_var(--accent-cyan)]'
                    : 'border-[var(--border-color)] opacity-60 hover:opacity-100'
                }`}
                style={{ width: '120px', height: '75px' }}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </button>
            ))}
          </div>

          {/* Details */}
          <div className="grid md:grid-cols-2 w-full max-w-4xl" style={{ gap: '24px' }}>
            {/* Tools */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg" style={{ padding: '24px' }}>
              <h3 className="font-mono text-sm text-[var(--text-muted)]" style={{ marginBottom: '16px' }}>TOOLS_USED:</h3>
              <div className="flex flex-wrap" style={{ gap: '8px' }}>
                {study.tools.map((tool) => (
                  <span
                    key={tool}
                    className="font-mono text-sm bg-[var(--bg-tertiary)] text-[var(--accent-green)] rounded"
                    style={{ padding: '6px 12px' }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Findings */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg" style={{ padding: '24px' }}>
              <h3 className="font-mono text-sm text-[var(--text-muted)]" style={{ marginBottom: '16px' }}>
                KEY_FINDINGS:
                {study.cvssRange && (
                  <span className="text-[var(--accent-red)]" style={{ marginLeft: '12px' }}>
                    CVSS: {study.cvssRange}
                  </span>
                )}
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {study.findings.map((finding, idx) => (
                  <li key={idx} className="flex items-start text-sm" style={{ gap: '8px' }}>
                    <span className="text-[var(--accent-green)]">▹</span>
                    <span className="text-[var(--text-secondary)]">{finding}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
