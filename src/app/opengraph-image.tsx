import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Keystone Gym - Elite Combat Training Montreal';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#050505',
          position: 'relative',
        }}
      >
        {/* Subtle border */}
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            right: 20,
            bottom: 20,
            border: '2px solid #D4AF37',
            display: 'flex',
          }}
        />

        {/* Keystone Icon */}
        <svg
          width="120"
          height="120"
          viewBox="0 0 24 24"
          fill="#D4AF37"
          style={{ marginBottom: 30 }}
        >
          <path d="M3 3L6 21H18L21 3H3Z" />
        </svg>

        {/* Text */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span
            style={{
              fontSize: 80,
              fontWeight: 900,
              color: '#D4AF37',
              letterSpacing: '-0.05em',
              textTransform: 'uppercase',
            }}
          >
            KEYSTONE
          </span>
          <span
            style={{
              fontSize: 28,
              color: '#a1a1aa',
              marginTop: 10,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}
          >
            Elite Combat Training • Montreal
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
