'use client';

import { useState, useEffect, useCallback } from 'react';

interface Packet {
  id: number;
  type: 'TCP' | 'UDP' | 'HTTP' | 'HTTPS' | 'DNS' | 'ICMP';
  source: string;
  destination: string;
  size: number;
  status: 'transit' | 'delivered' | 'blocked' | 'dropped';
  progress: number;
  path: number; // 0-2 for different paths
}

const PACKET_TYPES = {
  TCP: { color: '#00ff88', icon: '📦', description: 'Transmission Control Protocol' },
  UDP: { color: '#ffcc00', icon: '⚡', description: 'User Datagram Protocol' },
  HTTP: { color: '#00ccff', icon: '🌐', description: 'Hypertext Transfer Protocol' },
  HTTPS: { color: '#00ff00', icon: '🔒', description: 'Secure HTTP' },
  DNS: { color: '#ff66ff', icon: '📍', description: 'Domain Name System' },
  ICMP: { color: '#ff8844', icon: '📡', description: 'Internet Control Message' }
};

const NODES = {
  client: { x: 10, y: 50, label: 'Client', icon: '💻' },
  firewall: { x: 35, y: 50, label: 'Firewall', icon: '🛡️' },
  router: { x: 60, y: 50, label: 'Router', icon: '📶' },
  server: { x: 85, y: 50, label: 'Server', icon: '🖥️' }
};

