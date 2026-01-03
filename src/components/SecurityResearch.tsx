'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CyberCorners from './CyberCorners';

interface CaseStudy {
  id: string;
  title: string;
  category: string;
  description: string;
  tools: string[];
  findings: string[];
  cvssRange?: string;
  pdfUrl: string;
  icon: string;
  thumbnail: string;
  screenshots: string[];
}

const caseStudies: CaseStudy[] = [
  {
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
    icon: '🔍',
    thumbnail: '/screenshots/vuln-assessment/scan-05.png',
    screenshots: [
      '/screenshots/vuln-assessment/scan-05.png',
      '/screenshots/vuln-assessment/scan-06.png',
      '/screenshots/vuln-assessment/scan-07.png',
      '/screenshots/vuln-assessment/scan-08.png'
    ]
  },
  {
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
    icon: '💾',
    thumbnail: '/screenshots/buffer-overflow/exploit-03.png',
    screenshots: [
      '/screenshots/buffer-overflow/exploit-03.png',
      '/screenshots/buffer-overflow/exploit-04.png',
      '/screenshots/buffer-overflow/exploit-05.png',
      '/screenshots/buffer-overflow/exploit-06.png',
      '/screenshots/buffer-overflow/exploit-07.png'
    ]
  },
  {
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
    icon: '💀',
    thumbnail: '/screenshots/pentest/attack-04.png',
    screenshots: [
      '/screenshots/pentest/attack-04.png',
      '/screenshots/pentest/attack-05.png',
      '/screenshots/pentest/attack-06.png',
      '/screenshots/pentest/attack-07.png',
      '/screenshots/pentest/attack-08.png'
    ]
  },
  {
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
    icon: '🌐',
    thumbnail: '/screenshots/web-security/websec-2.png',
    screenshots: [
      '/screenshots/web-security/websec-2.png',
      '/screenshots/web-security/websec-3.png',
      '/screenshots/web-security/websec-4.png',
      '/screenshots/web-security/websec-5.png'
    ]
  },
  {
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
    icon: '🛡️',
    thumbnail: '/screenshots/network-security/network-03.png',
    screenshots: [
      '/screenshots/network-security/network-03.png',
      '/screenshots/network-security/network-04.png',
      '/screenshots/network-security/network-05.png',
      '/screenshots/network-security/network-06.png',
      '/screenshots/network-security/network-07.png'
    ]
  },
  {
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
    icon: '📊',
    thumbnail: '/screenshots/risk-analysis/risk-1.png',
    screenshots: [
      '/screenshots/risk-analysis/risk-1.png',
      '/screenshots/risk-analysis/risk-2.png',
      '/screenshots/risk-analysis/risk-3.png'
    ]
  }
];

