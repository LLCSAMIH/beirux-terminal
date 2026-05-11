'use client';

import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { useInView } from '@/hooks/useInView';
import s from './d4.module.scss';

/* ─── data ─── */

const SERVICES = [
  { name: 'Web Platforms', stat: '12 shipped' },
  { name: 'AI Agents', stat: '4 running 24/7' },
  { name: 'E-Commerce', stat: '3 stores live' },
  { name: 'Mobile Apps', stat: 'Cross-platform' },
  { name: 'Growth Ops', stat: '+34% avg ROI' },
  { name: 'Branding', stat: '100% custom' },
  { name: 'Infrastructure', stat: '99.9% uptime' },
  { name: 'Automation', stat: '0 manual steps' },
];

const PILL_POSITIONS: Array<{ top: string; left: string; rotate: string }> = [
  { top: '8%',  left: '5%',  rotate: '-4deg' },
  { top: '6%',  left: '55%', rotate: '3deg' },
  { top: '28%', left: '30%', rotate: '-2deg' },
  { top: '32%', left: '68%', rotate: '5deg' },
  { top: '52%', left: '8%',  rotate: '2deg' },
  { top: '48%', left: '52%', rotate: '-3deg' },
  { top: '72%', left: '20%', rotate: '4deg' },
  { top: '70%', left: '62%', rotate: '-5deg' },
];

const PILL_COLORS = [
  'pillViolet', 'pillSky', 'pillPink', 'pillMint',
  'pillPeach', 'pillLavender', 'pillLemon', 'pillRose',
] as const;

const CLIENTS = [
  { name: 'Cartley LLC', type: 'SaaS Platform', result: 'Full-stack build shipped in 4 weeks, from schema to production.' },
  { name: 'Steven Paul Diamonds', type: 'E-Commerce', result: 'High-end storefront with 3D product views and custom checkout.' },
  { name: 'Adonis Market', type: 'Marketplace', result: 'Two-sided marketplace with vendor onboarding and payment splits.' },
  { name: 'Rides With Vinnie', type: 'Mobile App', result: 'Cross-platform app with real-time GPS and booking engine.' },
  { name: 'Key Vision LLC', type: 'Web Platform', result: 'Data visualization platform with client portals and API integrations.' },
];

const CLIENT_ANGLES = [-8, -3, 2, 6, -5];
const CLIENT_OFFSETS = [
  { x: -60, y: 20 },
  { x: -20, y: -30 },
  { x: 30, y: 10 },
  { x: 70, y: -20 },
  { x: 10, y: 40 },
];

const MANIFESTO_WORDS = 'Every project starts from first principles. Your business is not a template. We don\'t hand off and disappear. We build with you, ship for real, and stay.'.split(' ');

const BUBBLES = [
  { label: '12 Projects', size: 200 },
  { label: '4 AI Agents', size: 160 },
  { label: '5 Clients', size: 155 },
  { label: '92% Satisfaction', size: 130 },
  { label: '0 Templates', size: 115 },
];

const BUBBLE_POSITIONS = [
  { top: '12%', left: '22%' },
  { top: '8%',  left: '65%' },
  { top: '45%', left: '12%' },
  { top: '42%', left: '72%' },
  { top: '72%', left: '42%' },
];

const CARD_COUNT = 6;

/* ─── dot nav ─── */

function DotNav({ active }: { active: number }) {
  return (
    <div className={s.dotNav}>
      {Array.from({ length: CARD_COUNT }).map((_, i) => (
        <div
          key={i}
          className={`${s.dot} ${i === active ? s.dotActive : ''}`}
        />
      ))}
    </div>
  );
}

/* ─── card 1: hero ─── */

function HeroCard() {
  return (
    <section className={`${s.card} ${s.cardHero}`}>
      <div className={s.blobField}>
        <div className={`${s.blob} ${s.blob1}`} />
        <div className={`${s.blob} ${s.blob2}`} />
        <div className={`${s.blob} ${s.blob3}`} />
        <div className={`${s.blob} ${s.blob4}`} />
      </div>
      <h1 className={s.heroTitle}>BEIRUX</h1>
    </section>
  );
}

/* ─── card 2: services ─── */

