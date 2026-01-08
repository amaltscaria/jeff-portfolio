'use client';

import { useState, useRef, useCallback } from 'react';

export default function SteganographyTool() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [encodedImage, setEncodedImage] = useState<string | null>(null);
  const [secretMessage, setSecretMessage] = useState('');
  const [decodedMessage, setDecodedMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Convert text to binary
  const textToBinary = (text: string): string => {
    return text.split('').map(char => {
      return char.charCodeAt(0).toString(2).padStart(8, '0');
    }).join('');
  };

  // Convert binary to text
  const binaryToText = (binary: string): string => {
    const bytes = binary.match(/.{8}/g) || [];
    return bytes.map(byte => {
      const charCode = parseInt(byte, 2);
      if (charCode === 0) return '';
      return String.fromCharCode(charCode);
    }).join('');
  };

  // Handle image upload
  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setOriginalImage(event.target?.result as string);
      setEncodedImage(null);
      setDecodedMessage('');
      setStatus('Image loaded successfully');
    };
    reader.readAsDataURL(file);
  }, []);

  // Encode message into image
  const encodeMessage = useCallback(() => {
    if (!originalImage || !secretMessage) {
      setStatus('Please upload an image and enter a message');
      return;
    }

    setIsProcessing(true);
    setStatus('Encoding message...');

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Add delimiter to mark end of message
      const messageWithDelimiter = secretMessage + '\0\0\0';
      const binaryMessage = textToBinary(messageWithDelimiter);

      // Check if image is large enough
      const maxBits = Math.floor((data.length / 4) * 3); // RGB channels only
      if (binaryMessage.length > maxBits) {
        setStatus('Image too small for this message');
        setIsProcessing(false);
        return;
      }

      // Encode message into LSB of RGB values
      let bitIndex = 0;
      for (let i = 0; i < data.length && bitIndex < binaryMessage.length; i += 4) {
        // Red channel
        if (bitIndex < binaryMessage.length) {
          data[i] = (data[i] & 0xFE) | parseInt(binaryMessage[bitIndex], 2);
          bitIndex++;
        }
        // Green channel
        if (bitIndex < binaryMessage.length) {
          data[i + 1] = (data[i + 1] & 0xFE) | parseInt(binaryMessage[bitIndex], 2);
          bitIndex++;
        }
        // Blue channel
        if (bitIndex < binaryMessage.length) {
          data[i + 2] = (data[i + 2] & 0xFE) | parseInt(binaryMessage[bitIndex], 2);
          bitIndex++;
        }
      }

      ctx.putImageData(imageData, 0, 0);
      setEncodedImage(canvas.toDataURL('image/png'));
      setStatus(`Message encoded! (${binaryMessage.length} bits hidden)`);
      setIsProcessing(false);
    };
    img.src = originalImage;
  }, [originalImage, secretMessage]);

  // Decode message from image
  const decodeMessage = useCallback(() => {
    if (!originalImage) {
      setStatus('Please upload an image to decode');
      return;
    }

    setIsProcessing(true);
    setStatus('Decoding message...');

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Extract LSB from RGB values
      let binaryMessage = '';
      for (let i = 0; i < data.length; i += 4) {
        binaryMessage += (data[i] & 1).toString();      // Red
        binaryMessage += (data[i + 1] & 1).toString();  // Green
        binaryMessage += (data[i + 2] & 1).toString();  // Blue
      }

      // Convert binary to text and find delimiter
      const fullText = binaryToText(binaryMessage);
      const delimiterIndex = fullText.indexOf('\0\0\0');

      if (delimiterIndex !== -1 && delimiterIndex > 0) {
        const message = fullText.substring(0, delimiterIndex);
        setDecodedMessage(message);
        setStatus(`Message decoded! (${message.length} characters found)`);
      } else {
        // Try to find first null character as alternate delimiter
        const nullIndex = fullText.indexOf('\0');
        if (nullIndex > 3) {
          const message = fullText.substring(0, nullIndex);
          // Filter to only printable characters
          const cleanMessage = message.replace(/[^\x20-\x7E\n]/g, '');
          if (cleanMessage.length > 2) {
            setDecodedMessage(cleanMessage);
            setStatus(`Message decoded! (${cleanMessage.length} characters found)`);
            setIsProcessing(false);
            return;
          }
        }

        // Try to extract any readable text (stop at first garbage)
        let readableText = '';
        for (let i = 0; i < Math.min(fullText.length, 500); i++) {
          const charCode = fullText.charCodeAt(i);
          if (charCode >= 32 && charCode <= 126) {
            readableText += fullText[i];
          } else if (charCode === 10 || charCode === 13) {
            readableText += fullText[i]; // Allow newlines
          } else if (readableText.length > 0) {
            // Stop at first non-printable character after we have some text
            break;
          }
        }

        if (readableText.length > 2) {
          setDecodedMessage(readableText);
          setStatus(`Message extracted (${readableText.length} characters)`);
        } else {
          setDecodedMessage('');
          setStatus('No hidden message found in this image');
        }
      }
      setIsProcessing(false);
    };
    img.src = originalImage;
  }, [originalImage]);

  // Download encoded image
  const downloadImage = useCallback(() => {
    if (!encodedImage) return;
    const link = document.createElement('a');
    link.download = 'stego-image.png';
    link.href = encodedImage;
    link.click();
  }, [encodedImage]);

  return (
    <section style={{ padding: '96px 5%' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontFamily: 'monospace', fontSize: '14px', color: 'var(--accent-green)' }}>
            // steganography_tool
          </span>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-primary)', marginTop: '8px' }}>
            Hide Messages in Images
          </h2>
          <div style={{ width: '64px', height: '4px', background: 'linear-gradient(to right, var(--accent-cyan), var(--accent-green))', margin: '16px auto', borderRadius: '2px' }}></div>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', marginTop: '16px' }}>
            Steganography is the art of hiding secret information within ordinary data.
            This tool uses LSB (Least Significant Bit) encoding to hide messages in images.
          </p>
        </div>

        {/* Main Container */}
        <div style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: '8px',
          overflow: 'hidden'
        }}>
          {/* Mode Toggle */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-color)'
          }}>
            <button
              onClick={() => { setMode('encode'); setDecodedMessage(''); }}
              style={{
                flex: 1,
                padding: '16px',
                backgroundColor: mode === 'encode' ? 'var(--accent-cyan)' : 'transparent',
                color: mode === 'encode' ? 'var(--bg-primary)' : 'var(--text-secondary)',
                border: 'none',
                fontFamily: 'monospace',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontWeight: mode === 'encode' ? 'bold' : 'normal'
              }}
            >
              ENCODE MESSAGE
            </button>
            <button
              onClick={() => { setMode('decode'); setEncodedImage(null); }}
              style={{
                flex: 1,
                padding: '16px',
                backgroundColor: mode === 'decode' ? 'var(--accent-green)' : 'transparent',
                color: mode === 'decode' ? 'var(--bg-primary)' : 'var(--text-secondary)',
                border: 'none',
                fontFamily: 'monospace',
                fontSize: '14px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontWeight: mode === 'decode' ? 'bold' : 'normal'
              }}
            >
              DECODE MESSAGE
            </button>
          </div>

          <div style={{ padding: '32px' }}>
            {/* Hidden canvas for processing */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />

            {/* File Upload */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block',
                fontFamily: 'monospace',
                fontSize: '12px',
                color: 'var(--accent-cyan)',
                marginBottom: '8px'
              }}>
                {mode === 'encode' ? '// select_carrier_image' : '// select_stego_image'}
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                style={{
                  width: '100%',
                  padding: '24px',
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '2px dashed var(--border-color)',
                  borderRadius: '8px',
                  color: 'var(--text-secondary)',
                  fontFamily: 'monospace',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                  e.currentTarget.style.color = 'var(--accent-cyan)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                Click to upload image or drag and drop
              </button>
            </div>

            {/* Image Preview */}
            {originalImage && (
              <div style={{
                display: 'flex',
                gap: '24px',
                marginBottom: '24px',
                flexWrap: 'wrap'
              }}>
                <div style={{ flex: '1', minWidth: '250px' }}>
                  <label style={{
                    display: 'block',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                    marginBottom: '8px'
                  }}>
                    {mode === 'encode' ? 'Original Image' : 'Image to Decode'}
                  </label>
                  <div style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    borderRadius: '8px',
                    padding: '8px',
                    border: '1px solid var(--border-color)'
                  }}>
                    <img
                      src={originalImage}
                      alt="Original"
                      style={{
                        width: '100%',
                        maxHeight: '200px',
                        objectFit: 'contain',
                        borderRadius: '4px'
                      }}
                    />
                  </div>
                </div>

                {mode === 'encode' && encodedImage && (
                  <div style={{ flex: '1', minWidth: '250px' }}>
                    <label style={{
                      display: 'block',
                      fontFamily: 'monospace',
                      fontSize: '12px',
                      color: 'var(--accent-green)',
                      marginBottom: '8px'
                    }}>
                      Encoded Image (with hidden message)
                    </label>
                    <div style={{
                      backgroundColor: 'var(--bg-tertiary)',
                      borderRadius: '8px',
                      padding: '8px',
                      border: '1px solid var(--accent-green)'
                    }}>
                      <img
                        src={encodedImage}
                        alt="Encoded"
                        style={{
                          width: '100%',
                          maxHeight: '200px',
                          objectFit: 'contain',
                          borderRadius: '4px'
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Encode Mode */}
            {mode === 'encode' && (
              <>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    color: 'var(--accent-cyan)',
                    marginBottom: '8px'
                  }}>
                    // secret_message
                  </label>
                  <textarea
                    value={secretMessage}
                    onChange={(e) => setSecretMessage(e.target.value)}
                    placeholder="Enter your secret message here..."
                    style={{
                      width: '100%',
                      minHeight: '100px',
                      padding: '16px',
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '8px',
                      color: 'var(--text-primary)',
                      fontFamily: 'monospace',
                      fontSize: '14px',
                      resize: 'vertical',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = 'var(--accent-cyan)'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                  />
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '8px',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    color: 'var(--text-muted)'
                  }}>
                    <span>{secretMessage.length} characters</span>
                    <span>{secretMessage.length * 8} bits required</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <button
                    onClick={encodeMessage}
                    disabled={isProcessing || !originalImage || !secretMessage}
                    style={{
                      flex: '1',
                      minWidth: '150px',
                      padding: '16px 24px',
                      backgroundColor: isProcessing || !originalImage || !secretMessage ? 'var(--bg-tertiary)' : 'var(--accent-cyan)',
                      color: isProcessing || !originalImage || !secretMessage ? 'var(--text-muted)' : 'var(--bg-primary)',
                      border: 'none',
                      borderRadius: '8px',
                      fontFamily: 'monospace',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      cursor: isProcessing || !originalImage || !secretMessage ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {isProcessing ? 'ENCODING...' : 'ENCODE MESSAGE'}
                  </button>

                  {encodedImage && (
                    <button
                      onClick={downloadImage}
                      style={{
                        flex: '1',
                        minWidth: '150px',
                        padding: '16px 24px',
                        backgroundColor: 'var(--accent-green)',
                        color: 'var(--bg-primary)',
                        border: 'none',
                        borderRadius: '8px',
                        fontFamily: 'monospace',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      DOWNLOAD IMAGE
                    </button>
                  )}
                </div>
              </>
            )}

            {/* Decode Mode */}
            {mode === 'decode' && (
              <>
                <button
                  onClick={decodeMessage}
                  disabled={isProcessing || !originalImage}
                  style={{
                    width: '100%',
                    padding: '16px 24px',
                    backgroundColor: isProcessing || !originalImage ? 'var(--bg-tertiary)' : 'var(--accent-green)',
                    color: isProcessing || !originalImage ? 'var(--text-muted)' : 'var(--bg-primary)',
                    border: 'none',
                    borderRadius: '8px',
                    fontFamily: 'monospace',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: isProcessing || !originalImage ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    marginBottom: '24px'
                  }}
                >
                  {isProcessing ? 'DECODING...' : 'EXTRACT HIDDEN MESSAGE'}
                </button>

                {decodedMessage && (
                  <div style={{
                    backgroundColor: 'var(--bg-tertiary)',
                    border: '1px solid var(--accent-green)',
                    borderRadius: '8px',
                    padding: '16px'
                  }}>
                    <label style={{
                      display: 'block',
                      fontFamily: 'monospace',
                      fontSize: '12px',
                      color: 'var(--accent-green)',
                      marginBottom: '8px'
                    }}>
                      // decoded_message
                    </label>
                    <p style={{
                      color: 'var(--text-primary)',
                      fontFamily: 'monospace',
                      fontSize: '14px',
                      lineHeight: '1.6',
                      margin: 0,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word'
                    }}>
                      {decodedMessage}
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Status */}
            {status && (
              <div style={{
                marginTop: '24px',
                padding: '12px 16px',
                backgroundColor: 'var(--bg-tertiary)',
                borderRadius: '4px',
                borderLeft: `3px solid ${status.includes('success') || status.includes('encoded') || status.includes('decoded') ? 'var(--accent-green)' : 'var(--accent-cyan)'}`,
                fontFamily: 'monospace',
                fontSize: '13px',
                color: 'var(--text-secondary)'
              }}>
                &gt; {status}
              </div>
            )}
          </div>

          {/* How It Works */}
          <div style={{
            borderTop: '1px solid var(--border-color)',
            padding: '24px 32px',
            backgroundColor: 'var(--bg-tertiary)'
          }}>
            <h4 style={{
              fontFamily: 'monospace',
              fontSize: '14px',
              color: 'var(--accent-cyan)',
              marginBottom: '16px'
            }}>
              // how_lsb_steganography_works
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              <div style={{
                backgroundColor: 'var(--bg-card)',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>1.</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: 0 }}>
                  Each pixel has RGB values (0-255). In binary, the last bit is "least significant"
                </p>
              </div>
              <div style={{
                backgroundColor: 'var(--bg-card)',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>2.</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: 0 }}>
                  We convert the message to binary and replace LSBs with message bits
                </p>
              </div>
              <div style={{
                backgroundColor: 'var(--bg-card)',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>3.</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: 0 }}>
                  Changing only the LSB alters colors by at most 1 unit - invisible to human eyes
                </p>
              </div>
              <div style={{
                backgroundColor: 'var(--bg-card)',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>4.</div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '13px', margin: 0 }}>
                  To decode, we extract all LSBs and convert back to text
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