export default function PacketVisualizer() {
  const [packets, setPackets] = useState<Packet[]>([]);
  const [stats, setStats] = useState({
    sent: 0,
    delivered: 0,
    blocked: 0,
    dropped: 0
  });
  const [isPaused, setIsPaused] = useState(false);
  const [firewallRules, setFirewallRules] = useState({
    blockHTTP: false,
    blockICMP: false,
    blockUDP: false
  });

  const generatePacket = useCallback((): Packet => {
    const types: Array<keyof typeof PACKET_TYPES> = ['TCP', 'UDP', 'HTTP', 'HTTPS', 'DNS', 'ICMP'];
    const type = types[Math.floor(Math.random() * types.length)];

    return {
      id: Date.now() + Math.random(),
      type,
      source: '192.168.1.' + Math.floor(Math.random() * 254 + 1),
      destination: '10.0.0.' + Math.floor(Math.random() * 254 + 1),
      size: Math.floor(Math.random() * 1400 + 64),
      status: 'transit',
      progress: 0,
      path: Math.floor(Math.random() * 3)
    };
  }, []);

  useEffect(() => {
    if (isPaused) return;

    // Generate new packets
    const packetInterval = setInterval(() => {
      const newPacket = generatePacket();
      setPackets(prev => [...prev.slice(-20), newPacket]);
      setStats(prev => ({ ...prev, sent: prev.sent + 1 }));
    }, 800);

    // Animate packets
    const animateInterval = setInterval(() => {
      setPackets(prev => prev.map(packet => {
        if (packet.status !== 'transit') return packet;

        const newProgress = packet.progress + 2;

        // Check firewall (at ~35% progress)
        if (newProgress >= 35 && packet.progress < 35) {
          const isBlocked =
            (firewallRules.blockHTTP && packet.type === 'HTTP') ||
            (firewallRules.blockICMP && packet.type === 'ICMP') ||
            (firewallRules.blockUDP && packet.type === 'UDP');

          if (isBlocked) {
            setStats(s => ({ ...s, blocked: s.blocked + 1 }));
            return { ...packet, progress: 35, status: 'blocked' as const };
          }
        }

        // Random drop (5% chance after firewall)
        if (newProgress >= 60 && packet.progress < 60 && Math.random() < 0.05) {
          setStats(s => ({ ...s, dropped: s.dropped + 1 }));
          return { ...packet, progress: 60, status: 'dropped' as const };
        }

        // Delivered
        if (newProgress >= 100) {
          setStats(s => ({ ...s, delivered: s.delivered + 1 }));
          return { ...packet, progress: 100, status: 'delivered' as const };
        }

        return { ...packet, progress: newProgress };
      }).filter(p => {
        // Remove old completed packets
        if (p.status === 'delivered' || p.status === 'blocked' || p.status === 'dropped') {
          return Date.now() - p.id < 2000;
        }
        return true;
      }));
    }, 50);

    return () => {
      clearInterval(packetInterval);
      clearInterval(animateInterval);
    };
  }, [isPaused, generatePacket, firewallRules]);

  const getPacketY = (packet: Packet) => {
    const baseY = 50;
    const offset = (packet.path - 1) * 15;
    return baseY + offset;
  };

  return (
    <section
      id="packet-visualizer"
      style={{
        position: 'relative',
        zIndex: 10,
        padding: '96px 5%',
        backgroundColor: 'rgba(13, 17, 23, 0.5)'
      }}
    >
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '14px', color: 'var(--accent-green)' }}>
            // network_traffic_analysis
          </span>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'var(--text-primary)',
            marginTop: '8px'
          }}>
            Packet Visualizer
          </h2>
          <div style={{
            width: '64px',
            height: '4px',
            background: 'linear-gradient(to right, var(--accent-cyan), var(--accent-green))',
            margin: '16px auto 0',
            borderRadius: '2px'
          }} />
        </div>

        {/* Stats Bar */}
        <div style={{
          display: 'flex',
          gap: '24px',
          marginBottom: '24px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {[
            { label: 'Packets Sent', value: stats.sent, color: 'var(--accent-cyan)' },
            { label: 'Delivered', value: stats.delivered, color: 'var(--accent-green)' },
            { label: 'Blocked', value: stats.blocked, color: 'var(--accent-red)' },
            { label: 'Dropped', value: stats.dropped, color: 'var(--text-muted)' }
          ].map(stat => (
            <div key={stat.label} style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '12px 20px',
              textAlign: 'center',
              minWidth: '100px'
            }}>
              <p style={{ fontFamily: 'monospace', fontSize: '10px', color: 'var(--text-muted)', margin: 0 }}>
                {stat.label.toUpperCase()}
              </p>
              <p style={{
                fontFamily: 'monospace',
                fontSize: '24px',
                fontWeight: 'bold',
                color: stat.color,
                margin: '4px 0 0 0'
              }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Firewall Controls */}
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '24px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <span style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--text-muted)' }}>
            Firewall Rules:
          </span>
          {[
            { key: 'blockHTTP', label: 'Block HTTP' },
            { key: 'blockICMP', label: 'Block ICMP' },
            { key: 'blockUDP', label: 'Block UDP' }
          ].map(rule => (
            <button
              key={rule.key}
              onClick={() => setFirewallRules(prev => ({
                ...prev,
                [rule.key]: !prev[rule.key as keyof typeof firewallRules]
              }))}
              style={{
                padding: '6px 12px',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '11px',
                cursor: 'pointer',
                border: '1px solid',
                borderColor: firewallRules[rule.key as keyof typeof firewallRules]
                  ? 'var(--accent-red)'
                  : 'var(--border-color)',
                backgroundColor: firewallRules[rule.key as keyof typeof firewallRules]
                  ? 'rgba(255, 0, 0, 0.2)'
                  : 'var(--bg-card)',
                color: firewallRules[rule.key as keyof typeof firewallRules]
                  ? 'var(--accent-red)'
                  : 'var(--text-secondary)'
              }}
            >
              {firewallRules[rule.key as keyof typeof firewallRules] ? '🚫' : '✓'} {rule.label}
            </button>
          ))}
          <button
            onClick={() => setIsPaused(!isPaused)}
            style={{
              padding: '6px 12px',
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '11px',
              cursor: 'pointer',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-card)',
              color: 'var(--text-secondary)'
            }}
          >
            {isPaused ? '▶ Resume' : '⏸ Pause'}
          </button>
        </div>

        {/* Visualization Area */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1000px',
          height: '300px',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          {/* Grid Background */}
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.1 }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {[...Array(10)].map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 10} x2="100" y2={i * 10} stroke="var(--accent-cyan)" strokeWidth="0.2" />
            ))}
            {[...Array(20)].map((_, i) => (
              <line key={`v${i}`} x1={i * 5} y1="0" x2={i * 5} y2="100" stroke="var(--accent-cyan)" strokeWidth="0.2" />
            ))}
          </svg>

          {/* Network Path Lines */}
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Main paths */}
            <path d="M 15 50 L 85 50" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="2,2" />
            <path d="M 15 35 Q 50 20 85 35" stroke="var(--border-color)" strokeWidth="0.3" strokeDasharray="1,2" opacity="0.5" />
            <path d="M 15 65 Q 50 80 85 65" stroke="var(--border-color)" strokeWidth="0.3" strokeDasharray="1,2" opacity="0.5" />
          </svg>

          {/* Network Nodes */}
          {Object.entries(NODES).map(([key, node]) => (
            <div
              key={key}
              style={{
                position: 'absolute',
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
                zIndex: 10
              }}
            >
              <div style={{
                width: '50px',
                height: '50px',
                backgroundColor: 'var(--bg-secondary)',
                border: '2px solid var(--accent-cyan)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                boxShadow: '0 0 15px rgba(0, 255, 255, 0.3)'
              }}>
                {node.icon}
              </div>
              <p style={{
                fontFamily: 'monospace',
                fontSize: '10px',
                color: 'var(--text-secondary)',
                marginTop: '4px'
              }}>
                {node.label}
              </p>
            </div>
          ))}

          {/* Packets */}
          <svg
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {packets.map(packet => {
              const packetType = PACKET_TYPES[packet.type];
              const x = 15 + (packet.progress * 0.7);
              const y = getPacketY(packet);
              const opacity = packet.status === 'transit' ? 1 :
                             packet.status === 'delivered' ? 0.5 :
                             packet.status === 'blocked' ? 0.8 : 0.3;

              return (
                <g key={packet.id}>
                  {/* Packet trail */}
                  {packet.status === 'transit' && (
                    <line
                      x1={Math.max(15, x - 5)}
                      y1={y}
                      x2={x}
                      y2={y}
                      stroke={packetType.color}
                      strokeWidth="0.3"
                      opacity="0.5"
                    />
                  )}
                  {/* Packet dot */}
                  <circle
                    cx={x}
                    cy={y}
                    r={packet.status === 'blocked' ? '1.5' : '1'}
                    fill={packet.status === 'blocked' ? '#ff4444' :
                          packet.status === 'dropped' ? '#666666' :
                          packetType.color}
                    opacity={opacity}
                    style={{
                      filter: packet.status === 'transit' ? `drop-shadow(0 0 3px ${packetType.color})` : 'none'
                    }}
                  />
                  {/* Blocked X */}
                  {packet.status === 'blocked' && (
                    <text x={x} y={y + 0.5} fontSize="2" fill="#ff4444" textAnchor="middle">✕</text>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Live indicator */}
          <div style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: 'var(--bg-tertiary)',
            padding: '4px 10px',
            borderRadius: '4px',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{
              width: '6px',
              height: '6px',
              backgroundColor: isPaused ? 'var(--text-muted)' : '#00ff00',
              borderRadius: '50%',
              animation: isPaused ? 'none' : 'pulse 1s infinite'
            }} />
            <span style={{ fontFamily: 'monospace', fontSize: '10px', color: 'var(--text-secondary)' }}>
              {isPaused ? 'PAUSED' : 'LIVE'}
            </span>
          </div>
        </div>

        {/* Packet Log */}
        <div style={{
          width: '100%',
          maxWidth: '1000px',
          marginTop: '24px',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '10px 16px',
            borderBottom: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-tertiary)'
          }}>
            <span style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--accent-cyan)' }}>
              Packet Log
            </span>
          </div>
          <div style={{ height: '150px', overflowY: 'auto', padding: '8px' }}>
            {packets.slice().reverse().slice(0, 8).map(packet => (
              <div
                key={packet.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '6px 10px',
                  fontFamily: 'monospace',
                  fontSize: '11px',
                  borderBottom: '1px solid var(--border-color)'
                }}
              >
                <span>{PACKET_TYPES[packet.type].icon}</span>
                <span style={{ color: PACKET_TYPES[packet.type].color, minWidth: '50px' }}>{packet.type}</span>
                <span style={{ color: 'var(--text-muted)' }}>{packet.source}</span>
                <span style={{ color: 'var(--text-muted)' }}>→</span>
                <span style={{ color: 'var(--text-muted)' }}>{packet.destination}</span>
                <span style={{ color: 'var(--text-muted)', marginLeft: 'auto' }}>{packet.size}B</span>
                <span style={{
                  color: packet.status === 'delivered' ? 'var(--accent-green)' :
                         packet.status === 'blocked' ? 'var(--accent-red)' :
                         packet.status === 'dropped' ? 'var(--text-muted)' :
                         'var(--accent-cyan)',
                  minWidth: '70px',
                  textAlign: 'right'
                }}>
                  {packet.status.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          marginTop: '24px',
          justifyContent: 'center'
        }}>
          {Object.entries(PACKET_TYPES).map(([type, info]) => (
            <div
              key={type}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'monospace',
                fontSize: '10px',
                color: 'var(--text-muted)'
              }}
            >
              <span>{info.icon}</span>
              <div style={{ width: '8px', height: '8px', backgroundColor: info.color, borderRadius: '2px' }} />
              <span>{type}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
