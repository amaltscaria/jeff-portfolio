'use client';

import { useState, useEffect, useCallback } from 'react';

// City coordinates (approximate lat/lng converted to percentage positions)
const CITIES: { [key: string]: { x: number; y: number; name: string; country: string } } = {
  moscow: { x: 55, y: 25, name: 'Moscow', country: 'Russia' },
  beijing: { x: 75, y: 32, name: 'Beijing', country: 'China' },
  pyongyang: { x: 80, y: 33, name: 'Pyongyang', country: 'North Korea' },
  tehran: { x: 52, y: 35, name: 'Tehran', country: 'Iran' },
  newyork: { x: 25, y: 32, name: 'New York', country: 'USA' },
  washington: { x: 24, y: 34, name: 'Washington DC', country: 'USA' },
  london: { x: 42, y: 24, name: 'London', country: 'UK' },
  berlin: { x: 47, y: 24, name: 'Berlin', country: 'Germany' },
  tokyo: { x: 85, y: 33, name: 'Tokyo', country: 'Japan' },
  sydney: { x: 88, y: 70, name: 'Sydney', country: 'Australia' },
  melbourne: { x: 87, y: 73, name: 'Melbourne', country: 'Australia' },
  mumbai: { x: 62, y: 42, name: 'Mumbai', country: 'India' },
  singapore: { x: 74, y: 52, name: 'Singapore', country: 'Singapore' },
  dubai: { x: 55, y: 40, name: 'Dubai', country: 'UAE' },
  saopaulo: { x: 30, y: 62, name: 'São Paulo', country: 'Brazil' },
  lagos: { x: 43, y: 50, name: 'Lagos', country: 'Nigeria' },
  johannesburg: { x: 50, y: 65, name: 'Johannesburg', country: 'South Africa' },
  toronto: { x: 23, y: 30, name: 'Toronto', country: 'Canada' },
  paris: { x: 44, y: 26, name: 'Paris', country: 'France' },
  amsterdam: { x: 44, y: 23, name: 'Amsterdam', country: 'Netherlands' },
};

const ATTACK_TYPES = [
  { name: 'DDoS Attack', color: '#ff4444', icon: '🔴' },
  { name: 'Ransomware', color: '#ff8800', icon: '🟠' },
  { name: 'Phishing', color: '#ffcc00', icon: '🟡' },
  { name: 'SQL Injection', color: '#ff00ff', icon: '🟣' },
  { name: 'Brute Force', color: '#00ccff', icon: '🔵' },
  { name: 'Zero-Day Exploit', color: '#ff0066', icon: '💀' },
  { name: 'Malware', color: '#ff3366', icon: '🦠' },
  { name: 'Man-in-the-Middle', color: '#9966ff', icon: '👁️' },
];

interface Attack {
  id: number;
  from: string;
  to: string;
  type: typeof ATTACK_TYPES[0];
  progress: number;
  timestamp: Date;
}

