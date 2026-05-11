'use client';

import { useStickyScroll } from '@/hooks/useStickyScroll';
import s from './d7.module.scss';

/* --- data --- */

const BRAND_NAME = 'BEIRUX';

const SERVICES = [
  { word: 'Web Platforms', from: 'left' },
  { word: 'AI Agents', from: 'right' },
  { word: 'Growth Ops', from: 'top' },
  { word: 'Automation', from: 'bottom' },
  { word: 'E-Commerce', from: 'left' },
  { word: 'Mobile Apps', from: 'right' },
  { word: 'Branding', from: 'top' },
  { word: 'Infrastructure', from: 'bottom' },
];

const STATS = [
  { value: 12, label: 'Projects Shipped', suffix: '' },
  { value: 4, label: 'Active AI Agents', suffix: '' },
  { value: 92, label: 'Client Satisfaction', suffix: '%' },
  { value: 0, label: 'Templates Used', suffix: '' },
];

/* --- helpers --- */

function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t;
}

function clampUnit(value: number): number {
  return Math.max(0, Math.min(1, value));
}

/** Map a global progress [rangeStart, rangeEnd] to a local [0, 1] */
function subProgress(progress: number, rangeStart: number, rangeEnd: number): number {
  return clampUnit((progress - rangeStart) / (rangeEnd - rangeStart));
}

/* --- Section 1: Letter-by-letter brand reveal --- */

function SectionHero() {
  const { wrapperRef, progress } = useStickyScroll();

  // Phase 1 (0-0.5): letters fade in one by one
  // Phase 2 (0.5-1.0): text scales down, moves to top-left
  const letterProgress = subProgress(progress, 0, 0.5);
  const exitProgress = subProgress(progress, 0.5, 1.0);

  const letters = BRAND_NAME.split('');

  return (
    <div ref={wrapperRef} className={s.sectionWrapper} style={{ height: '400vh' }}>
      <div className={s.stickyInner}>
        <div className={s.heroContent}>
          <h1
            className={s.heroTitle}
            style={{
              transform: exitProgress > 0
                ? `scale(${lerp(1, 0.15, exitProgress)}) translate(${lerp(0, -180, exitProgress)}%, ${lerp(0, -200, exitProgress)}%)`
                : undefined,
              opacity: exitProgress > 0.9 ? lerp(1, 0, subProgress(exitProgress, 0.9, 1)) : 1,
            }}
          >
            {letters.map((char, i) => {
              const threshold = i / letters.length;
              const charOpacity = clampUnit((letterProgress - threshold) * letters.length);
              return (
                <span
                  key={i}
                  className={s.heroLetter}
                  style={{
                    opacity: charOpacity,
                    transform: `translateY(${lerp(12, 0, charOpacity)}px)`,
                  }}
                >
                  {char}
                </span>
              );
            })}
          </h1>
          <p
            className={s.heroTagline}
            style={{
              opacity: clampUnit(letterProgress * 2 - 0.8) * (1 - exitProgress),
              transform: `translateY(${lerp(8, 0, clampUnit(letterProgress * 2 - 0.8))}px)`,
            }}
          >
            Digital agency. Zero templates.
          </p>
        </div>
      </div>
    </div>
  );
}

/* --- Section 2: Gradient orb zoom --- */

