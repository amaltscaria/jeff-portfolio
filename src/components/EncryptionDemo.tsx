'use client';

import { useState, useEffect } from 'react';

// Simple encryption algorithms for demonstration
const algorithms = {
  caesar: {
    name: 'Caesar Cipher',
    description: 'Shifts each letter by a fixed number of positions',
    encrypt: (text: string, shift: number = 3) => {
      return text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const isUpper = code >= 65 && code <= 90;
          const base = isUpper ? 65 : 97;
          return String.fromCharCode(((code - base + shift) % 26) + base);
        }
        return char;
      }).join('');
    },
    decrypt: (text: string, shift: number = 3) => {
      return text.split('').map(char => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const isUpper = code >= 65 && code <= 90;
          const base = isUpper ? 65 : 97;
          return String.fromCharCode(((code - base - shift + 26) % 26) + base);
        }
        return char;
      }).join('');
    }
  },
  base64: {
    name: 'Base64',
    description: 'Encodes binary data as ASCII text',
    encrypt: (text: string) => {
      try {
        return btoa(unescape(encodeURIComponent(text)));
      } catch {
        return 'Error: Invalid input';
      }
    },
    decrypt: (text: string) => {
      try {
        return decodeURIComponent(escape(atob(text)));
      } catch {
        return 'Error: Invalid Base64';
      }
    }
  },
  reverse: {
    name: 'Reverse',
    description: 'Reverses the text string',
    encrypt: (text: string) => text.split('').reverse().join(''),
    decrypt: (text: string) => text.split('').reverse().join('')
  },
  rot13: {
    name: 'ROT13',
    description: 'Rotates letters by 13 positions (self-inverse)',
    encrypt: (text: string) => {
      return text.replace(/[a-zA-Z]/g, char => {
        const code = char.charCodeAt(0);
        const isUpper = code >= 65 && code <= 90;
        const base = isUpper ? 65 : 97;
        return String.fromCharCode(((code - base + 13) % 26) + base);
      });
    },
    decrypt: (text: string) => {
      return text.replace(/[a-zA-Z]/g, char => {
        const code = char.charCodeAt(0);
        const isUpper = code >= 65 && code <= 90;
        const base = isUpper ? 65 : 97;
        return String.fromCharCode(((code - base + 13) % 26) + base);
      });
    }
  },
  hex: {
    name: 'Hexadecimal',
    description: 'Converts text to hexadecimal representation',
    encrypt: (text: string) => {
      return text.split('').map(char => char.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
    },
    decrypt: (text: string) => {
      try {
        return text.split(' ').map(hex => String.fromCharCode(parseInt(hex, 16))).join('');
      } catch {
        return 'Error: Invalid hex';
      }
    }
  },
  binary: {
    name: 'Binary',
    description: 'Converts text to binary representation',
    encrypt: (text: string) => {
      return text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
    },
    decrypt: (text: string) => {
      try {
        return text.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
      } catch {
        return 'Error: Invalid binary';
      }
    }
  },
  morse: {
    name: 'Morse Code',
    description: 'Converts text to dots and dashes',
    encrypt: (text: string) => {
      const morseCode: { [key: string]: string } = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
        'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
        'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
        'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
        'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
        '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
        '8': '---..', '9': '----.', ' ': '/'
      };
      return text.toUpperCase().split('').map(char => morseCode[char] || char).join(' ');
    },
    decrypt: (text: string) => {
      const morseToChar: { [key: string]: string } = {
        '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F',
        '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
        '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R',
        '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
        '-.--': 'Y', '--..': 'Z', '-----': '0', '.----': '1', '..---': '2',
        '...--': '3', '....-': '4', '.....': '5', '-....': '6', '--...': '7',
        '---..': '8', '----.': '9', '/': ' '
      };
      return text.split(' ').map(code => morseToChar[code] || code).join('');
    }
  }
};

type AlgorithmKey = keyof typeof algorithms;

