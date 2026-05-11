'use client';

import { useMemo } from 'react';
import { useInView } from '@/hooks/useInView';
import { useStickyScroll } from '@/hooks/useStickyScroll';
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

const MANIFESTO_WORDS = 'Every project starts from first principles. Your business is not a template. We don\'t hand off and disappear. We build with you, ship for real, and stay.'.split(' ');

const BUBBLES = [
  { label: '12 Projects', size: 200 },
  { label: '4 AI Agents', size: 150 },
  { label: '5 Clients', size: 150 },
  { label: '92% Satisfaction', size: 120 },
  { label: '0 Templates', size: 110 },
];

/* ─── sections ─── */

function FloatingHero() {
  return (
    <section className={s.hero}>
      <div className={s.blobField}>
        <div className={`${s.blob} ${s.blob1}`} />
        <div className={`${s.blob} ${s.blob2}`} />
        <div className={`${s.blob} ${s.blob3}`} />
        <div className={`${s.blob} ${s.blob4}`} />
      </div>
      <div className={s.heroContent}>
        <h1 className={s.heroTitle}>
          <span className={s.wordWe}>We</span>{' '}
          <span className={s.wordBuild}>build</span>{' '}
          <span className={s.wordBeautiful}>beautiful</span>{' '}
          <span className={s.wordThings}>things.</span>
        </h1>
        <p className={s.heroTagline}>
          AI agency + web design from Miami. Four agents. Five clients. Twelve projects shipped.
        </p>
      </div>
    </section>
  );
}

function PillServices() {
  const { ref, isVisible } = useInView({ threshold: 0.15 });
  return (
    <section ref={ref} className={s.pills}>
      <div className={s.pillsWrap}>
        {SERVICES.map((svc, i) => (
          <div
            key={svc.name}
            className={`${s.pill} ${s[PILL_COLORS[i % PILL_COLORS.length]]} ${isVisible ? s.pillVisible : ''}`}
            style={{ transitionDelay: isVisible ? `${i * 70}ms` : '0ms' }}
          >
            <span className={s.pillName}>{svc.name}</span>
            <span className={s.pillStat}>{svc.stat}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function StackedCards() {
  const { wrapperRef, progress } = useStickyScroll();

  return (
    <div ref={wrapperRef} className={s.cardsWrapper}>
      <div className={s.cardsSticky}>
        <h2 className={s.cardsHeading}>Client stories</h2>
        <div className={s.cardsDeck}>
          {CLIENTS.map((client, i) => {
            const total = CLIENTS.length;
            const cardStart = i / total;
            const cardEnd = (i + 1) / total;
            const cardProgress = Math.max(0, Math.min(1, (progress - cardStart) / (cardEnd - cardStart)));

            const baseRotation = (i - Math.floor(total / 2)) * 3;
            const rotation = baseRotation * (1 - cardProgress);
            const yOffset = (total - 1 - i) * 8 * (1 - cardProgress);
            const scale = 0.95 + 0.05 * cardProgress;
            const spreadX = (i - Math.floor(total / 2)) * 80 * cardProgress;

            return (
              <div
                key={client.name}
                className={s.card}
                style={{
                  transform: `translate(${spreadX}px, ${-yOffset}px) rotate(${rotation}deg) scale(${scale})`,
                  zIndex: i,
                }}
              >
                <span className={s.cardType}>{client.type}</span>
                <h3 className={s.cardName}>{client.name}</h3>
                <p className={s.cardResult}>{client.result}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function GradientManifesto() {
  const { wrapperRef, progress } = useStickyScroll();

  const visibleCount = Math.floor(progress * (MANIFESTO_WORDS.length + 4));

  return (
    <div ref={wrapperRef} className={s.manifestoWrapper}>
      <div className={s.manifestoSticky}>
        <div className={s.manifestoGradient} />
        <p className={s.manifestoText}>
          {MANIFESTO_WORDS.map((word, i) => (
            <span
              key={i}
              className={`${s.manifestoWord} ${i < visibleCount ? s.manifestoWordVisible : ''}`}
            >
              {word}{' '}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

function MetricBubbles() {
  const { ref, isVisible } = useInView({ threshold: 0.15 });

  const positions = useMemo(() => [
    { top: '10%', left: '50%', translateX: '-50%' },
    { top: '35%', left: '15%', translateX: '0' },
    { top: '30%', left: '75%', translateX: '0' },
    { top: '65%', left: '30%', translateX: '0' },
    { top: '60%', left: '68%', translateX: '0' },
  ], []);

  return (
    <section ref={ref} className={s.bubbles}>
      <div className={s.bubblesField}>
        {BUBBLES.map((bubble, i) => (
          <div
            key={bubble.label}
            className={`${s.bubble} ${s[`bubble${i}`]} ${isVisible ? s.bubbleVisible : ''}`}
            style={{
              width: bubble.size,
              height: bubble.size,
              top: positions[i].top,
              left: positions[i].left,
              transform: `translateX(${positions[i].translateX})`,
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

function SoftCTA() {
  const { ref, isVisible } = useInView({ threshold: 0.2 });

  return (
    <section ref={ref} className={`${s.cta} ${isVisible ? s.ctaVisible : ''}`}>
      <div className={s.ctaOrbs}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={`${s.ctaOrb} ${s[`ctaOrb${i}`]}`} />
        ))}
      </div>
      <h2 className={s.ctaTitle}>Let&apos;s make something.</h2>
      <div className={s.ctaInput}>
        <span className={s.ctaEmail}>samih@beirux.com</span>
        <span className={s.ctaArrow}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </div>
    </section>
  );
}

/* ─── page ─── */

export default function D4Page() {
  return (
    <main className={s.page}>
      <FloatingHero />
      <PillServices />
      <StackedCards />
      <GradientManifesto />
      <MetricBubbles />
      <SoftCTA />
    </main>
  );
}