function SectionOrb() {
  const { wrapperRef, progress } = useStickyScroll();

  // Phase 1 (0-0.6): orb grows from tiny to viewport-filling
  // Phase 2 (0.6-1.0): content inside fades in
  const orbScale = subProgress(progress, 0, 0.6);
  const contentFade = subProgress(progress, 0.55, 0.85);

  const orbDiameter = lerp(20, 200, orbScale); // vmin units

  return (
    <div ref={wrapperRef} className={s.sectionWrapper} style={{ height: '400vh' }}>
      <div className={s.stickyInner}>
        <div className={s.orbScene}>
          <div
            className={s.orb}
            style={{
              width: `${orbDiameter}vmin`,
              height: `${orbDiameter}vmin`,
            }}
          />
          <div
            className={s.orbContent}
            style={{
              opacity: contentFade,
              transform: `translateY(${lerp(10, 0, contentFade)}px)`,
            }}
          >
            <p className={s.orbHeadline}>We build from first principles.</p>
            <p className={s.orbSub}>
              Your business is not a template. We don&apos;t hand off and disappear.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- Section 3: Service words fly in --- */

function SectionServices() {
  const { wrapperRef, progress } = useStickyScroll();

  // Staggered entrance: each word flies in from its direction
  // Phase 1 (0-0.7): words fly in
  // Phase 2 (0.7-1.0): arranged words pulse/glow

  return (
    <div ref={wrapperRef} className={s.sectionWrapper} style={{ height: '500vh' }}>
      <div className={s.stickyInner}>
        <div className={s.servicesScene}>
          <p className={s.servicesLabel} style={{ opacity: subProgress(progress, 0, 0.15) }}>
            What we do
          </p>
          <div className={s.servicesGrid}>
            {SERVICES.map((svc, i) => {
              const stagger = i / SERVICES.length;
              const wordP = subProgress(progress, stagger * 0.4, stagger * 0.4 + 0.35);

              const offsets: Record<string, { x: number; y: number }> = {
                left:   { x: -40, y: 0 },
                right:  { x: 40,  y: 0 },
                top:    { x: 0,   y: -30 },
                bottom: { x: 0,   y: 30 },
              };

              const offset = offsets[svc.from];
              const tx = lerp(offset.x, 0, wordP);
              const ty = lerp(offset.y, 0, wordP);

              // Glow phase
              const glowP = subProgress(progress, 0.75, 1.0);
              const glowOpacity = glowP > 0 ? 0.4 + Math.sin((glowP + i * 0.15) * Math.PI) * 0.3 : 0;

              return (
                <div
                  key={svc.word}
                  className={s.serviceWord}
                  style={{
                    opacity: wordP,
                    transform: `translate(${tx}vw, ${ty}vh)`,
                    textShadow: glowP > 0
                      ? `0 0 ${30 * glowOpacity}px rgba(0, 113, 227, ${glowOpacity})`
                      : 'none',
                  }}
                >
                  {svc.word}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- Section 4: Counting stats --- */

function SectionStats() {
  const { wrapperRef, progress } = useStickyScroll();

  return (
    <div ref={wrapperRef} className={s.sectionWrapper} style={{ height: '350vh' }}>
      <div className={s.stickyInner}>
        <div className={s.statsScene}>
          <p
            className={s.statsLabel}
            style={{ opacity: subProgress(progress, 0, 0.15) }}
          >
            The numbers
          </p>
          <div className={s.statsGrid}>
            {STATS.map((stat, i) => {
              const stagger = i / STATS.length;
              const countP = subProgress(progress, stagger * 0.2 + 0.05, stagger * 0.2 + 0.55);
              const currentValue = Math.round(lerp(0, stat.value, countP));
              const fadeIn = subProgress(progress, stagger * 0.2, stagger * 0.2 + 0.15);

              return (
                <div
                  key={stat.label}
                  className={s.statCell}
                  style={{
                    opacity: fadeIn,
                    transform: `translateY(${lerp(12, 0, fadeIn)}px)`,
                  }}
                >
                  <span className={s.statValue}>
                    {currentValue}{stat.suffix}
                  </span>
                  <span className={s.statLabel}>{stat.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- Section 5: CTA --- */

function SectionCTA() {
  const { wrapperRef, progress } = useStickyScroll();

  const fadeIn = subProgress(progress, 0.05, 0.4);
  const emailFade = subProgress(progress, 0.3, 0.6);

  return (
    <div ref={wrapperRef} className={s.sectionWrapper} style={{ height: '300vh' }}>
      <div className={s.stickyInner}>
        <div className={s.ctaScene}>
          <div className={s.ctaGlow} style={{ opacity: fadeIn * 0.6 }} />
          <h2
            className={s.ctaHeadline}
            style={{
              opacity: fadeIn,
              transform: `translateY(${lerp(16, 0, fadeIn)}px) scale(${lerp(0.95, 1, fadeIn)})`,
            }}
          >
            Let&apos;s build something real.
          </h2>
          <a
            href="mailto:samih@beirux.com"
            className={s.ctaEmail}
            style={{
              opacity: emailFade,
              transform: `translateY(${lerp(10, 0, emailFade)}px)`,
            }}
          >
            samih@beirux.com
          </a>
          <p
            className={s.ctaLocation}
            style={{
              opacity: emailFade,
              transform: `translateY(${lerp(8, 0, emailFade)}px)`,
            }}
          >
            New Jersey, USA
          </p>
        </div>
      </div>
    </div>
  );
}

/* --- Page --- */

export default function D7Page() {
  return (
    <div className={s.page}>
      <SectionHero />
      <SectionOrb />
      <SectionServices />
      <SectionStats />
      <SectionCTA />
    </div>
  );
}
