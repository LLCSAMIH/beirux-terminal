'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from '@/hooks/useInView';
import s from './d8.module.scss';

/* ── data ── */

const FEATURES = [
  {
    title: 'AI Agents',
    desc: 'Autonomous systems that handle ops, publishing, and client management around the clock.',
  },
  {
    title: 'Web Systems',
    desc: 'Performance-first sites and apps built on modern stacks, deployed continuously.',
  },
  {
    title: 'Growth Ops',
    desc: 'SEO, analytics, and automation pipelines that compound organic reach over time.',
  },
  {
    title: 'Automation',
    desc: 'End-to-end workflow automation: from intake to delivery, zero manual steps.',
  },
];

const STATS = [
  { value: '12', label: 'Projects shipped' },
  { value: '4', label: 'Active AI agents' },
  { value: '99.9%', label: 'Uptime' },
  { value: '0', label: 'Templates used' },
];

const CODE_LINES = [
  { prompt: true, text: 'curl -X POST https://api.beirux.com/v1/deploy \\' },
  { prompt: false, text: '  -H "Authorization: Bearer $BEIRUX_KEY" \\' },
  { prompt: false, text: '  -H "Content-Type: application/json" \\' },
  { prompt: false, text: '  -d \'{' },
  { prompt: false, text: '    "project": "client-storefront",' },
  { prompt: false, text: '    "stack": "next15-app-router",' },
  { prompt: false, text: '    "agents": ["seo", "analytics", "monitor"],' },
  { prompt: false, text: '    "auto_scale": true' },
  { prompt: false, text: '  }\'' },
  { prompt: false, text: '' },
  { prompt: false, text: '# Response:' },
  { prompt: false, text: '# {' },
  { prompt: false, text: '#   "status": "deployed",' },
  { prompt: false, text: '#   "url": "https://client.beirux.dev",' },
  { prompt: false, text: '#   "agents_active": 3,' },
  { prompt: false, text: '#   "build_time": "8.2s"' },
  { prompt: false, text: '# }' },
];

/* ── components ── */

function FadeIn({ children, className }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useInView({ threshold: 0.15 });
  return (
    <div
      ref={ref}
      className={`${s.fadeIn} ${isVisible ? s.fadeInVisible : ''} ${className ?? ''}`}
    >
      {children}
    </div>
  );
}

/* ── page ── */

export default function D8Page() {
  const [scrollY, setScrollY] = useState(0);
  const rafRef = useRef(0);

  useEffect(() => {
    function onScroll() {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const midOffset = scrollY * 0.3;

  return (
    <div className={s.page}>
      {/* ── floating nav ── */}
      <nav className={s.nav}>
        <span className={s.navLogo}>BEIRUX</span>
        <a href="mailto:samih@beirux.com" className={s.navContact}>Contact</a>
      </nav>

      {/* ── animated gradient background (layer 1) ── */}
      <div className={s.gradientBg} aria-hidden="true" />

      {/* ── mid layer: large decorative typography (layer 2) ── */}
      <div
        className={s.midLayer}
        style={{ transform: `translateY(${-midOffset}px)` }}
        aria-hidden="true"
      >
        <span className={s.midText}>BUILD</span>
        <span className={s.midText} data-offset="2">SHIP</span>
        <span className={s.midText} data-offset="3">SCALE</span>
      </div>

      {/* ── foreground content (layer 3) ── */}
      <div className={s.content}>
        {/* hero */}
        <section className={s.hero}>
          <FadeIn>
            <p className={s.heroTag}>Digital infrastructure for ambitious brands</p>
          </FadeIn>
          <FadeIn>
            <h1 className={s.heroTitle}>
              We build systems<br />
              that run themselves.
            </h1>
          </FadeIn>
          <FadeIn>
            <p className={s.heroSub}>
              BEIRUX ships production software, deploys AI agents, and automates growth
              -- so you can focus on the business, not the plumbing.
            </p>
          </FadeIn>
          <FadeIn>
            <div className={s.heroCtas}>
              <a href="mailto:samih@beirux.com" className={s.btnPrimary}>
                Start a project
              </a>
              <a href="#work" className={s.btnGhost}>
                See the work
              </a>
            </div>
          </FadeIn>
        </section>

        {/* code block */}
        <section className={s.codeSection} id="work">
          <FadeIn>
            <div className={s.terminal}>
              <div className={s.terminalBar}>
                <span className={s.terminalDot} />
                <span className={s.terminalDot} />
                <span className={s.terminalDot} />
                <span className={s.terminalTitle}>terminal</span>
              </div>
              <pre className={s.terminalBody}>
                {CODE_LINES.map((line, i) => (
                  <div key={i} className={s.codeLine}>
                    {line.prompt && <span className={s.codePrompt}>$&nbsp;</span>}
                    <span>{line.text}</span>
                  </div>
                ))}
              </pre>
            </div>
          </FadeIn>
        </section>

        {/* features */}
        <section className={s.features}>
          <FadeIn>
            <h2 className={s.sectionHeading}>What we build</h2>
          </FadeIn>
          <div className={s.featureGrid}>
            {FEATURES.map((f) => (
              <FadeIn key={f.title}>
                <div className={s.featureCard}>
                  <h3 className={s.featureTitle}>{f.title}</h3>
                  <p className={s.featureDesc}>{f.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* stats */}
        <section className={s.stats}>
          <FadeIn>
            <h2 className={s.sectionHeading}>By the numbers</h2>
          </FadeIn>
          <div className={s.statsGrid}>
            {STATS.map((stat) => (
              <FadeIn key={stat.label}>
                <div className={s.statCard}>
                  <span className={s.statValue}>{stat.value}</span>
                  <span className={s.statLabel}>{stat.label}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </section>

        {/* cta */}
        <section className={s.ctaSection}>
          <FadeIn>
            <h2 className={s.ctaHeading}>Ready to ship?</h2>
            <p className={s.ctaSub}>
              No decks. No discovery phases. Tell us what you need and we will scope it in 24 hours.
            </p>
            <a href="mailto:samih@beirux.com" className={s.btnPrimary}>
              samih@beirux.com
            </a>
          </FadeIn>
        </section>
      </div>
    </div>
  );
}
