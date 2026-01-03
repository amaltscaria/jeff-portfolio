'use client';

import { useState } from 'react';
import TiltCard from './TiltCard';
import ScrollAnimation from './ScrollAnimation';
import GlitchText from './GlitchText';

interface Vulnerability {
  name: string;
  cvss: number;
  severity: 'Critical' | 'High' | 'Medium' | 'Low' | 'Info';
}

interface Project {
  id: string;
  title: string;
  subtitle: string;
  type: 'solo' | 'team' | 'research';
  course?: string;
  date: string;
  icon: string;
  description: string;
  methodology: string[];
  tools: string[];
  vulnerabilities?: Vulnerability[];
  findings?: string[];
  highlights?: string[];
  reportLink?: string;
}

const projects: Project[] = [
  {
    id: 'pentest-deathnote',
    title: 'Penetration Testing - Deathnote VM',
    subtitle: 'Full Stack Exploitation & Privilege Escalation',
    type: 'solo',
    course: 'FIT5003 - Software Security',
    date: '2024',
    icon: '💀',
    description: 'Conducted comprehensive penetration testing on Deathnote vulnerable machine, identifying critical vulnerabilities and demonstrating full exploitation chain from initial access to root privilege escalation.',
    methodology: [
      'Network reconnaissance with Nmap',
      'Web application enumeration',
      'Authentication bypass via brute force',
      'Remote code execution through command injection',
      'Linux privilege escalation using SUID binaries',
      'Threat modeling with Data Flow Diagrams'
    ],
    tools: ['Nmap', 'Hydra', 'Netcat', 'LinPEAS', 'Burp Suite', 'Python'],
    vulnerabilities: [
      { name: 'Authentication Bypass', cvss: 7.5, severity: 'High' },
      { name: 'Remote Code Execution', cvss: 9.8, severity: 'Critical' },
      { name: 'Privilege Escalation', cvss: 8.2, severity: 'High' }
    ],
    highlights: [
      'Achieved root access through multi-stage attack chain',
      'Created detailed DFD-based threat model',
      'Documented complete exploitation methodology'
    ],
    reportLink: '/reports/penetration-testing-deathnote.pdf'
  },
  {
    id: 'buffer-overflow',
    title: 'Buffer Overflow Exploitation',
    subtitle: 'Memory Corruption & Security Bypass Techniques',
    type: 'solo',
    course: 'FIT5003 - Software Security',
    date: '2024',
    icon: '🧨',
    description: 'Deep-dive into low-level memory exploitation techniques including stack-based buffer overflows, bypassing modern security protections (ASLR, Stack Guard, DEP), and format string vulnerabilities.',
    methodology: [
      'Stack buffer overflow exploitation',
      'Return address manipulation',
      'NOP sled construction',
      'ASLR bypass via brute force',
      'Stack canary bypass techniques',
      'Format string attack execution'
    ],
    tools: ['GDB', 'Perl', 'Python', 'Linux', 'objdump', 'strace'],
    findings: [
      'Successfully spawned root shell via buffer overflow',
      'Demonstrated ASLR bypass with loop-based approach',
      'Calculated and bypassed Stack Guard canary values',
      'Executed format string attacks to modify memory'
    ],
    highlights: [
      'Achieved code execution bypassing ASLR',
      'Demonstrated Stack Guard bypass techniques',
      'Created custom shellcode payloads'
    ],
    reportLink: '/reports/buffer-overflow-exploitation.pdf'
  },
  {
    id: 'web-security-labs',
    title: 'Web Security Labs',
    subtitle: 'OWASP Top 10 Exploitation',
    type: 'solo',
    course: 'FIT5003 - Software Security',
    date: '2024',
    icon: '🌐',
    description: 'Completed advanced PortSwigger Web Security Academy labs demonstrating proficiency in SQL Injection, Cross-Site Scripting (XSS), and Cross-Site Request Forgery (CSRF) attack techniques.',
    methodology: [
      'UNION-based SQL injection for data extraction',
      'DOM-based XSS via document.write sink',
      'CSRF token bypass via method switching',
      'CORS header analysis and exploitation',
      'Information schema enumeration'
    ],
    tools: ['Burp Suite', 'PortSwigger Labs', 'Browser DevTools', 'SQLMap'],
    vulnerabilities: [
      { name: 'SQL Injection (UNION)', cvss: 8.6, severity: 'High' },
      { name: 'DOM-based XSS', cvss: 6.1, severity: 'Medium' },
      { name: 'CSRF Token Bypass', cvss: 8.0, severity: 'High' }
    ],
    findings: [
      'Extracted admin credentials via UNION injection',
      'Executed arbitrary JavaScript via DOM XSS',
      'Bypassed CSRF protection using GET method',
      'Analyzed CORS misconfiguration risks'
    ],
    reportLink: '/reports/web-security-labs.pdf'
  },
  {
    id: 'network-security-design',
    title: 'Enterprise Network Security Design',
    subtitle: 'Multi-Campus VPN, Firewall & IDS Architecture',
    type: 'solo',
    course: 'FIT5037 - Network Security',
    date: '2024',
    icon: '🏢',
    description: 'Designed and implemented comprehensive network security architecture for multi-campus university network including Site-to-Site VPN, Remote Access VPN, firewall rules, and intrusion detection systems.',
    methodology: [
      'Network topology design (Clayton, Peninsula, Caulfield)',
      'Site-to-Site IPsec VPN with AES-GCM encryption',
      'Remote Access VPN using strongSwan',
      'MikroTik firewall rule configuration',
      'Snort IDS rule development',
      'Security analysis and firewall bypass testing'
    ],
    tools: ['GNS3', 'MikroTik RouterOS', 'Snort IDS', 'strongSwan', 'Wireshark', 'IPsec'],
    findings: [
      'Configured 100+ firewall rules across 3 sites',
      'Implemented AES-256-GCM VPN encryption',
      'Created custom Snort rules for threat detection',
      'Designed DMZ architecture for web servers'
    ],
    highlights: [
      'Full IPsec VPN implementation with IKEv2',
      'Custom Snort signatures for port scanning detection',
      'Comprehensive ACL ruleset for traffic filtering'
    ],
    reportLink: '/reports/network-security-design.pdf'
  },
  {
    id: 'skillsbridge-assessment',
    title: 'SkillsBridge Vulnerability Assessment',
    subtitle: 'Web Application Security Testing & Risk Analysis',
    type: 'team',
    course: 'Team Project - Stranger Thinks',
    date: '2024',
    icon: '🔍',
    description: 'Conducted comprehensive security assessment of SkillsBridge web application using multiple scanning tools, identifying security vulnerabilities and providing detailed risk analysis with mitigation strategies.',
    methodology: [
      'Port and service enumeration with Nmap',
      'Web vulnerability scanning with Nikto',
      'Manual SQL injection testing with Burp Suite',
      'Security header analysis',
      'SSL/TLS configuration review',
      'Risk scoring and prioritization'
    ],
    tools: ['Nmap 7.95', 'Nikto', 'Burp Suite', 'SSL Labs', 'OWASP ZAP'],
    vulnerabilities: [
      { name: 'Missing HSTS Header', cvss: 6.5, severity: 'High' },
      { name: 'Missing X-Frame-Options', cvss: 6.5, severity: 'High' },
      { name: 'Private IP Disclosure', cvss: 5.3, severity: 'Medium' },
      { name: 'DoS Risk - Slow HTTP', cvss: 5.0, severity: 'Medium' }
    ],
    findings: [
      'HTTP to HTTPS redirect properly configured',
      'Strong TLS/SSL configuration (Grade A)',
      'WAF protection operational',
      'Missing security headers identified'
    ],
    reportLink: '/reports/vulnerability-assessment-skillsbridge.pdf'
  },
  {
    id: 'skillsbridge-risk',
    title: 'Security Risk Analysis Report',
    subtitle: 'Risk Assessment & Mitigation Strategies',
    type: 'team',
    course: 'Team Project - Stranger Thinks',
    date: '2024',
    icon: '📊',
    description: 'Comprehensive risk analysis report consolidating findings from Nmap, Nikto, and Burp Suite scans with detailed risk tables, severity ratings, and actionable mitigation strategies.',
    methodology: [
      'Risk identification and categorization',
      'CVSS-based severity scoring',
      'Attack surface analysis',
      'Mitigation strategy development',
      'Security header recommendations',
      'Continuous monitoring guidelines'
    ],
    tools: ['Risk Matrix', 'CVSS Calculator', 'OWASP Guidelines'],
    findings: [
      'Prioritized vulnerabilities by risk level',
      'Provided specific header configurations',
      'Recommended rate limiting implementations',
      'Suggested WAF rule adjustments'
    ],
    highlights: [
      'Actionable remediation roadmap',
      'Security header implementation guide',
      'Continuous monitoring recommendations'
    ],
    reportLink: '/reports/risk-analysis-skillsbridge.pdf'
  },
  {
    id: 'senior-learning',
    title: 'Senior Lifelong Learning Platform',
    subtitle: 'Graduate Research Project',
    type: 'research',
    course: 'Monash University',
    date: '2024-2025',
    icon: '🎓',
    description: 'Developed a web platform for older Australians (60+) with digital literacy guides and health resources. Conducted comprehensive security assessment addressing OWASP Top 10 vulnerabilities.',
    methodology: [
      'Full-stack web development',
      'OWASP Top 10 security testing',
      'SQL Injection prevention',
      'XSS and CSRF protection',
      'API security hardening',
      'TLS/SSL implementation'
    ],
    tools: ['OWASP ZAP', 'Nikto', 'Nmap', 'React', 'Node.js', 'PostgreSQL'],
    highlights: [
      'Secure authentication implementation',
      'Input validation and sanitization',
      'Security-first development approach'
    ]
  },
  {
    id: 'indoor-positioning',
    title: 'Indoor Positioning System',
    subtitle: 'BLE-Based Navigation Research',
    type: 'research',
    course: 'Karunya Institute of Technology',
    date: '2022-2023',
    icon: '📍',
    description: 'Built Android application using BLE beacons for GPS-denied environments. Implemented advanced algorithms for accurate indoor positioning and navigation. Co-authored IEEE research paper.',
    methodology: [
      'BLE beacon signal analysis',
      'Kalman filter for signal smoothing',
      'Trilateration algorithm implementation',
      'Dijkstra\'s algorithm for navigation',
      'User interface development',
      'Performance optimization'
    ],
    tools: ['Android Studio', 'Java', 'BLE Beacons', 'SQLite', 'Git'],
    highlights: [
      'Co-authored IEEE research paper',
      'Sub-meter positioning accuracy',
      'Real-time navigation updates'
    ]
  }
];

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'Critical': return 'bg-red-500/20 text-red-400 border-red-500/50';
    case 'High': return 'bg-orange-500/20 text-orange-400 border-orange-500/50';
    case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    case 'Low': return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
  }
};

