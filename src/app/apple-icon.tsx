import { ImageResponse } from 'next/og';

export const size = {
  width: 180,
  height: 180,
};
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 72,
          background: 'linear-gradient(135deg, #0a0a0f 0%, #0d1117 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 32,
          border: '4px solid #00ffff',
          fontFamily: 'monospace',
          fontWeight: 'bold',
          color: '#00ffff',
        }}
      >
        JT
      </div>
    ),
    {
      ...size,
    }
  );
}
