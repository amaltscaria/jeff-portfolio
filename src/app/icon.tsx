import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 18,
          background: '#0a0a0f',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 4,
          border: '2px solid #00ffff',
          fontFamily: 'monospace',
          fontWeight: 'bold',
          color: '#00ffff',
          textShadow: '0 0 10px #00ffff',
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