const getCVSSColor = (cvss: number) => {
  if (cvss >= 9.0) return 'text-red-400';
  if (cvss >= 7.0) return 'text-orange-400';
  if (cvss >= 4.0) return 'text-yellow-400';
  return 'text-blue-400';
};

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'solo': return { label: 'Solo Project', color: 'bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)] border-[var(--accent-cyan)]/50' };
    case 'team': return { label: 'Team Project', color: 'bg-[var(--accent-green)]/20 text-[var(--accent-green)] border-[var(--accent-green)]/50' };
    case 'research': return { label: 'Research', color: 'bg-purple-500/20 text-purple-400 border-purple-500/50' };
    default: return { label: 'Project', color: 'bg-gray-500/20 text-gray-400 border-gray-500/50' };
  }
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const typeInfo = getTypeLabel(project.type);

  return (
    <TiltCard
      className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg overflow-hidden hover:border-[var(--accent-cyan)] transition-all duration-300"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Header with icon and gradient */}
      <div className="h-24 bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-secondary)] flex items-center justify-between px-6">
        <span className="text-5xl">{project.icon}</span>
        <div className="flex flex-col items-end gap-2">
          <span className={`text-xs font-mono px-2 py-1 rounded border ${typeInfo.color}`}>
            {typeInfo.label}
          </span>
          <span className="text-xs font-mono text-[var(--accent-green)]">{project.date}</span>
        </div>
      </div>

      <div className="p-6">
        {/* Title and subtitle */}
        <h3 className="text-lg font-semibold text-[var(--accent-cyan)] mb-1">{project.title}</h3>
        <p className="text-[var(--text-muted)] text-sm mb-2">{project.subtitle}</p>
        {project.course && (
          <p className="text-xs font-mono text-[var(--accent-green)] mb-4">{project.course}</p>
        )}

        {/* Description */}
        <p className="text-[var(--text-secondary)] text-sm mb-4 leading-relaxed">{project.description}</p>

        {/* CVSS Vulnerabilities (if present) */}
        {project.vulnerabilities && project.vulnerabilities.length > 0 && (
          <div className="mb-4">
            <h4 className="text-xs font-mono text-[var(--text-muted)] mb-2">// vulnerabilities_found</h4>
            <div className="flex flex-wrap gap-2">
              {project.vulnerabilities.map((vuln, i) => (
                <div
                  key={i}
                  className={`text-xs px-2 py-1 rounded border flex items-center gap-2 ${getSeverityColor(vuln.severity)}`}
                >
                  <span>{vuln.name}</span>
                  <span className={`font-mono font-bold ${getCVSSColor(vuln.cvss)}`}>
                    {vuln.cvss.toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tools */}
        <div className="mb-4">
          <h4 className="text-xs font-mono text-[var(--text-muted)] mb-2">// tools_used</h4>
          <div className="flex flex-wrap gap-2">
            {project.tools.map((tool, i) => (
              <span
                key={i}
                className="text-xs font-mono bg-[var(--bg-tertiary)] rounded text-[var(--accent-green)] px-2 py-1 border border-[var(--border-color)]"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Expandable Section */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full text-left text-xs font-mono text-[var(--accent-cyan)] hover:text-[var(--accent-green)] transition-colors flex items-center gap-2 mb-2"
        >
          <span>{isExpanded ? '[-]' : '[+]'}</span>
          <span>{isExpanded ? 'Hide details' : 'Show methodology & findings'}</span>
        </button>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-[var(--border-color)] animate-[fadeIn_0.3s_ease-out]">
            {/* Methodology */}
            <div className="mb-4">
              <h4 className="text-xs font-mono text-[var(--text-muted)] mb-2">// methodology</h4>
              <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                {project.methodology.map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[var(--accent-green)]">→</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Findings */}
            {project.findings && project.findings.length > 0 && (
              <div className="mb-4">
                <h4 className="text-xs font-mono text-[var(--text-muted)] mb-2">// key_findings</h4>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  {project.findings.map((finding, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[var(--accent-cyan)]">•</span>
                      <span>{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Highlights */}
            {project.highlights && project.highlights.length > 0 && (
              <div className="mb-4">
                <h4 className="text-xs font-mono text-[var(--text-muted)] mb-2">// highlights</h4>
                <ul className="text-sm text-[var(--text-secondary)] space-y-1">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-yellow-400">★</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Report Link */}
            {project.reportLink && (
              <a
                href={project.reportLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] px-3 py-2 rounded border border-[var(--accent-cyan)]/30 hover:bg-[var(--accent-cyan)]/20 transition-colors"
              >
                <span>📄</span>
                <span>View Full Report (PDF)</span>
              </a>
            )}
          </div>
        )}
      </div>
    </TiltCard>
  );
}

export default function ProjectsSection() {
  const [filter, setFilter] = useState<'all' | 'solo' | 'team' | 'research'>('all');

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.type === filter);

  const stats = {
    total: projects.length,
    vulnerabilities: projects.reduce((acc, p) => acc + (p.vulnerabilities?.length || 0), 0),
    tools: [...new Set(projects.flatMap(p => p.tools))].length
  };

  return (
    <section id="projects" className="relative z-10 py-24 px-[5%]">
      <div className="w-full flex flex-col items-center">
        {/* Section Header */}
        <ScrollAnimation>
          <div className="text-center mb-16">
            <span className="font-mono text-sm text-[var(--accent-green)]">// security_projects</span>
            <h2 className="text-4xl font-bold text-[var(--text-primary)] mt-2">
              <GlitchText>Security Projects</GlitchText>
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-green)] mx-auto mt-4 rounded"></div>
          </div>
        </ScrollAnimation>

        {/* Stats Bar */}
        <ScrollAnimation delay={50}>
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            <div className="text-center">
              <span className="text-3xl font-bold font-mono text-[var(--accent-cyan)]">{stats.total}</span>
              <p className="text-xs text-[var(--text-muted)] mt-1">Projects</p>
            </div>
            <div className="text-center">
              <span className="text-3xl font-bold font-mono text-[var(--accent-red)]">{stats.vulnerabilities}</span>
              <p className="text-xs text-[var(--text-muted)] mt-1">Vulnerabilities Found</p>
            </div>
            <div className="text-center">
              <span className="text-3xl font-bold font-mono text-[var(--accent-green)]">{stats.tools}</span>
              <p className="text-xs text-[var(--text-muted)] mt-1">Tools Used</p>
            </div>
          </div>
        </ScrollAnimation>

        {/* Filter Buttons */}
        <ScrollAnimation delay={100}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {[
              { key: 'all', label: 'All Projects' },
              { key: 'solo', label: 'Solo Work' },
              { key: 'team', label: 'Team Projects' },
              { key: 'research', label: 'Research' }
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilter(key as typeof filter)}
                className={`px-4 py-2 rounded font-mono text-sm border transition-all duration-300 ${
                  filter === key
                    ? 'bg-[var(--accent-cyan)] text-[var(--bg-primary)] border-[var(--accent-cyan)]'
                    : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--accent-cyan)]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </ScrollAnimation>

        {/* Projects Grid */}
        <ScrollAnimation delay={150}>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-6xl gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </ScrollAnimation>

        {/* View All Reports CTA */}
        <ScrollAnimation delay={200}>
          <div className="mt-16 text-center">
            <p className="text-[var(--text-muted)] text-sm mb-4 font-mono">
              // All project reports available in PDF format
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="/reports/penetration-testing-deathnote.pdf"
                className="text-xs font-mono px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded text-[var(--text-secondary)] hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] transition-all"
              >
                💀 Pentest Report
              </a>
              <a
                href="/reports/buffer-overflow-exploitation.pdf"
                className="text-xs font-mono px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded text-[var(--text-secondary)] hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] transition-all"
              >
                🧨 Buffer Overflow
              </a>
              <a
                href="/reports/web-security-labs.pdf"
                className="text-xs font-mono px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded text-[var(--text-secondary)] hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] transition-all"
              >
                🌐 Web Security
              </a>
              <a
                href="/reports/network-security-design.pdf"
                className="text-xs font-mono px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded text-[var(--text-secondary)] hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] transition-all"
              >
                🏢 Network Design
              </a>
              <a
                href="/reports/vulnerability-assessment-skillsbridge.pdf"
                className="text-xs font-mono px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded text-[var(--text-secondary)] hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] transition-all"
              >
                🔍 Vuln Assessment
              </a>
              <a
                href="/reports/risk-analysis-skillsbridge.pdf"
                className="text-xs font-mono px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded text-[var(--text-secondary)] hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] transition-all"
              >
                📊 Risk Analysis
              </a>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
