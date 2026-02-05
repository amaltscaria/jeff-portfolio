'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  type: 'user' | 'bot' | 'system';
  text: string;
}

// Knowledge base about Jeffin
const KNOWLEDGE = {
  name: 'Jeffin Thomas Valliyakalayil',
  title: 'Cybersecurity Professional & Network Engineer',
  location: 'Melbourne, Australia',
  email: 'jeffint69@gmail.com',
  phone: '+61 432 009 364',
  linkedin: 'linkedin.com/in/jeffin-thomas-69a2a0348',

  education: [
    { degree: 'Master of Information Technology (Cybersecurity)', school: 'Monash University', year: '2024-2025', location: 'Melbourne' },
    { degree: 'Bachelor of Technology (Computer Science)', school: 'Karunya Institute of Technology', year: '2019-2023', location: 'Coimbatore, India' }
  ],

  experience: [
    { role: 'Network Engineer', company: 'Soften Technologies', period: 'Jul 2023 - Dec 2023', description: 'Installed and maintained network hardware including switches, routers, and firewalls. Monitored performance and ensured network security.' },
    { role: 'Intern', company: 'Bensoft Systems', period: 'Jun 2022 - Jul 2022', description: 'Completed internship focusing on computer systems and IT infrastructure.' }
  ],

  certifications: ['CCNP', 'CCNA', 'AWS Solutions Architect', 'RHCE (Red Hat Certified Engineer)', 'Cyber Security Training (UST Global)', 'Blockchain LFS170x (Linux Foundation)'],

  skills: {
    networking: ['Cisco Routers & Switches', 'VLANs & VPNs', 'BGP & OSPF', 'Firewalls & IDS/IPS', 'TCP/IP & DNS'],
    security: ['Penetration Testing', 'Vulnerability Assessment', 'Nmap', 'Burp Suite', 'Wireshark', 'Metasploit', 'OWASP Top 10'],
    advanced_security: ['Social Engineering', 'Zero Trust Architecture', 'Endpoint Security', 'Identity & Access Management', 'Malware Analysis'],
    cloud: ['AWS EC2 & S3', 'AWS VPC & IAM', 'Cloud Security', 'Infrastructure as Code', 'Docker'],
    development: ['Python', 'Java', 'Linux & Shell Scripting', 'SQL', 'Git']
  },

  tools: ['Nmap', 'Burp Suite', 'Wireshark', 'Metasploit', 'Nikto', 'Nessus', 'AWS', 'Cisco Packet Tracer', 'GNS3', 'Kali Linux', 'Docker', 'Git'],

  interests: ['Cybersecurity', 'Network Security', 'Penetration Testing', 'Cloud Security', 'Ethical Hacking'],

  availability: 'Currently looking for opportunities in cybersecurity and network engineering roles in Australia.'
};

