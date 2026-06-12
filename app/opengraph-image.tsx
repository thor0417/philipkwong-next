import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  const monoMedium = readFileSync(
    join(process.cwd(), 'public', 'fonts', 'DMMono-Medium.ttf')
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#0A0A0A',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '72px 80px',
        }}
      >
        {/* Wordmark */}
        <div
          style={{
            fontFamily: 'DM Mono',
            fontWeight: 500,
            fontSize: 96,
            lineHeight: 1,
            letterSpacing: '-0.01em',
            color: '#F9F9F9',
            textTransform: 'uppercase',
            display: 'flex',
          }}
        >
          PHILIP KWONG
        </div>

        {/* Registry line */}
        <div
          style={{
            display: 'flex',
            marginTop: 36,
            fontFamily: 'DM Mono',
            fontWeight: 500,
            fontSize: 18,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ color: '#B34700' }}>[</span>
          <span style={{ color: '#F9F9F9' }}>STRATEGY</span>
          <span style={{ color: 'rgba(249,249,249,0.4)', margin: '0 12px' }}>·</span>
          <span style={{ color: '#F9F9F9' }}>STANDARDS</span>
          <span style={{ color: 'rgba(249,249,249,0.4)', margin: '0 12px' }}>·</span>
          <span style={{ color: '#F9F9F9' }}>COMPLIANCE</span>
          <span style={{ color: '#B34700' }}>]</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'DM Mono',
          data: monoMedium,
          weight: 500,
          style: 'normal',
        },
      ],
    }
  );
}
