import Image from "next/image";
import MatrixRain from "@/components/MatrixRain";
import Navbar from "@/components/Navbar";
import ScrollAnimation from "@/components/ScrollAnimation";
import BackToTop from "@/components/BackToTop";
import TiltCard from "@/components/TiltCard";
import CustomCursor from "@/components/CustomCursor";
import TerminalSequence from "@/components/TerminalSequence";
import SkillBar from "@/components/SkillBar";
import LoadingScreen from "@/components/LoadingScreen";
import SectionTransition, { CyberDivider } from "@/components/SectionTransition";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import KonamiEasterEgg from "@/components/KonamiEasterEgg";
import ParticleNetwork from "@/components/ParticleNetwork";
import GlitchText from "@/components/GlitchText";
import MagneticButton from "@/components/MagneticButton";
import ScrollProgress from "@/components/ScrollProgress";
import AnimatedCounter from "@/components/AnimatedCounter";
import CommandPalette from "@/components/CommandPalette";
import CursorTrail from "@/components/CursorTrail";
import ClickRipple from "@/components/ClickRipple";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">
      <LoadingScreen />
      <ScrollProgress />
      <CustomCursor />
      <MatrixRain />
      <ParticleNetwork />
      <Navbar />
      <ThemeSwitcher />
      <KonamiEasterEgg />
      <CommandPalette />
      <CursorTrail />
      <ClickRipple />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-[5%] flex-col lg:flex-row" style={{gap: '64px', paddingTop: '100px', paddingBottom: '80px'}}>

        {/* Terminal Window */}
        <div className="w-full max-w-[600px] bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5),var(--glow-cyan)]">

          {/* Terminal Header */}
          <div className="bg-[var(--bg-tertiary)] px-4 py-3 flex items-center gap-2 border-b border-[var(--border-color)]">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
            <div className="w-3 h-3 rounded-full bg-[#27ca40]"></div>
            <span className="ml-auto font-mono text-xs text-[var(--text-muted)]">jeffin@portfolio:~</span>
          </div>

          {/* Terminal Body */}
          <div className="p-6 font-mono text-sm leading-8">
            <TerminalSequence />
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative">
          <div className="relative w-[280px] h-[280px] lg:w-[320px] lg:h-[320px] rounded-full overflow-hidden border-[3px] border-[var(--accent-cyan)] shadow-[var(--glow-cyan)]">
            <Image
              src="/jeffin-photo.jpeg"
              alt="Jeffin Thomas"
              fill
              className="object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-300 hover:scale-105"
              priority
            />
            {/* Scan Line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-cyan)] to-transparent opacity-70 animate-[scan_2s_linear_infinite]"></div>
          </div>

          {/* Status Badge */}
          <div className="absolute bottom-4 right-0 bg-[#0d1117] border-2 border-[var(--accent-green)] rounded-full font-mono text-xs text-[var(--accent-green)] flex items-center gap-3" style={{padding: '8px 18px'}}>
            <div className="w-2 h-2 bg-[var(--accent-green)] rounded-full animate-[pulse_2s_infinite]"></div>
            <span>Available for hire</span>
          </div>
        </div>
      </section>

      {/* Divider after Hero */}
      <CyberDivider />

      {/* About Section */}
      <section id="about" className="relative z-10 py-24 px-[5%] bg-[var(--bg-secondary)]/50">
        <div className="w-full flex flex-col items-center">
          {/* Section Header */}
          <ScrollAnimation>
            <div className="text-center" style={{marginBottom: '64px'}}>
              <span className="font-mono text-sm text-[var(--accent-green)]">// about_me</span>
              <h2 className="text-4xl font-bold text-[var(--text-primary)]" style={{marginTop: '8px'}}><GlitchText>Who Am I?</GlitchText></h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-green)] mx-auto rounded" style={{marginTop: '16px'}}></div>
            </div>
          </ScrollAnimation>

          {/* About Text - Centered */}
          <ScrollAnimation delay={100}>
            <div className="text-center max-w-3xl" style={{marginBottom: '80px'}}>
              <h3 className="text-2xl font-mono text-[var(--accent-cyan)]" style={{marginBottom: '24px'}}>&gt; ./about.sh</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed" style={{marginBottom: '16px'}}>
                I&apos;m a <span className="text-[var(--accent-cyan)] font-semibold">Cybersecurity Professional</span> and
                <span className="text-[var(--accent-cyan)] font-semibold"> Network Engineer</span> with a passion for
                securing digital infrastructure and identifying vulnerabilities before they become threats.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed" style={{marginBottom: '16px'}}>
                With a <span className="text-[var(--accent-green)]">Master&apos;s in Cybersecurity from Monash University</span> and
                hands-on experience in penetration testing, vulnerability assessments, and network security,
                I bring both academic rigor and practical expertise to every project.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                My toolkit includes <span className="text-[var(--accent-cyan)]">Nmap, Burp Suite, Wireshark, Metasploit</span>,
                and cloud platforms like <span className="text-[var(--accent-cyan)]">AWS</span>. I hold certifications including
                <span className="text-[var(--accent-green)]"> CCNP, CCNA, and AWS Solutions Architect</span>.
              </p>
            </div>
          </ScrollAnimation>

          {/* Stats Grid - Centered */}
          <ScrollAnimation delay={200}>
            <div className="grid grid-cols-2 md:grid-cols-4 w-full max-w-4xl" style={{marginTop: '40px', gap: '24px'}}>
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg text-center hover:border-[var(--accent-cyan)] transition-all duration-300 hover:-translate-y-1" style={{padding: '24px'}}>
                <span className="text-4xl font-bold font-mono text-[var(--accent-cyan)] block">
                  <AnimatedCounter end={5} suffix="+" duration={1500} />
                </span>
                <span className="text-[var(--text-secondary)] text-sm block" style={{marginTop: '8px'}}>Certifications</span>
              </div>
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg text-center hover:border-[var(--accent-cyan)] transition-all duration-300 hover:-translate-y-1" style={{padding: '24px'}}>
                <span className="text-4xl font-bold font-mono text-[var(--accent-cyan)] block">
                  <AnimatedCounter end={2} suffix="+" duration={1500} />
                </span>
                <span className="text-[var(--text-secondary)] text-sm block" style={{marginTop: '8px'}}>Years Experience</span>
              </div>
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg text-center hover:border-[var(--accent-cyan)] transition-all duration-300 hover:-translate-y-1" style={{padding: '24px'}}>
                <span className="text-4xl font-bold font-mono text-[var(--accent-cyan)] block">
                  <AnimatedCounter end={10} suffix="+" duration={1500} />
                </span>
                <span className="text-[var(--text-secondary)] text-sm block" style={{marginTop: '8px'}}>Security Projects</span>
              </div>
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg text-center hover:border-[var(--accent-cyan)] transition-all duration-300 hover:-translate-y-1" style={{padding: '24px'}}>
                <span className="text-4xl font-bold font-mono text-[var(--accent-green)] block">MSc</span>
                <span className="text-[var(--text-secondary)] text-sm block" style={{marginTop: '8px'}}>Cybersecurity</span>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Divider */}
      <CyberDivider delay={100} />

      {/* Skills Section */}
      <section id="skills" className="relative z-10 py-24 px-[5%]">
        <div className="w-full flex flex-col items-center">
          {/* Section Header */}
          <ScrollAnimation>
            <div className="text-center" style={{marginBottom: '64px'}}>
              <span className="font-mono text-sm text-[var(--accent-green)]">// skills</span>
              <h2 className="text-4xl font-bold text-[var(--text-primary)]" style={{marginTop: '8px'}}><GlitchText>Tech Arsenal</GlitchText></h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-green)] mx-auto rounded" style={{marginTop: '16px'}}></div>
            </div>
          </ScrollAnimation>

          {/* Skills Grid */}
          <ScrollAnimation delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full max-w-6xl" style={{gap: '32px'}}>

            {/* Networking */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg hover:border-[var(--accent-cyan)] transition-all duration-300" style={{padding: '24px'}}>
              <div className="text-3xl" style={{marginBottom: '16px'}}>🌐</div>
              <h3 className="text-xl font-mono text-[var(--accent-cyan)]" style={{marginBottom: '16px'}}>Networking</h3>
              <ul className="text-[var(--text-secondary)] text-sm" style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <li className="flex items-center gap-2"><span className="text-[var(--accent-green)]">&gt;</span> Cisco Routers & Switches</li>
                <li className="flex items-center gap-2"><span className="text-[var(--accent-green)]">&gt;</span> VLANs & VPNs</li>
                <li className="flex items-center gap-2"><span className="text-[var(--accent-green)]">&gt;</span> BGP & OSPF</li>
                <li className="flex items-center gap-2"><span className="text-[var(--accent-green)]">&gt;</span> Firewalls & IDS/IPS</li>
                <li className="flex items-center gap-2"><span className="text-[var(--accent-green)]">&gt;</span> TCP/IP & DNS</li>
              </ul>
            </div>

            {/* Security */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg hover:border-[var(--accent-cyan)] transition-all duration-300" style={{padding: '24px'}}>
              <div className="text-3xl" style={{marginBottom: '16px'}}>🔐</div>
              <h3 className="text-xl font-mono text-[var(--accent-cyan)]" style={{marginBottom: '16px'}}>Security</h3>
              <ul className="text-[var(--text-secondary)] text-sm" style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <li className="flex items-center gap-2"><span className="text-[var(--accent-green)]">&gt;</span> Penetration Testing</li>
                <li className="flex items-center gap-2"><span className="text-[var(--accent-green)]">&gt;</span> Vulnerability Assessment</li>
                <li className="flex items-center gap-2"><span className="text-[var(--accent-green)]">&gt;</span> Nmap & Burp Suite</li>
                <li className="flex items-center gap-2"><span className="text-[var(--accent-green)]">&gt;</span> Wireshark & Metasploit</li>
                <li className="flex items-center gap-2"><span className="text-[var(--accent-green)]">&gt;</span> OWASP Top 10</li>
              </ul>
            </div>

            {/* Cloud */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg hover:border-[var(--accent-cyan)] transition-all duration-300" style={{padding: '24px'}}>
              <div className="text-3xl" style={{marginBottom: '16px'}}>☁️</div>
              <h3 className="text-xl font-mono text-[var(--accent-cyan)]" style={{marginBottom: '16px'}}>Cloud</h3>
              <ul className="text-[var(--text-secondary)] text-sm" style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <li className="flex items-center gap-2"><span className="text-[var(--accent-green)]">&gt;</span> AWS EC2 & S3</li>
                <li className="flex items-center gap-2"><span className="text-[var(--accent-green)]">&gt;</span> AWS VPC & IAM</li>
                <li className="flex items-center gap-2"><span className="text-[var(--accent-green)]">&gt;</span> Cloud Security</li>
                <li className="flex items-center gap-2"><span className="text-[var(--accent-green)]">&gt;</span> Infrastructure as Code</li>
                <li className="flex items-center gap-2"><span className="text-[var(--accent-green)]">&gt;</span> Docker</li>
              </ul>
            </div>

            {/* Development */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg hover:border-[var(--accent-cyan)] transition-all duration-300" style={{padding: '24px'}}>
              <div className="text-3xl" style={{marginBottom: '16px'}}>💻</div>
              <h3 className="text-xl font-mono text-[var(--accent-cyan)]" style={{marginBottom: '16px'}}>Development</h3>
              <ul className="text-[var(--text-secondary)] text-sm" style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <li className="flex items-center gap-2"><span className="text-[var(--accent-green)]">&gt;</span> Python</li>
                <li className="flex items-center gap-2"><span className="text-[var(--accent-green)]">&gt;</span> Java</li>
                <li className="flex items-center gap-2"><span className="text-[var(--accent-green)]">&gt;</span> Linux & Shell Scripting</li>
                <li className="flex items-center gap-2"><span className="text-[var(--accent-green)]">&gt;</span> SQL</li>
                <li className="flex items-center gap-2"><span className="text-[var(--accent-green)]">&gt;</span> Git</li>
              </ul>
            </div>
            </div>
          </ScrollAnimation>

          {/* Skill Progress Bars */}
          <ScrollAnimation delay={150}>
            <div className="w-full max-w-4xl" style={{marginTop: '64px'}}>
              <h3 className="text-center font-mono text-[var(--text-secondary)]" style={{marginBottom: '32px'}}>// proficiency_levels</h3>
              <div className="grid grid-cols-1 md:grid-cols-2" style={{gap: '24px 48px'}}>
                <div>
                  <SkillBar name="Network Security" percentage={95} delay={0} color="cyan" />
                  <SkillBar name="Penetration Testing" percentage={88} delay={100} color="green" />
                  <SkillBar name="Cloud Security (AWS)" percentage={85} delay={200} color="cyan" />
                  <SkillBar name="Vulnerability Assessment" percentage={90} delay={300} color="green" />
                </div>
                <div>
                  <SkillBar name="Python" percentage={82} delay={50} color="green" />
                  <SkillBar name="Linux Administration" percentage={92} delay={150} color="cyan" />
                  <SkillBar name="Cisco Networking" percentage={94} delay={250} color="green" />
                  <SkillBar name="Incident Response" percentage={80} delay={350} color="cyan" />
                </div>
              </div>
            </div>
          </ScrollAnimation>

          {/* Tools Bar */}
          <ScrollAnimation delay={200}>
            <div className="w-full max-w-4xl" style={{marginTop: '64px'}}>
              <h3 className="text-center font-mono text-[var(--text-secondary)]" style={{marginBottom: '24px'}}>// tools_i_use</h3>
              <div className="flex flex-wrap justify-center" style={{gap: '12px'}}>
                {['Nmap', 'Burp Suite', 'Wireshark', 'Metasploit', 'Nikto', 'Nessus', 'AWS', 'Cisco Packet Tracer', 'GNS3', 'Kali Linux', 'Docker', 'Git'].map((tool) => (
                  <span key={tool} className="bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded font-mono text-sm text-[var(--text-secondary)] hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)] transition-all duration-300" style={{padding: '8px 16px'}}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Divider */}
      <CyberDivider delay={100} />

      {/* Certifications Section */}
      <section id="certifications" className="relative z-10 py-24 px-[5%] bg-[var(--bg-secondary)]/50">
        <div className="w-full flex flex-col items-center">
          {/* Section Header */}
          <ScrollAnimation>
            <div className="text-center" style={{marginBottom: '64px'}}>
              <span className="font-mono text-sm text-[var(--accent-green)]">// certifications</span>
              <h2 className="text-4xl font-bold text-[var(--text-primary)]" style={{marginTop: '8px'}}><GlitchText>Credentials</GlitchText></h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-green)] mx-auto rounded" style={{marginTop: '16px'}}></div>
            </div>
          </ScrollAnimation>

          {/* Certs Grid */}
          <ScrollAnimation delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl" style={{gap: '24px'}}>

            {/* CCNP */}
            <TiltCard className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg hover:border-[var(--accent-cyan)] transition-colors duration-300" style={{padding: '24px'}}>
              <div className="text-3xl" style={{marginBottom: '16px'}}>🏆</div>
              <h3 className="text-lg font-semibold text-[var(--accent-cyan)]" style={{marginBottom: '8px'}}>CCNP</h3>
              <p className="text-[var(--text-secondary)] text-sm" style={{marginBottom: '8px'}}>Cisco Certified Network Professional</p>
              <span className="text-[var(--accent-green)] font-mono text-xs">Cisco</span>
            </TiltCard>

            {/* CCNA */}
            <TiltCard className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg hover:border-[var(--accent-cyan)] transition-colors duration-300" style={{padding: '24px'}}>
              <div className="text-3xl" style={{marginBottom: '16px'}}>🏆</div>
              <h3 className="text-lg font-semibold text-[var(--accent-cyan)]" style={{marginBottom: '8px'}}>CCNA</h3>
              <p className="text-[var(--text-secondary)] text-sm" style={{marginBottom: '8px'}}>Cisco Certified Network Associate</p>
              <span className="text-[var(--accent-green)] font-mono text-xs">Cisco</span>
            </TiltCard>

            {/* AWS */}
            <TiltCard className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg hover:border-[var(--accent-cyan)] transition-colors duration-300" style={{padding: '24px'}}>
              <div className="text-3xl" style={{marginBottom: '16px'}}>☁️</div>
              <h3 className="text-lg font-semibold text-[var(--accent-cyan)]" style={{marginBottom: '8px'}}>AWS Solutions Architect</h3>
              <p className="text-[var(--text-secondary)] text-sm" style={{marginBottom: '8px'}}>Associate Level Certification</p>
              <span className="text-[var(--accent-green)] font-mono text-xs">Amazon Web Services</span>
            </TiltCard>

            {/* RHCE */}
            <TiltCard className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg hover:border-[var(--accent-cyan)] transition-colors duration-300" style={{padding: '24px'}}>
              <div className="text-3xl" style={{marginBottom: '16px'}}>🐧</div>
              <h3 className="text-lg font-semibold text-[var(--accent-cyan)]" style={{marginBottom: '8px'}}>RHCE</h3>
              <p className="text-[var(--text-secondary)] text-sm" style={{marginBottom: '8px'}}>Red Hat Certified Engineer</p>
              <span className="text-[var(--accent-green)] font-mono text-xs">Red Hat</span>
            </TiltCard>

            {/* Cyber Security Training */}
            <TiltCard className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg hover:border-[var(--accent-cyan)] transition-colors duration-300" style={{padding: '24px'}}>
              <div className="text-3xl" style={{marginBottom: '16px'}}>🔐</div>
              <h3 className="text-lg font-semibold text-[var(--accent-cyan)]" style={{marginBottom: '8px'}}>Cyber Security Training</h3>
              <p className="text-[var(--text-secondary)] text-sm" style={{marginBottom: '8px'}}>Professional Security Training Program</p>
              <span className="text-[var(--accent-green)] font-mono text-xs">UST Global</span>
            </TiltCard>

            {/* Master's Degree */}
            <TiltCard className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg hover:border-[var(--accent-cyan)] transition-colors duration-300" style={{padding: '24px'}}>
              <div className="text-3xl" style={{marginBottom: '16px'}}>🎓</div>
              <h3 className="text-lg font-semibold text-[var(--accent-cyan)]" style={{marginBottom: '8px'}}>Master of Cybersecurity</h3>
              <p className="text-[var(--text-secondary)] text-sm" style={{marginBottom: '8px'}}>Graduated December 2025</p>
              <span className="text-[var(--accent-green)] font-mono text-xs">Monash University</span>
            </TiltCard>

            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Divider */}
      <CyberDivider delay={100} />

      {/* Projects Section */}
      <section id="projects" className="relative z-10 py-24 px-[5%]">
        <div className="w-full flex flex-col items-center">
          {/* Section Header */}
          <ScrollAnimation>
            <div className="text-center" style={{marginBottom: '64px'}}>
              <span className="font-mono text-sm text-[var(--accent-green)]">// projects</span>
              <h2 className="text-4xl font-bold text-[var(--text-primary)]" style={{marginTop: '8px'}}><GlitchText>Security Projects</GlitchText></h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-green)] mx-auto mt-4 rounded"></div>
            </div>
          </ScrollAnimation>

          {/* Projects Grid */}
          <ScrollAnimation delay={100}>
            <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl" style={{gap: '32px'}}>

            {/* Project 1 - Senior Lifelong Learning Platform */}
            <TiltCard className="card-glow bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg overflow-hidden hover:border-[var(--accent-cyan)] transition-colors duration-300">
              <div className="h-32 bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-secondary)] flex items-center justify-center">
                <span className="text-5xl">🌐</span>
              </div>
              <div style={{padding: '24px'}}>
                <div className="flex justify-between items-start" style={{marginBottom: '8px'}}>
                  <h3 className="text-lg font-semibold text-[var(--accent-cyan)]">Senior Lifelong Learning Platform</h3>
                  <span className="text-xs font-mono text-[var(--accent-green)]">2024-2025</span>
                </div>
                <p className="text-[var(--text-muted)] text-xs" style={{marginBottom: '12px'}}>Graduate Researcher - Monash University</p>
                <p className="text-[var(--text-secondary)] text-sm" style={{marginBottom: '16px'}}>Developed a web platform for older Australians (60+) with digital literacy guides and health resources. Conducted comprehensive security assessment addressing SQL Injection, XSS, CSRF, and API security using OWASP ZAP, Nikto, and Nmap.</p>
                <div className="flex flex-wrap" style={{gap: '8px'}}>
                  <span className="text-xs font-mono bg-[var(--bg-tertiary)] rounded text-[var(--accent-green)]" style={{padding: '4px 8px'}}>OWASP ZAP</span>
                  <span className="text-xs font-mono bg-[var(--bg-tertiary)] rounded text-[var(--accent-green)]" style={{padding: '4px 8px'}}>Nikto</span>
                  <span className="text-xs font-mono bg-[var(--bg-tertiary)] rounded text-[var(--accent-green)]" style={{padding: '4px 8px'}}>Nmap</span>
                  <span className="text-xs font-mono bg-[var(--bg-tertiary)] rounded text-[var(--accent-green)]" style={{padding: '4px 8px'}}>TLS/SSL</span>
                </div>
              </div>
            </TiltCard>

            {/* Project 2 - Indoor Positioning System */}
            <TiltCard className="card-glow bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg overflow-hidden hover:border-[var(--accent-cyan)] transition-colors duration-300">
              <div className="h-32 bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-secondary)] flex items-center justify-center">
                <span className="text-5xl">📍</span>
              </div>
              <div style={{padding: '24px'}}>
                <div className="flex justify-between items-start" style={{marginBottom: '8px'}}>
                  <h3 className="text-lg font-semibold text-[var(--accent-cyan)]">Indoor Positioning System</h3>
                  <span className="text-xs font-mono text-[var(--accent-green)]">2022-2023</span>
                </div>
                <p className="text-[var(--text-muted)] text-xs" style={{marginBottom: '12px'}}>Undergraduate Researcher - Karunya Institute</p>
                <p className="text-[var(--text-secondary)] text-sm" style={{marginBottom: '16px'}}>Built Android app using BLE beacons for GPS-denied environments. Implemented Kalman filter for signal smoothing, trilateration algorithm for location calculation, and Dijkstra&apos;s algorithm for optimal navigation routes. Co-authored IEEE research paper.</p>
                <div className="flex flex-wrap" style={{gap: '8px'}}>
                  <span className="text-xs font-mono bg-[var(--bg-tertiary)] rounded text-[var(--accent-green)]" style={{padding: '4px 8px'}}>Android</span>
                  <span className="text-xs font-mono bg-[var(--bg-tertiary)] rounded text-[var(--accent-green)]" style={{padding: '4px 8px'}}>BLE</span>
                  <span className="text-xs font-mono bg-[var(--bg-tertiary)] rounded text-[var(--accent-green)]" style={{padding: '4px 8px'}}>Java</span>
                  <span className="text-xs font-mono bg-[var(--bg-tertiary)] rounded text-[var(--accent-green)]" style={{padding: '4px 8px'}}>IEEE</span>
                </div>
              </div>
            </TiltCard>

            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Divider */}
      <CyberDivider delay={100} />

      {/* Experience & Education Section */}
      <section id="experience" className="relative z-10 py-24 px-[5%] bg-[var(--bg-secondary)]/50">
        <div className="w-full flex flex-col items-center">
          {/* Section Header */}
          <ScrollAnimation>
            <div className="text-center" style={{marginBottom: '64px'}}>
              <span className="font-mono text-sm text-[var(--accent-green)]">// experience</span>
              <h2 className="text-4xl font-bold text-[var(--text-primary)]" style={{marginTop: '8px'}}><GlitchText>Journey</GlitchText></h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-green)] mx-auto rounded" style={{marginTop: '16px'}}></div>
            </div>
          </ScrollAnimation>

          {/* Timeline */}
          <ScrollAnimation delay={100}>
            <div className="w-full max-w-4xl relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-[var(--border-color)]" style={{transform: 'translateX(-50%)'}}></div>

            {/* Timeline Items */}
            <div className="flex flex-col" style={{gap: '48px'}}>

              {/* Master's Degree */}
              <div className="relative flex flex-col md:flex-row md:justify-between items-start" style={{paddingLeft: '32px', paddingRight: '0'}}>
                <div className="md:w-[45%] md:text-right md:order-1 order-2" style={{paddingRight: '32px'}}>
                  <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg hover:border-[var(--accent-cyan)] transition-all duration-300" style={{padding: '24px'}}>
                    <span className="text-[var(--accent-green)] font-mono text-xs">Feb 2024 - Dec 2025</span>
                    <h3 className="text-lg font-semibold text-[var(--accent-cyan)]" style={{marginTop: '8px'}}>Master of Information Technology</h3>
                    <p className="text-[var(--text-secondary)] text-sm" style={{marginTop: '4px'}}>Monash University, Melbourne (Cybersecurity Major)</p>
                    <p className="text-[var(--text-muted)] text-sm" style={{marginTop: '12px'}}>Network Security, Penetration Testing, Security Assessment, Cloud Security, Secure Software Development.</p>
                  </div>
                </div>
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-[var(--accent-cyan)] rounded-full border-4 border-[var(--bg-primary)]" style={{transform: 'translateX(-50%)', top: '24px'}}></div>
                <div className="md:w-[45%] md:order-2 order-1"></div>
              </div>

              {/* Network Engineer */}
              <div className="relative flex flex-col md:flex-row md:justify-between items-start" style={{paddingLeft: '32px', paddingRight: '0'}}>
                <div className="md:w-[45%] md:order-2" style={{paddingLeft: '32px'}}>
                  <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg hover:border-[var(--accent-cyan)] transition-all duration-300" style={{padding: '24px'}}>
                    <span className="text-[var(--accent-green)] font-mono text-xs">Jul 2023 - Dec 2023</span>
                    <h3 className="text-lg font-semibold text-[var(--accent-cyan)]" style={{marginTop: '8px'}}>Network Engineer</h3>
                    <p className="text-[var(--text-secondary)] text-sm" style={{marginTop: '4px'}}>Soften Technologies, India</p>
                    <p className="text-[var(--text-muted)] text-sm" style={{marginTop: '12px'}}>Installed and maintained network hardware including switches, routers, and firewalls. Monitored performance and ensured network security through access control and firewall configuration.</p>
                  </div>
                </div>
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-[var(--accent-green)] rounded-full border-4 border-[var(--bg-primary)]" style={{transform: 'translateX(-50%)', top: '24px'}}></div>
                <div className="md:w-[45%] md:text-right md:order-1"></div>
              </div>

              {/* Bachelor's Degree */}
              <div className="relative flex flex-col md:flex-row md:justify-between items-start" style={{paddingLeft: '32px', paddingRight: '0'}}>
                <div className="md:w-[45%] md:text-right md:order-1" style={{paddingRight: '32px'}}>
                  <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg hover:border-[var(--accent-cyan)] transition-all duration-300" style={{padding: '24px'}}>
                    <span className="text-[var(--accent-green)] font-mono text-xs">Jun 2019 - May 2023</span>
                    <h3 className="text-lg font-semibold text-[var(--accent-cyan)]" style={{marginTop: '8px'}}>Bachelor of Technology</h3>
                    <p className="text-[var(--text-secondary)] text-sm" style={{marginTop: '4px'}}>Karunya Institute of Technology, Coimbatore</p>
                    <p className="text-[var(--text-muted)] text-sm" style={{marginTop: '12px'}}>Computer Science & Engineering. Courses in Data Structures, Algorithms, Database Management, Computer Networks, and Mobile App Development.</p>
                  </div>
                </div>
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-[var(--accent-cyan)] rounded-full border-4 border-[var(--bg-primary)]" style={{transform: 'translateX(-50%)', top: '24px'}}></div>
                <div className="md:w-[45%] md:order-2"></div>
              </div>

            </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      {/* Divider */}
      <CyberDivider delay={100} />

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-24 px-[5%]">
        <div className="w-full flex flex-col items-center">
          {/* Section Header */}
          <ScrollAnimation>
            <div className="text-center" style={{marginBottom: '64px'}}>
              <span className="font-mono text-sm text-[var(--accent-green)]">// contact</span>
              <h2 className="text-4xl font-bold text-[var(--text-primary)]" style={{marginTop: '8px'}}><GlitchText>Get In Touch</GlitchText></h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-green)] mx-auto rounded" style={{marginTop: '16px'}}></div>
            </div>
          </ScrollAnimation>

          {/* Contact Content */}
          <ScrollAnimation delay={100}>
            <div className="w-full max-w-4xl">
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-lg" style={{padding: '48px'}}>

              {/* Terminal Style Header */}
              <div className="font-mono text-[var(--accent-cyan)]" style={{marginBottom: '32px'}}>
                <span className="text-[var(--accent-green)]">$ </span>
                <span>./initiate_contact.sh</span>
              </div>

              <p className="text-[var(--text-secondary)] text-center max-w-2xl mx-auto" style={{marginBottom: '40px'}}>
                I&apos;m currently looking for opportunities in <span className="text-[var(--accent-cyan)]">cybersecurity</span> and
                <span className="text-[var(--accent-cyan)]"> network engineering</span> roles in Australia.
                Whether you have a question or just want to say hi, feel free to reach out!
              </p>

              {/* Contact Links */}
              <div className="flex flex-wrap justify-center" style={{gap: '24px'}}>

                {/* Email */}
                <MagneticButton
                  href="mailto:jeffint69@gmail.com"
                  className="flex items-center bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg hover:border-[var(--accent-cyan)] transition-all duration-300"
                  style={{padding: '16px 24px', gap: '12px'}}
                  strength={0.3}
                >
                  <span className="text-2xl">📧</span>
                  <div>
                    <p className="text-[var(--text-muted)] text-xs font-mono">Email</p>
                    <p className="text-[var(--accent-cyan)]">jeffint69@gmail.com</p>
                  </div>
                </MagneticButton>

                {/* Phone */}
                <MagneticButton
                  href="tel:+61432009364"
                  className="flex items-center bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg hover:border-[var(--accent-cyan)] transition-all duration-300"
                  style={{padding: '16px 24px', gap: '12px'}}
                  strength={0.3}
                >
                  <span className="text-2xl">📱</span>
                  <div>
                    <p className="text-[var(--text-muted)] text-xs font-mono">Phone</p>
                    <p className="text-[var(--accent-cyan)]">+61 432 009 364</p>
                  </div>
                </MagneticButton>

                {/* LinkedIn */}
                <MagneticButton
                  href="https://www.linkedin.com/in/jeffin-thomas-69a2a0348/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg hover:border-[var(--accent-cyan)] transition-all duration-300"
                  style={{padding: '16px 24px', gap: '12px'}}
                  strength={0.3}
                >
                  <span className="text-2xl">💼</span>
                  <div>
                    <p className="text-[var(--text-muted)] text-xs font-mono">LinkedIn</p>
                    <p className="text-[var(--accent-cyan)]">Connect on LinkedIn</p>
                  </div>
                </MagneticButton>

                {/* Location */}
                <div className="flex items-center bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg" style={{padding: '16px 24px', gap: '12px'}}>
                  <span className="text-2xl">📍</span>
                  <div>
                    <p className="text-[var(--text-muted)] text-xs font-mono">Location</p>
                    <p className="text-[var(--accent-green)]">Melbourne, Australia</p>
                  </div>
                </div>

              </div>

              {/* Download Resume Button */}
              <div className="text-center" style={{marginTop: '40px'}}>
                <MagneticButton
                  href="/Jeffin_Thomas_Resume.pdf"
                  download
                  className="inline-flex items-center font-mono text-sm bg-[var(--accent-green)] text-[var(--bg-primary)] rounded hover:bg-[var(--accent-cyan)] transition-colors"
                  style={{padding: '12px 24px', gap: '8px'}}
                  strength={0.4}
                >
                  <span>📄</span>
                  <span>Download Resume</span>
                </MagneticButton>
              </div>

              {/* Terminal Style Footer */}
              <div className="font-mono text-center" style={{marginTop: '32px'}}>
                <span className="text-[var(--text-muted)]">// </span>
                <span className="text-[var(--accent-green)]">Looking forward to connecting with you!</span>
              </div>

            </div>
            </div>
          </ScrollAnimation>

          {/* Footer */}
          <div className="text-center font-mono text-[var(--text-muted)] text-sm" style={{marginTop: '64px'}}>
            <p>&copy; 2025 Jeffin Thomas. Built with Next.js</p>
            <p style={{marginTop: '8px'}}>
              <span className="text-[var(--accent-green)]">&lt;/&gt;</span> with <span className="text-[var(--accent-red)]">❤</span> in Melbourne
            </p>
          </div>

        </div>
      </section>

      <BackToTop />
    </main>
  );
}