export default function EncryptionDemo() {
  const [input, setInput] = useState('Hello, World!');
  const [output, setOutput] = useState('');
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<AlgorithmKey>('caesar');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [isAnimating, setIsAnimating] = useState(false);
  const [shift, setShift] = useState(3);

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      return;
    }

    setIsAnimating(true);
    const timer = setTimeout(() => {
      const algo = algorithms[selectedAlgorithm];
      if (mode === 'encrypt') {
        setOutput(selectedAlgorithm === 'caesar' ? algo.encrypt(input, shift) : algo.encrypt(input));
      } else {
        setOutput(selectedAlgorithm === 'caesar' ? algo.decrypt(input, shift) : algo.decrypt(input));
      }
      setIsAnimating(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [input, selectedAlgorithm, mode, shift]);

  const swapInputOutput = () => {
    const temp = input;
    setInput(output);
    setOutput(temp);
    setMode(mode === 'encrypt' ? 'decrypt' : 'encrypt');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
  };

  return (
    <section
      id="encryption-demo"
      style={{
        position: 'relative',
        zIndex: 10,
        padding: '96px 5%'
      }}
    >
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '14px', color: 'var(--accent-green)' }}>
            // encryption_playground
          </span>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: 'var(--text-primary)',
            marginTop: '8px'
          }}>
            Interactive Encryption
          </h2>
          <div style={{
            width: '64px',
            height: '4px',
            background: 'linear-gradient(to right, var(--accent-cyan), var(--accent-green))',
            margin: '16px auto 0',
            borderRadius: '2px'
          }} />
          <p style={{
            color: 'var(--text-muted)',
            marginTop: '16px',
            fontFamily: 'monospace',
            fontSize: '14px'
          }}>
            Explore different encryption algorithms in real-time
          </p>
        </div>

        {/* Main Demo Container */}
        <div style={{
          width: '100%',
          maxWidth: '900px',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          {/* Algorithm Selector */}
          <div style={{
            padding: '20px',
            borderBottom: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-tertiary)'
          }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              {Object.entries(algorithms).map(([key, algo]) => (
                <button
                  key={key}
                  onClick={() => setSelectedAlgorithm(key as AlgorithmKey)}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    border: selectedAlgorithm === key ? '1px solid var(--accent-cyan)' : '1px solid var(--border-color)',
                    backgroundColor: selectedAlgorithm === key ? 'var(--accent-cyan)' : 'var(--bg-card)',
                    color: selectedAlgorithm === key ? 'var(--bg-primary)' : 'var(--text-secondary)'
                  }}
                >
                  {algo.name}
                </button>
              ))}
            </div>
            <p style={{
              textAlign: 'center',
              marginTop: '12px',
              fontFamily: 'monospace',
              fontSize: '12px',
              color: 'var(--text-muted)'
            }}>
              {algorithms[selectedAlgorithm].description}
            </p>
          </div>

          {/* Caesar Shift Control */}
          {selectedAlgorithm === 'caesar' && (
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px'
            }}>
              <span style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--text-secondary)' }}>
                Shift:
              </span>
              <input
                type="range"
                min="1"
                max="25"
                value={shift}
                onChange={(e) => setShift(parseInt(e.target.value))}
                style={{ width: '150px', accentColor: 'var(--accent-cyan)' }}
              />
              <span style={{
                fontFamily: 'monospace',
                fontSize: '14px',
                color: 'var(--accent-cyan)',
                minWidth: '24px'
              }}>
                {shift}
              </span>
            </div>
          )}

          {/* Mode Toggle */}
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <button
              onClick={() => setMode('encrypt')}
              style={{
                padding: '10px 24px',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '14px',
                cursor: 'pointer',
                border: 'none',
                backgroundColor: mode === 'encrypt' ? 'var(--accent-green)' : 'var(--bg-tertiary)',
                color: mode === 'encrypt' ? 'var(--bg-primary)' : 'var(--text-secondary)',
                transition: 'all 0.2s'
              }}
            >
              🔒 Encrypt
            </button>
            <button
              onClick={() => setMode('decrypt')}
              style={{
                padding: '10px 24px',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '14px',
                cursor: 'pointer',
                border: 'none',
                backgroundColor: mode === 'decrypt' ? 'var(--accent-cyan)' : 'var(--bg-tertiary)',
                color: mode === 'decrypt' ? 'var(--bg-primary)' : 'var(--text-secondary)',
                transition: 'all 0.2s'
              }}
            >
              🔓 Decrypt
            </button>
          </div>

          {/* Input/Output Area */}
          <div style={{ padding: '20px' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              gap: '16px',
              alignItems: 'center'
            }}>
              {/* Input */}
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  marginBottom: '8px'
                }}>
                  {mode === 'encrypt' ? 'Plain Text' : 'Encrypted Text'}
                </label>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter text here..."
                  style={{
                    width: '100%',
                    height: '150px',
                    padding: '16px',
                    borderRadius: '4px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-tertiary)',
                    color: 'var(--text-primary)',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    resize: 'none',
                    outline: 'none'
                  }}
                />
              </div>

              {/* Swap Button */}
              <button
                onClick={swapInputOutput}
                title="Swap input/output"
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-tertiary)',
                  color: 'var(--accent-cyan)',
                  cursor: 'pointer',
                  fontSize: '18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s'
                }}
              >
                ⇄
              </button>

              {/* Output */}
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}>
                  <label style={{
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    color: 'var(--text-muted)'
                  }}>
                    {mode === 'encrypt' ? 'Encrypted Text' : 'Decrypted Text'}
                  </label>
                  <button
                    onClick={copyToClipboard}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: 'transparent',
                      color: 'var(--text-muted)',
                      fontFamily: 'monospace',
                      fontSize: '10px',
                      cursor: 'pointer'
                    }}
                  >
                    📋 Copy
                  </button>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '150px',
                    padding: '16px',
                    borderRadius: '4px',
                    border: '1px solid var(--accent-cyan)',
                    backgroundColor: 'var(--bg-secondary)',
                    color: isAnimating ? 'var(--text-muted)' : 'var(--accent-green)',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    overflowY: 'auto',
                    wordBreak: 'break-all',
                    boxShadow: '0 0 20px rgba(0, 255, 255, 0.1)'
                  }}
                >
                  {isAnimating ? (
                    <span style={{ opacity: 0.5 }}>Processing...</span>
                  ) : (
                    output || <span style={{ color: 'var(--text-muted)' }}>Output will appear here...</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Info Footer */}
          <div style={{
            padding: '16px 20px',
            borderTop: '1px solid var(--border-color)',
            backgroundColor: 'var(--bg-tertiary)',
            display: 'flex',
            justifyContent: 'center',
            gap: '24px',
            flexWrap: 'wrap'
          }}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--text-muted)' }}>
                Input Length
              </span>
              <p style={{
                fontFamily: 'monospace',
                fontSize: '16px',
                color: 'var(--accent-cyan)',
                margin: '4px 0 0 0'
              }}>
                {input.length}
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--text-muted)' }}>
                Output Length
              </span>
              <p style={{
                fontFamily: 'monospace',
                fontSize: '16px',
                color: 'var(--accent-green)',
                margin: '4px 0 0 0'
              }}>
                {output.length}
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <span style={{ fontFamily: 'monospace', fontSize: '11px', color: 'var(--text-muted)' }}>
                Algorithm
              </span>
              <p style={{
                fontFamily: 'monospace',
                fontSize: '16px',
                color: 'var(--text-secondary)',
                margin: '4px 0 0 0'
              }}>
                {algorithms[selectedAlgorithm].name}
              </p>
            </div>
          </div>
        </div>

        <p style={{
          marginTop: '24px',
          fontFamily: 'monospace',
          fontSize: '12px',
          color: 'var(--text-muted)',
          textAlign: 'center'
        }}>
          * For demonstration purposes. Use proper cryptographic libraries for real security.
        </p>
      </div>
    </section>
  );
}