export default function LiveThreatMap() {
  const [attacks, setAttacks] = useState<Attack[]>([]);
  const [stats, setStats] = useState({ total: 0, blocked: 0, active: 0 });
  const [isPaused, setIsPaused] = useState(false);

  const generateAttack = useCallback(() => {
    const cityKeys = Object.keys(CITIES);
    const fromKey = cityKeys[Math.floor(Math.random() * cityKeys.length)];
    let toKey = cityKeys[Math.floor(Math.random() * cityKeys.length)];
    while (toKey === fromKey) {
      toKey = cityKeys[Math.floor(Math.random() * cityKeys.length)];
    }

    const newAttack: Attack = {
      id: Date.now() + Math.random(),
      from: fromKey,
      to: toKey,
      type: ATTACK_TYPES[Math.floor(Math.random() * ATTACK_TYPES.length)],
      progress: 0,
      timestamp: new Date(),
    };

    return newAttack;
  }, []);

  useEffect(() => {
    if (isPaused) return;

    // Generate new attacks periodically
    const attackInterval = setInterval(() => {
      setAttacks(prev => {
        const newAttacks = [...prev, generateAttack()];
        // Keep only last 15 attacks
        return newAttacks.slice(-15);
      });
      setStats(prev => ({
        ...prev,
        total: prev.total + 1,
        blocked: prev.blocked + (Math.random() > 0.3 ? 1 : 0),
        active: Math.min(15, prev.active + 1)
      }));
    }, 800 + Math.random() * 1200);

    // Animate attack progress
    const progressInterval = setInterval(() => {
      setAttacks(prev =>
        prev.map(attack => ({
          ...attack,
          progress: Math.min(100, attack.progress + 5)
        })).filter(attack => attack.progress < 100)
      );
      setStats(prev => ({ ...prev, active: attacks.length }));
    }, 50);

    return () => {
      clearInterval(attackInterval);
      clearInterval(progressInterval);
    };
  }, [isPaused, generateAttack, attacks.length]);

  return (
    <section
      id="threat-map"
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
            // live_threat_intelligence
          </span>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'var(--text-primary)',
            marginTop: '8px'
          }}>
            Global Cyber Threat Map
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
          gap: '32px',
          marginBottom: '32px',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '16px 24px',
            textAlign: 'center'
          }}>
            <p style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
              ATTACKS DETECTED
            </p>
            <p style={{
              fontFamily: 'monospace',
              fontSize: '28px',
              fontWeight: 'bold',
              color: 'var(--accent-red)',
              margin: '4px 0 0 0'
            }}>
              {stats.total.toLocaleString()}
            </p>
          </div>
          <div style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '16px 24px',
            textAlign: 'center'
          }}>
            <p style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
              THREATS BLOCKED
            </p>
            <p style={{
              fontFamily: 'monospace',
              fontSize: '28px',
              fontWeight: 'bold',
              color: 'var(--accent-green)',
              margin: '4px 0 0 0'
            }}>
              {stats.blocked.toLocaleString()}
            </p>
          </div>
          <div style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '8px',
            padding: '16px 24px',
            textAlign: 'center'
          }}>
            <p style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--text-muted)', margin: 0 }}>
              ACTIVE THREATS
            </p>
            <p style={{
              fontFamily: 'monospace',
              fontSize: '28px',
              fontWeight: 'bold',
              color: 'var(--accent-cyan)',
              margin: '4px 0 0 0'
            }}>
              {attacks.length}
            </p>
          </div>
        </div>

        {/* Map Container */}
        <div style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1200px',
          aspectRatio: '2 / 1',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          {/* World Map Background (simplified SVG outline) */}
          <svg
            viewBox="0 0 100 50"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              opacity: 0.3
            }}
          >
            {/* Simplified continent outlines */}
            <path
              d="M20,15 Q25,10 35,12 L40,15 Q42,18 38,22 L30,25 Q22,28 18,22 Z"
              fill="none"
              stroke="var(--accent-cyan)"
              strokeWidth="0.3"
            />
            <path
              d="M25,28 Q30,25 35,30 L38,40 Q32,45 25,42 L20,35 Z"
              fill="none"
              stroke="var(--accent-cyan)"
              strokeWidth="0.3"
            />
            <path
              d="M40,12 Q50,8 55,15 L58,25 Q52,30 45,28 L40,20 Z"
              fill="none"
              stroke="var(--accent-cyan)"
              strokeWidth="0.3"
            />
            <path
              d="M42,28 Q48,25 52,32 L48,42 Q42,45 40,38 Z"
              fill="none"
              stroke="var(--accent-cyan)"
              strokeWidth="0.3"
            />
            <path
              d="M55,15 Q65,10 75,18 L80,28 Q75,35 65,32 L58,25 Z"
              fill="none"
              stroke="var(--accent-cyan)"
              strokeWidth="0.3"
            />
            <path
              d="M78,18 Q88,15 92,25 L90,35 Q82,40 78,30 Z"
              fill="none"
              stroke="var(--accent-cyan)"
              strokeWidth="0.3"
            />
            <path
              d="M82,38 Q90,35 92,45 L85,48 Q80,46 82,42 Z"
              fill="none"
              stroke="var(--accent-cyan)"
              strokeWidth="0.3"
            />
          </svg>

          {/* Grid Lines */}
          <svg
            viewBox="0 0 100 50"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              opacity: 0.1
            }}
          >
            {[...Array(10)].map((_, i) => (
              <line
                key={`h${i}`}
                x1="0"
                y1={i * 5}
                x2="100"
                y2={i * 5}
                stroke="var(--accent-cyan)"
                strokeWidth="0.1"
              />
            ))}
            {[...Array(20)].map((_, i) => (
              <line
                key={`v${i}`}
                x1={i * 5}
                y1="0"
                x2={i * 5}
                y2="50"
                stroke="var(--accent-cyan)"
                strokeWidth="0.1"
              />
            ))}
          </svg>

          {/* City Markers */}
          {Object.entries(CITIES).map(([key, city]) => (
            <div
              key={key}
              title={`${city.name}, ${city.country}`}
              style={{
                position: 'absolute',
                left: `${city.x}%`,
                top: `${city.y}%`,
                transform: 'translate(-50%, -50%)',
                width: '8px',
                height: '8px',
                backgroundColor: 'var(--accent-cyan)',
                borderRadius: '50%',
                boxShadow: '0 0 10px var(--accent-cyan)',
                zIndex: 10
              }}
            />
          ))}

          {/* Attack Lines */}
          <svg
            viewBox="0 0 100 50"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: 5
            }}
          >
            {attacks.map(attack => {
              const from = CITIES[attack.from];
              const to = CITIES[attack.to];
              if (!from || !to) return null;

              // Calculate control point for curved line
              const midX = (from.x + to.x) / 2;
              const midY = Math.min(from.y, to.y) - 10;

              // Calculate current position along the curve
              const t = attack.progress / 100;
              const currentX = (1 - t) * (1 - t) * from.x + 2 * (1 - t) * t * midX + t * t * to.x;
              const currentY = (1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * midY + t * t * to.y;

              return (
                <g key={attack.id}>
                  {/* Attack path */}
                  <path
                    d={`M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`}
                    fill="none"
                    stroke={attack.type.color}
                    strokeWidth="0.3"
                    opacity="0.5"
                    strokeDasharray="1,1"
                  />
                  {/* Moving dot */}
                  <circle
                    cx={currentX}
                    cy={currentY}
                    r="0.8"
                    fill={attack.type.color}
                    style={{
                      filter: `drop-shadow(0 0 3px ${attack.type.color})`
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Pause/Play Button */}
          <button
            onClick={() => setIsPaused(!isPaused)}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              padding: '8px 16px',
              fontFamily: 'monospace',
              fontSize: '12px',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              zIndex: 20
            }}
          >
            {isPaused ? '▶ Resume' : '⏸ Pause'}
          </button>

          {/* Live Indicator */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: 'var(--bg-tertiary)',
              border: '1px solid var(--border-color)',
              borderRadius: '4px',
              padding: '8px 16px',
              zIndex: 20
            }}
          >
            <div
              style={{
                width: '8px',
                height: '8px',
                backgroundColor: isPaused ? 'var(--text-muted)' : '#ff4444',
                borderRadius: '50%',
                animation: isPaused ? 'none' : 'pulse 1s infinite'
              }}
            />
            <span style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--text-secondary)' }}>
              {isPaused ? 'PAUSED' : 'LIVE'}
            </span>
          </div>
        </div>

        {/* Attack Log */}
        <div style={{
          width: '100%',
          maxWidth: '1200px',
          marginTop: '24px',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: '12px 16px',
            borderBottom: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-tertiary)'
          }}>
            <span style={{ fontFamily: 'monospace', fontSize: '14px', color: 'var(--accent-cyan)' }}>
              Recent Threat Activity
            </span>
          </div>
          <div style={{
            height: '180px',
            overflowY: 'auto',
            padding: '8px'
          }}>
            {attacks.slice().reverse().slice(0, 5).map(attack => (
              <div
                key={attack.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 12px',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  borderBottom: '1px solid var(--border-color)'
                }}
              >
                <span>{attack.type.icon}</span>
                <span style={{ color: attack.type.color }}>{attack.type.name}</span>
                <span style={{ color: 'var(--text-muted)' }}>|</span>
                <span style={{ color: 'var(--text-secondary)' }}>
                  {CITIES[attack.from]?.name} → {CITIES[attack.to]?.name}
                </span>
                <span style={{ marginLeft: 'auto', color: 'var(--text-muted)' }}>
                  {attack.timestamp.toLocaleTimeString()}
                </span>
              </div>
            ))}
            {attacks.length === 0 && (
              <div style={{
                padding: '16px',
                textAlign: 'center',
                color: 'var(--text-muted)',
                fontFamily: 'monospace',
                fontSize: '12px'
              }}>
                No active threats detected...
              </div>
            )}
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
          {ATTACK_TYPES.slice(0, 6).map(type => (
            <div
              key={type.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'monospace',
                fontSize: '11px',
                color: 'var(--text-muted)'
              }}
            >
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  backgroundColor: type.color,
                  borderRadius: '2px'
                }}
              />
              {type.name}
            </div>
          ))}
        </div>

        <p style={{
          marginTop: '24px',
          fontFamily: 'monospace',
          fontSize: '12px',
          color: 'var(--text-muted)',
          textAlign: 'center'
        }}>
          * Simulated threat data for demonstration purposes
        </p>
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
