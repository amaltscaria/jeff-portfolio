'use client';

import { useState, useCallback } from 'react';

interface QueryResult {
  success: boolean;
  message: string;
  data?: Array<{ id: number; username: string; role: string }>;
  query: string;
  vulnerable: boolean;
}

// Simulated database
const FAKE_DATABASE = {
  users: [
    { id: 1, username: 'admin', password: 'supersecret123', role: 'Administrator' },
    { id: 2, username: 'john_doe', password: 'john2024', role: 'User' },
    { id: 3, username: 'jane_smith', password: 'janepass', role: 'User' },
    { id: 4, username: 'guest', password: 'guest', role: 'Guest' },
    { id: 5, username: 'developer', password: 'dev@2024!', role: 'Developer' }
  ]
};

// Common SQL injection patterns
const INJECTION_PATTERNS = [
  { pattern: "' OR '1'='1", name: 'Always True', description: 'Bypasses authentication by making condition always true' },
  { pattern: "' OR 1=1--", name: 'Comment Attack', description: 'Uses comment to ignore rest of query' },
  { pattern: "admin'--", name: 'Username Bypass', description: 'Logs in as admin by commenting out password check' },
  { pattern: "' UNION SELECT * FROM users--", name: 'Union Attack', description: 'Extracts data from other tables' },
  { pattern: "'; DROP TABLE users;--", name: 'Destructive', description: 'Attempts to delete entire table' },
  { pattern: "' OR username LIKE '%", name: 'Wildcard', description: 'Uses LIKE to match all usernames' }
];

