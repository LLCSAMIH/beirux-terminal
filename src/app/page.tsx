import Link from 'next/link';

const VERSIONS = [
  { id: 'v1', name: 'Brutalist Editorial', desc: 'Massive type, broken grid, raw honesty. Anti-template.' },
  { id: 'v2', name: 'Liquid Glass', desc: 'Layered depth, iridescent panels, light play.' },
  { id: 'v3', name: 'Swiss Precision', desc: 'Rigid grid, radical restraint, every pixel intentional.' },
  { id: 'v4', name: 'Terminal', desc: 'Code aesthetic. The agency as living software.' },
  { id: 'v5', name: 'Cinematic Editorial', desc: 'High-fashion meets tech keynote. Dramatic, slow, luxe.' },
  { id: 'd1', name: 'Mission Control', desc: 'Dark dashboard, glassmorphism, agent roster, telemetry bars.' },
  { id: 'd2', name: 'Editorial Broadsheet', desc: 'Newspaper masthead, Playfair serif, 3-column layouts, classified CTA.' },
  { id: 'd3', name: 'Neon Architects', desc: 'Blueprint grid, neon cyan outlines, diamond nodes, spec sheets.' },
  { id: 'd4', name: 'Soft Machine', desc: 'Light, organic, pastel gradient blobs, floating pills, fanning cards.' },
  { id: 'd5', name: 'Tape Deck', desc: 'VHS scanlines, Anton font, hot pink + green offsets, frequency bars.' },
  { id: 'd6', name: 'Swiss Razor', desc: 'Ultra-minimal B&W + blue, radical negative space, zero decoration.' },
  { id: 'joby', name: 'Joby Study', desc: 'Design language replica of jobyaviation.com. Reference only.' },
];

export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#08080c',
      color: '#eee',
      fontFamily: 'var(--font-sora), system-ui',
      padding: '8rem 4rem',
    }}>
      <h1 style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', fontWeight: 700, marginBottom: '1rem', letterSpacing: '-0.03em' }}>
        BEIRUX — 12 Directions
      </h1>
      <p style={{ fontSize: '1.6rem', opacity: 0.5, marginBottom: '6rem' }}>
        Pick a direction. Each is a complete landing page.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(28rem, 1fr))', gap: '2rem' }}>
        {VERSIONS.map(v => (
          <Link
            key={v.id}
            href={`/${v.id}`}
            style={{
              display: 'block',
              padding: '3.2rem',
              borderRadius: '1.2rem',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.03)',
              transition: 'border-color .3s, background .3s',
            }}
          >
            <span style={{ fontSize: '1.2rem', opacity: 0.4, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {v.id}
            </span>
            <h2 style={{ fontSize: '2.4rem', fontWeight: 600, margin: '0.8rem 0', letterSpacing: '-0.02em' }}>
              {v.name}
            </h2>
            <p style={{ fontSize: '1.4rem', opacity: 0.5, lineHeight: 1.5 }}>{v.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