export default function SecurityResearch() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
      <section id="research" className="relative z-10" style={{ padding: '96px 5%' }}>
        <div className="w-full flex flex-col items-center">
          {/* Section Header */}
          <div className="text-center" style={{ marginBottom: '64px' }}>
            <p className="font-mono text-[var(--accent-cyan)]" style={{ marginBottom: '8px' }}>
              {'>'} cat /var/log/security_research.log
            </p>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ marginBottom: '16px' }}>
              Security <span className="text-[var(--accent-cyan)]">Research</span>
            </h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
              Real-world security assessments, penetration tests, and exploitation research.
              Click any card to view evidence screenshots.
            </p>
          </div>

          {/* Case Studies Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 w-full" style={{ gap: '24px' }}>
            {caseStudies.map((study) => (
              <CyberCorners key={study.id} color="cyan" size="md">
                <div
                  className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg overflow-hidden h-full flex flex-col"
                  style={{
                    transition: 'all 0.3s ease',
                    transform: hoveredCard === study.id ? 'translateY(-5px)' : 'translateY(0)',
                    boxShadow: hoveredCard === study.id
                      ? '0 0 30px rgba(0, 255, 255, 0.2), 0 10px 40px rgba(0, 0, 0, 0.3)'
                      : 'none'
                  }}
                  onMouseEnter={() => setHoveredCard(study.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Thumbnail Image */}
                  <Link
                    href={`/research/${study.id}`}
                    className="relative overflow-hidden cursor-pointer group block"
                    style={{ height: '160px' }}
                    onClick={() => sessionStorage.setItem('visitingEvidence', 'true')}
                  >
                    <Image
                      src={study.thumbnail}
                      alt={study.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-[var(--bg-primary)]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-center">
                        <div className="font-mono text-[var(--accent-cyan)] text-sm" style={{ marginBottom: '4px' }}>
                          [{study.screenshots.length} Screenshots]
                        </div>
                        <div className="font-mono text-[var(--text-primary)] text-xs">
                          Click to view evidence
                        </div>
                      </div>
                    </div>
                    {/* Category badge */}
                    <div
                      className="absolute top-3 right-3 font-mono text-xs bg-[var(--bg-primary)]/90 text-[var(--accent-cyan)] rounded backdrop-blur-sm"
                      style={{ padding: '4px 8px' }}
                    >
                      {study.category}
                    </div>
                    {/* Scan line effect */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-30"
                      style={{
                        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.03) 2px, rgba(0, 255, 255, 0.03) 4px)',
                      }}
                    />
                  </Link>

                  {/* Card Content */}
                  <div
                    className="border-b border-[var(--border-color)]"
                    style={{ padding: '16px 20px' }}
                  >
                    <h3 className="text-lg font-bold text-[var(--text-primary)]" style={{ marginBottom: '8px' }}>
                      {study.title}
                    </h3>
                    <p className="text-sm text-[var(--text-secondary)] line-clamp-2">
                      {study.description}
                    </p>
                  </div>

                  {/* Tools */}
                  <div className="border-b border-[var(--border-color)]" style={{ padding: '12px 20px' }}>
                    <div className="flex flex-wrap" style={{ gap: '6px' }}>
                      {study.tools.map((tool) => (
                        <span
                          key={tool}
                          className="font-mono text-xs bg-[var(--bg-tertiary)] text-[var(--accent-green)] rounded"
                          style={{ padding: '2px 8px' }}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expandable Findings */}
                  <div className="flex-grow" style={{ padding: '12px 20px' }}>
                    <button
                      onClick={() => setExpandedCard(expandedCard === study.id ? null : study.id)}
                      className="w-full flex items-center justify-between font-mono text-xs text-[var(--text-muted)] hover:text-[var(--accent-cyan)] transition-colors"
                      style={{ marginBottom: expandedCard === study.id ? '12px' : '0' }}
                    >
                      <span>KEY_FINDINGS: [{study.findings.length}]</span>
                      <span style={{
                        transform: expandedCard === study.id ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.3s ease'
                      }}>
                        ▼
                      </span>
                    </button>

                    {expandedCard === study.id && (
                      <div
                        className="space-y-2"
                        style={{
                          animation: 'fadeIn 0.3s ease'
                        }}
                      >
                        {study.findings.map((finding, idx) => (
                          <div
                            key={idx}
                            className="flex items-start text-sm"
                            style={{ gap: '8px' }}
                          >
                            <span className="text-[var(--accent-green)]">▹</span>
                            <span className="text-[var(--text-secondary)]">{finding}</span>
                          </div>
                        ))}
                        {study.cvssRange && (
                          <div
                            className="font-mono text-xs text-[var(--accent-red)]"
                            style={{ marginTop: '8px' }}
                          >
                            CVSS_RANGE: {study.cvssRange}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex" style={{ padding: '0 20px 20px', gap: '8px', marginTop: 'auto' }}>
                    <Link
                      href={`/research/${study.id}`}
                      className="flex-1 flex items-center justify-center font-mono text-sm bg-[var(--accent-cyan)]/10 border border-[var(--accent-cyan)] text-[var(--accent-cyan)] rounded hover:bg-[var(--accent-cyan)] hover:text-[var(--bg-primary)] transition-all"
                      style={{ padding: '10px 12px', gap: '6px' }}
                      onClick={() => sessionStorage.setItem('visitingEvidence', 'true')}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                      Evidence
                    </Link>
                    <a
                      href={study.pdfUrl}
                      download
                      className="flex-1 flex items-center justify-center font-mono text-sm border border-[var(--accent-green)] text-[var(--accent-green)] rounded hover:bg-[var(--accent-green)] hover:text-[var(--bg-primary)] transition-all"
                      style={{ padding: '10px 12px', gap: '6px' }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Report
                    </a>
                  </div>
                </div>
              </CyberCorners>
            ))}
          </div>

          {/* Stats Bar */}
          <div
              className="grid grid-cols-2 md:grid-cols-4 w-full max-w-4xl mx-auto bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg"
              style={{ padding: '24px', marginTop: '64px', gap: '16px' }}
            >
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--accent-cyan)]">6+</div>
              <div className="font-mono text-xs text-[var(--text-muted)]">SECURITY_REPORTS</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--accent-green)]">20+</div>
              <div className="font-mono text-xs text-[var(--text-muted)]">VULNS_DISCOVERED</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--accent-purple)]">15+</div>
              <div className="font-mono text-xs text-[var(--text-muted)]">TOOLS_MASTERED</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--accent-red)]">9.8</div>
              <div className="font-mono text-xs text-[var(--text-muted)]">MAX_CVSS_FOUND</div>
            </div>
          </div>
        </div>
      </section>
  );
}