export default function SQLInjectionPlayground() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [result, setResult] = useState<QueryResult | null>(null);
  const [showExamples, setShowExamples] = useState(false);
  const [mode, setMode] = useState<'vulnerable' | 'secure'>('vulnerable');

  // Simulate vulnerable query (string concatenation)
  const executeVulnerableQuery = useCallback((user: string, pass: string): QueryResult => {
    // Build the "vulnerable" query string
    const query = `SELECT * FROM users WHERE username='${user}' AND password='${pass}'`;

    // Check for SQL injection patterns
    const hasInjection = user.includes("'") || pass.includes("'") ||
                        user.toLowerCase().includes('or') ||
                        user.includes('--') || pass.includes('--') ||
                        user.toLowerCase().includes('union') ||
                        user.toLowerCase().includes('drop');

    if (hasInjection) {
      // Simulate successful injection
      if (user.includes("' OR") || user.includes("'OR") ||
          pass.includes("' OR") || pass.includes("'OR") ||
          user.includes("1=1") || pass.includes("1=1") ||
          user.includes("'1'='1") || pass.includes("'1'='1")) {
        return {
          success: true,
          message: 'SQL Injection Successful! Authentication bypassed.',
          data: FAKE_DATABASE.users.map(u => ({ id: u.id, username: u.username, role: u.role })),
          query,
          vulnerable: true
        };
      }

      if (user.includes("--") && user.toLowerCase().includes('admin')) {
        return {
          success: true,
          message: 'SQL Injection Successful! Logged in as admin.',
          data: [{ id: 1, username: 'admin', role: 'Administrator' }],
          query,
          vulnerable: true
        };
      }

      if (user.toLowerCase().includes('union')) {
        return {
          success: true,
          message: 'UNION Attack Successful! Database contents exposed.',
          data: FAKE_DATABASE.users.map(u => ({ id: u.id, username: u.username, role: u.role })),
          query,
          vulnerable: true
        };
      }

      if (user.toLowerCase().includes('drop')) {
        return {
          success: false,
          message: 'DROP TABLE detected! In a real scenario, this could delete the entire users table!',
          query,
          vulnerable: true
        };
      }

      // Generic injection detected
      return {
        success: true,
        message: 'Potential SQL Injection detected! Query was manipulated.',
        data: FAKE_DATABASE.users.slice(0, 3).map(u => ({ id: u.id, username: u.username, role: u.role })),
        query,
        vulnerable: true
      };
    }

    // Normal query - check credentials
    const user_found = FAKE_DATABASE.users.find(
      u => u.username === user && u.password === pass
    );

    if (user_found) {
      return {
        success: true,
        message: `Login successful! Welcome, ${user_found.username}`,
        data: [{ id: user_found.id, username: user_found.username, role: user_found.role }],
        query,
        vulnerable: false
      };
    }

    return {
      success: false,
      message: 'Invalid username or password',
      query,
      vulnerable: false
    };
  }, []);

  // Simulate secure query (parameterized)
  const executeSecureQuery = useCallback((user: string, pass: string): QueryResult => {
    const query = `SELECT * FROM users WHERE username=? AND password=?
-- Parameters: ['${user.replace(/'/g, "''")}', '${pass.replace(/'/g, "''")}']`;

    // In secure mode, special characters are escaped/parameterized
    const sanitizedUser = user.replace(/'/g, "''");
    const sanitizedPass = pass.replace(/'/g, "''");

    const user_found = FAKE_DATABASE.users.find(
      u => u.username === sanitizedUser && u.password === sanitizedPass
    );

    if (user_found) {
      return {
        success: true,
        message: `Login successful! Welcome, ${user_found.username}`,
        data: [{ id: user_found.id, username: user_found.username, role: user_found.role }],
        query,
        vulnerable: false
      };
    }

    return {
      success: false,
      message: 'Invalid username or password. SQL injection attempts are safely neutralized.',
      query,
      vulnerable: false
    };
  }, []);

  const handleSubmit = useCallback(() => {
    if (mode === 'vulnerable') {
      setResult(executeVulnerableQuery(username, password));
    } else {
      setResult(executeSecureQuery(username, password));
    }
  }, [username, password, mode, executeVulnerableQuery, executeSecureQuery]);

  const applyExample = useCallback((pattern: string) => {
    setUsername(pattern);
    setPassword('anything');
  }, []);

  return (
    <section style={{ padding: '96px 5%' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '14px', color: 'var(--accent-green)' }}>
            // sql_injection_lab
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginTop: '8px' }}>
            SQL Injection Playground
          </h2>
          <div style={{ width: '64px', height: '4px', background: 'linear-gradient(to right, var(--accent-cyan), var(--accent-green))', margin: '16px auto', borderRadius: '2px' }}></div>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', marginTop: '16px' }}>
            Learn how SQL injection attacks work in a safe, simulated environment.
            This is for educational purposes only - never test on systems without permission!
          </p>
        </div>

        {/* Warning Banner */}
        <div style={{
          backgroundColor: 'rgba(255, 100, 0, 0.1)',
          border: '1px solid #ff6600',
          borderRadius: '8px',
          padding: '16px',
          marginBottom: '32px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{ fontSize: '24px' }}>&#9888;</span>
          <p style={{ color: '#ff9944', margin: 0, fontFamily: 'monospace', fontSize: '13px' }}>
            EDUCATIONAL PURPOSE ONLY: This is a simulation. SQL injection is illegal when performed on systems without authorization.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
          {/* Login Form */}
          <div style={{ flex: '1', minWidth: '300px' }}>
            <div style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              overflow: 'hidden'
            }}>
              {/* Mode Toggle */}
              <div style={{ display: 'flex', borderBottom: '1px solid var(--border-color)' }}>
                <button
                  onClick={() => setMode('vulnerable')}
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: mode === 'vulnerable' ? 'rgba(255, 0, 0, 0.2)' : 'transparent',
                    color: mode === 'vulnerable' ? '#ff4444' : 'var(--text-secondary)',
                    border: 'none',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  VULNERABLE MODE
                </button>
                <button
                  onClick={() => setMode('secure')}
                  style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: mode === 'secure' ? 'rgba(0, 255, 0, 0.2)' : 'transparent',
                    color: mode === 'secure' ? 'var(--accent-green)' : 'var(--text-secondary)',
                    border: 'none',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  SECURE MODE
                </button>
              </div>

              <div style={{ padding: '24px' }}>
                <h3 style={{
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  color: 'var(--accent-cyan)',
                  marginBottom: '20px'
                }}>
                  // simulated_login_form
                </h3>

                {/* Username */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{
                    display: 'block',
                    fontFamily: 'monospace',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    marginBottom: '6px'
                  }}>
                    USERNAME
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username..."
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '4px',
                      color: 'var(--text-primary)',
                      fontFamily: 'monospace',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent-cyan)'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                  />
                </div>

                {/* Password */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontFamily: 'monospace',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    marginBottom: '6px'
                  }}>
                    PASSWORD
                  </label>
                  <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password..."
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '4px',
                      color: 'var(--text-primary)',
                      fontFamily: 'monospace',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent-cyan)'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  style={{
                    width: '100%',
                    padding: '14px',
                    backgroundColor: 'var(--accent-cyan)',
                    color: 'var(--bg-primary)',
                    border: 'none',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  LOGIN
                </button>

                {/* Hint for valid credentials */}
                <p style={{
                  fontFamily: 'monospace',
                  fontSize: '10px',
                  color: 'var(--text-muted)',
                  marginTop: '12px',
                  textAlign: 'center'
                }}>
                  Hint: Try &quot;guest&quot; / &quot;guest&quot; for normal login
                </p>
              </div>
            </div>

            {/* Examples Toggle */}
            <button
              onClick={() => setShowExamples(!showExamples)}
              style={{
                width: '100%',
                marginTop: '16px',
                padding: '12px',
                backgroundColor: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                color: 'var(--text-secondary)',
                fontFamily: 'monospace',
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              {showExamples ? '- Hide' : '+ Show'} Injection Examples
            </button>

            {/* Examples Panel */}
            {showExamples && (
              <div style={{
                marginTop: '16px',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '16px'
              }}>
                <h4 style={{
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  color: 'var(--accent-cyan)',
                  marginBottom: '12px'
                }}>
                  Common SQL Injection Patterns:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {INJECTION_PATTERNS.map((pattern, index) => (
                    <button
                      key={index}
                      onClick={() => applyExample(pattern.pattern)}
                      style={{
                        padding: '10px 12px',
                        backgroundColor: 'var(--bg-tertiary)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-cyan)'}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                    >
                      <div style={{ fontFamily: 'monospace', fontSize: '12px', color: '#ff6b6b', marginBottom: '4px' }}>
                        {pattern.pattern}
                      </div>
                      <div style={{ fontFamily: 'monospace', fontSize: '10px', color: 'var(--text-muted)' }}>
                        {pattern.name}: {pattern.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Query & Results Panel */}
          <div style={{ flex: '1', minWidth: '300px' }}>
            {/* Generated Query */}
            <div style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              overflow: 'hidden',
              marginBottom: '16px'
            }}>
              <div style={{
                padding: '10px 16px',
                borderBottom: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-tertiary)'
              }}>
                <span style={{ fontFamily: 'monospace', fontSize: '12px', color: 'var(--accent-cyan)' }}>
                  Generated SQL Query
                </span>
              </div>
              <div style={{ padding: '16px' }}>
                <pre style={{
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  color: result?.vulnerable ? '#ff6b6b' : 'var(--text-secondary)',
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-all',
                  backgroundColor: 'var(--bg-tertiary)',
                  padding: '12px',
                  borderRadius: '4px',
                  border: result?.vulnerable ? '1px solid #ff6b6b' : '1px solid var(--border-color)'
                }}>
                  {result?.query || `SELECT * FROM users WHERE username='${username || '...'}' AND password='${password || '...'}'`}
                </pre>
                {result?.vulnerable && (
                  <div style={{
                    marginTop: '8px',
                    padding: '8px 12px',
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                    fontSize: '11px',
                    color: '#ff6b6b'
                  }}>
                    Injection detected in query!
                  </div>
                )}
              </div>
            </div>

            {/* Result */}
            {result && (
              <div style={{
                backgroundColor: 'var(--bg-card)',
                border: `1px solid ${result.success ? (result.vulnerable ? '#ff6b6b' : 'var(--accent-green)') : 'var(--border-color)'}`,
                borderRadius: '8px',
                overflow: 'hidden'
              }}>
                <div style={{
                  padding: '10px 16px',
                  borderBottom: '1px solid var(--border-color)',
                  backgroundColor: result.success
                    ? (result.vulnerable ? 'rgba(255, 0, 0, 0.1)' : 'rgba(0, 255, 0, 0.1)')
                    : 'var(--bg-tertiary)'
                }}>
                  <span style={{
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    color: result.success
                      ? (result.vulnerable ? '#ff6b6b' : 'var(--accent-green)')
                      : 'var(--text-muted)'
                  }}>
                    {result.success ? (result.vulnerable ? 'ATTACK SUCCESSFUL' : 'LOGIN SUCCESS') : 'ACCESS DENIED'}
                  </span>
                </div>
                <div style={{ padding: '16px' }}>
                  <p style={{
                    fontFamily: 'monospace',
                    fontSize: '13px',
                    color: 'var(--text-secondary)',
                    margin: '0 0 16px 0'
                  }}>
                    {result.message}
                  </p>

                  {result.data && result.data.length > 0 && (
                    <div style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                          <tr style={{ backgroundColor: 'var(--bg-secondary)' }}>
                            <th style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '10px', color: 'var(--accent-cyan)', textAlign: 'left' }}>ID</th>
                            <th style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '10px', color: 'var(--accent-cyan)', textAlign: 'left' }}>USERNAME</th>
                            <th style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '10px', color: 'var(--accent-cyan)', textAlign: 'left' }}>ROLE</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.data.map((row, i) => (
                            <tr key={i} style={{ borderTop: '1px solid var(--border-color)' }}>
                              <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '12px', color: 'var(--text-muted)' }}>{row.id}</td>
                              <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '12px', color: 'var(--text-secondary)' }}>{row.username}</td>
                              <td style={{ padding: '8px 12px', fontFamily: 'monospace', fontSize: '12px', color: 'var(--text-secondary)' }}>{row.role}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Prevention Tips */}
            <div style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '8px',
              padding: '16px',
              marginTop: '16px'
            }}>
              <h4 style={{
                fontFamily: 'monospace',
                fontSize: '12px',
                color: 'var(--accent-green)',
                marginBottom: '12px'
              }}>
                // how_to_prevent_sql_injection
              </h4>
              <ul style={{
                margin: 0,
                paddingLeft: '20px',
                fontFamily: 'monospace',
                fontSize: '11px',
                color: 'var(--text-secondary)',
                lineHeight: '1.8'
              }}>
                <li>Use <span style={{ color: 'var(--accent-cyan)' }}>parameterized queries</span> (prepared statements)</li>
                <li>Implement <span style={{ color: 'var(--accent-cyan)' }}>input validation</span> and sanitization</li>
                <li>Use <span style={{ color: 'var(--accent-cyan)' }}>ORMs</span> (Object-Relational Mapping)</li>
                <li>Apply <span style={{ color: 'var(--accent-cyan)' }}>least privilege</span> database permissions</li>
                <li>Enable <span style={{ color: 'var(--accent-cyan)' }}>WAF</span> (Web Application Firewall)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
