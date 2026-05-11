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
  { id: 'd5', name: 'Tape Deck', desc: 'Scroll-hijack CRT frame, horizontal tape reel, VHS scanlines.' },
  { id: 'd6', name: 'Swiss Razor', desc: 'No nav, single column, extreme negative space, radical reduction.' },
  { id: 'd7', name: 'Apple Theatrical', desc: 'Sticky reveal cinema, pinned sections, scroll-driven sequences.' },
  { id: 'd8', name: 'Stripe Gradient', desc: 'Layered parallax depth over animated mesh gradient background.' },
  { id: 'd9', name: 'Linear Command', desc: 'Command palette (Cmd+K) as primary navigation, dark developer tool.' },
  { id: 'd10', name: 'Neubrutalist Overlap', desc: 'Overlapping rotated panels, hard shadows, vivid flat colors.' },
  { id: 'd11', name: 'Kinetic Statement', desc: 'One word per viewport, text IS the design, zero decoration.' },
  { id: 'd12', name: 'Nothing Industrial', desc: 'Exposed dot-grid, content placed by coordinates, technical drawing.' },
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
        BEIRUX — 18 Directions
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