// Response patterns
function generateResponse(input: string): string {
  const q = input.toLowerCase().trim();

  // Greetings
  if (q.match(/^(hi|hello|hey|greetings|howdy)/)) {
    return `Hello! I'm Jeffin's AI assistant. Ask me anything about his skills, experience, or certifications. Try: "What are his skills?" or "Tell me about his experience"`;
  }

  // Name
  if (q.match(/who (is|are you)|your name|about (you|jeffin)/)) {
    return `I represent ${KNOWLEDGE.name}, a ${KNOWLEDGE.title} based in ${KNOWLEDGE.location}. He holds a Master's in Cybersecurity from Monash University and has expertise in network security, penetration testing, and cloud security.`;
  }

  // Contact
  if (q.match(/contact|email|phone|reach|hire|linkedin/)) {
    return `You can reach Jeffin at:\n📧 Email: ${KNOWLEDGE.email}\n📱 Phone: ${KNOWLEDGE.phone}\n💼 LinkedIn: ${KNOWLEDGE.linkedin}\n📍 Location: ${KNOWLEDGE.location}\n\n${KNOWLEDGE.availability}`;
  }

  // Education
  if (q.match(/education|study|degree|university|college|school|qualification/)) {
    let response = "Jeffin's Education:\n\n";
    KNOWLEDGE.education.forEach(edu => {
      response += `🎓 ${edu.degree}\n   ${edu.school}, ${edu.location} (${edu.year})\n\n`;
    });
    return response.trim();
  }

  // Experience
  if (q.match(/experience|work|job|career|employment|history/)) {
    let response = "Jeffin's Professional Experience:\n\n";
    KNOWLEDGE.experience.forEach(exp => {
      response += `💼 ${exp.role} @ ${exp.company}\n   ${exp.period}\n   ${exp.description}\n\n`;
    });
    return response.trim();
  }

  // Certifications
  if (q.match(/certification|certified|certificate|credential/)) {
    return `Jeffin's Certifications:\n\n${KNOWLEDGE.certifications.map(c => `🏆 ${c}`).join('\n')}`;
  }

  // Skills - general
  if (q.match(/skill|ability|capable|can (he|you) do|what (do|does) (he|you) know/)) {
    return `Jeffin's Key Skills:\n\n🌐 Networking: ${KNOWLEDGE.skills.networking.slice(0, 3).join(', ')}\n🔐 Security: ${KNOWLEDGE.skills.security.slice(0, 3).join(', ')}\n🛡️ Advanced Security: ${KNOWLEDGE.skills.advanced_security.slice(0, 3).join(', ')}\n☁️ Cloud: ${KNOWLEDGE.skills.cloud.slice(0, 3).join(', ')}\n💻 Development: ${KNOWLEDGE.skills.development.join(', ')}\n\nAsk about specific areas for more details!`;
  }

  // Networking skills
  if (q.match(/network/)) {
    return `Jeffin's Networking Skills:\n\n${KNOWLEDGE.skills.networking.map(s => `• ${s}`).join('\n')}\n\nHe holds CCNP and CCNA certifications from Cisco.`;
  }

  // Security skills
  if (q.match(/security|pentest|penetration|hack|vulnerability/)) {
    return `Jeffin's Security Skills:\n\n${KNOWLEDGE.skills.security.map(s => `• ${s}`).join('\n')}\n\nAdvanced Security:\n${KNOWLEDGE.skills.advanced_security.map(s => `• ${s}`).join('\n')}`;
  }

  // Cloud skills
  if (q.match(/cloud|aws|amazon/)) {
    return `Jeffin's Cloud Skills:\n\n${KNOWLEDGE.skills.cloud.map(s => `• ${s}`).join('\n')}\n\nHe is an AWS Certified Solutions Architect.`;
  }

  // Tools
  if (q.match(/tool|software|program|use|work with/)) {
    return `Tools Jeffin Works With:\n\n${KNOWLEDGE.tools.map(t => `🔧 ${t}`).join('\n')}`;
  }

  // Python/Programming
  if (q.match(/python|java|code|programming|develop/)) {
    return `Jeffin's Development Skills:\n\n${KNOWLEDGE.skills.development.map(s => `💻 ${s}`).join('\n')}\n\nHe uses programming primarily for security automation, scripting, and tool development.`;
  }

  // Location
  if (q.match(/where|location|based|live|city|country/)) {
    return `Jeffin is based in ${KNOWLEDGE.location}. He completed his Master's at Monash University and is currently seeking opportunities in the cybersecurity field in Australia.`;
  }

  // Availability / Hiring
  if (q.match(/available|hire|hiring|looking|job|opportunity|open to/)) {
    return `${KNOWLEDGE.availability}\n\nContact: ${KNOWLEDGE.email}`;
  }

  // Help
  if (q.match(/help|what can|how to|commands/)) {
    return `I can answer questions about Jeffin like:\n\n• "What are his skills?"\n• "Tell me about his experience"\n• "What certifications does he have?"\n• "What tools does he use?"\n• "How can I contact him?"\n• "What's his education?"\n• "Is he available for hire?"`;
  }

  // Thank you
  if (q.match(/thank|thanks|thx/)) {
    return `You're welcome! Feel free to ask more questions about Jeffin, or reach out to him directly at ${KNOWLEDGE.email}`;
  }

  // Bye
  if (q.match(/bye|goodbye|exit|quit/)) {
    return `Goodbye! Thanks for learning about Jeffin. Don't hesitate to reach out at ${KNOWLEDGE.email} 👋`;
  }

  // Default response
  return `I'm not sure about that. Try asking about:\n• Skills & expertise\n• Work experience\n• Certifications\n• Education\n• Contact info\n• Tools he uses\n\nOr type "help" for more options.`;
}