function ServicesCard() {
  const { ref, isVisible } = useInView({ threshold: 0.3 });

  return (
    <section ref={ref} className={`${s.card} ${s.cardServices}`}>
      <div className={s.servicesField}>
        {SERVICES.map((svc, i) => (
          <div
            key={svc.name}
            className={`${s.pill} ${s[PILL_COLORS[i]]} ${isVisible ? s.pillVisible : ''}`}
            style={{
              top: PILL_POSITIONS[i].top,
              left: PILL_POSITIONS[i].left,
              transform: `rotate(${PILL_POSITIONS[i].rotate})`,
              transitionDelay: isVisible ? `${i * 90}ms` : '0ms',
            }}
          >
            <span className={s.pillName}>{svc.name}</span>
            <span className={s.pillStat}>{svc.stat}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── card 3: manifesto ─── */

function ManifestoCard() {
  const { ref, isVisible } = useInView({ threshold: 0.4 });
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let count = 0;
    const total = MANIFESTO_WORDS.length;
    const interval = setInterval(() => {
      count += 1;
      setWordCount(count);
      if (count >= total) clearInterval(interval);
    }, 80);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section ref={ref} className={`${s.card} ${s.cardManifesto}`}>
      <div className={s.manifestoGlow} />
      <p className={s.manifestoText}>
        {MANIFESTO_WORDS.map((word, i) => (
          <span
            key={i}
            className={`${s.manifestoWord} ${i < wordCount ? s.manifestoWordVisible : ''}`}
          >
            {word}{' '}
          </span>
        ))}
      </p>
    </section>
  );
}

/* ─── card 4: client stories ─── */

function ClientsCard() {
  const { ref, isVisible } = useInView({ threshold: 0.3 });

  return (
    <section ref={ref} className={`${s.card} ${s.cardClients}`}>
      <h2 className={s.clientsHeading}>Client stories</h2>
      <div className={s.clientsFan}>
        {CLIENTS.map((client, i) => (
          <div
            key={client.name}
            className={`${s.clientCard} ${isVisible ? s.clientCardVisible : ''}`}
            style={{
              transform: isVisible
                ? `translate(${CLIENT_OFFSETS[i].x}px, ${CLIENT_OFFSETS[i].y}px) rotate(${CLIENT_ANGLES[i]}deg)`
                : 'translate(0, 40px) rotate(0deg)',
              zIndex: CLIENTS.length - i,
              transitionDelay: isVisible ? `${i * 80}ms` : '0ms',
            }}
          >
            <span className={s.clientType}>{client.type}</span>
            <h3 className={s.clientName}>{client.name}</h3>
            <p className={s.clientResult}>{client.result}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── card 5: metric bubbles ─── */

function BubblesCard() {
  const { ref, isVisible } = useInView({ threshold: 0.3 });

  return (
    <section ref={ref} className={`${s.card} ${s.cardBubbles}`}>
      <div className={s.bubblesField}>
        {BUBBLES.map((bubble, i) => (
          <div
            key={bubble.label}
            className={`${s.bubble} ${s[`bubble${i}`]} ${isVisible ? s.bubbleVisible : ''}`}
            style={{
              width: bubble.size,
              height: bubble.size,
              top: BUBBLE_POSITIONS[i].top,
              left: BUBBLE_POSITIONS[i].left,
              transitionDelay: isVisible ? `${i * 120}ms` : '0ms',
            }}
          >
            <span className={s.bubbleLabel}>{bubble.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── card 6: contact ─── */

function ContactCard() {
  const { ref, isVisible } = useInView({ threshold: 0.3 });

  return (
    <section ref={ref} className={`${s.card} ${s.cardContact}`}>
      <div className={`${s.contactOrb} ${isVisible ? s.contactOrbVisible : ''}`} />
      <div className={`${s.contactContent} ${isVisible ? s.contactContentVisible : ''}`}>
        <a href="mailto:samih@beirux.com" className={s.contactEmail}>
          samih@beirux.com
        </a>
      </div>
    </section>
  );
}

/* ─── page ─── */

export default function D4Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeCard, setActiveCard] = useState(0);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const scrollTop = container.scrollTop;
    const cardHeight = container.clientHeight;
    const index = Math.round(scrollTop / cardHeight);
    setActiveCard(Math.min(index, CARD_COUNT - 1));
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div ref={containerRef} className={s.snapContainer}>
      <DotNav active={activeCard} />
      <HeroCard />
      <ServicesCard />
      <ManifestoCard />
      <ClientsCard />
      <BubblesCard />
      <ContactCard />
    </div>
  );
}