export default function AITerminalChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { type: 'system', text: 'JEFFIN.AI v1.0 - Interactive Portfolio Assistant' },
    { type: 'bot', text: 'Hello! I\'m Jeffin\'s AI assistant. Ask me anything about his skills, experience, or certifications.\n\nType "help" for suggestions.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = generateResponse(userMessage);
      setMessages(prev => [...prev, { type: 'bot', text: response }]);
      setIsTyping(false);
    }, 500 + Math.random() * 500);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(true)}
        title="AI Assistant"
        style={{
          position: 'fixed',
          bottom: '160px',
          right: '24px',
          zIndex: 50,
          width: '48px',
          height: '48px',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--accent-cyan)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          fontSize: '20px',
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--accent-cyan)';
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--bg-card)';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        🤖
      </button>

      {/* Chat Modal */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: '140px',
            right: '24px',
            zIndex: 100,
            width: '400px',
            maxWidth: 'calc(100vw - 48px)',
            height: '400px',
            maxHeight: 'calc(100vh - 180px)',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--accent-cyan)',
            borderRadius: '8px',
            overflow: 'hidden',
            boxShadow: '0 0 30px rgba(0, 255, 255, 0.2)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Terminal Header */}
          <div
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              padding: '12px 16px',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27ca40' }}></div>
              </div>
              <span style={{
                fontFamily: 'monospace',
                fontSize: '12px',
                color: 'var(--text-muted)',
                marginLeft: '8px'
              }}>
                jeffin-ai@portfolio:~
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                color: 'var(--text-muted)',
                fontSize: '20px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                lineHeight: 1
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              ×
            </button>
          </div>

          {/* Messages Area */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  lineHeight: '1.5',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}
              >
                {msg.type === 'system' && (
                  <div style={{ color: 'var(--accent-green)', textAlign: 'center', padding: '8px 0' }}>
                    {'═'.repeat(20)}<br/>
                    {msg.text}<br/>
                    {'═'.repeat(20)}
                  </div>
                )}
                {msg.type === 'user' && (
                  <div>
                    <span style={{ color: 'var(--accent-green)' }}>guest@portfolio:~$ </span>
                    <span style={{ color: 'var(--text-primary)' }}>{msg.text}</span>
                  </div>
                )}
                {msg.type === 'bot' && (
                  <div style={{
                    color: 'var(--text-secondary)',
                    backgroundColor: 'var(--bg-card)',
                    padding: '12px',
                    borderRadius: '4px',
                    borderLeft: '3px solid var(--accent-cyan)'
                  }}>
                    {msg.text}
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div style={{
                fontFamily: 'monospace',
                fontSize: '13px',
                color: 'var(--accent-cyan)'
              }}>
                <span className="typing-dots">Processing</span>
                <style jsx>{`
                  .typing-dots::after {
                    content: '';
                    animation: dots 1.5s infinite;
                  }
                  @keyframes dots {
                    0%, 20% { content: '.'; }
                    40% { content: '..'; }
                    60%, 100% { content: '...'; }
                  }
                `}</style>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div
            style={{
              padding: '12px 16px',
              borderTop: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-tertiary)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontFamily: 'monospace',
                fontSize: '13px',
                color: 'var(--accent-green)'
              }}>
                $
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Ask about Jeffin..."
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  border: 'none',
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  color: 'var(--text-primary)',
                  outline: 'none'
                }}
              />
              <button
                onClick={handleSubmit}
                style={{
                  backgroundColor: 'var(--accent-cyan)',
                  color: 'var(--bg-primary)',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '6px 12px',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  cursor: 'pointer',
                  transition: 'opacity 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
