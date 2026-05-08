'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView } from '@/hooks/useInView';
import { useStickyScroll } from '@/hooks/useStickyScroll';
import s from './v1.module.scss';

/* ─── data ─── */

const SERVICES = [
  { id: '001', name: 'Digital Products', stat: '12 shipped', detail: 'Web apps, mobile, SaaS platforms. From zero to production.' },
  { id: '002', name: 'AI & Automation', stat: '47 workflows', detail: 'Agents, pipelines, integrations. Systems that run themselves.' },
  { id: '003', name: 'Growth Ops', stat: '3.2x avg ROI', detail: 'SEO, paid, CRO, analytics. Data-driven, no guessing.' },
];

const CLIENTS = [
  'Cartley LLC',
  'Steven Paul Diamonds',
  'Adonis Market',
  'Rides With Vinnie',
  'Key Vision LLC',
];

const STATS = [
  { label: 'Projects shipped', value: '12' },
  { label: 'Templates used', value: '0' },
  { label: 'Custom built', value: '100%' },
  { label: 'Avg delivery', value: '4 wks' },
  { label: 'Client retention', value: '92%' },
  { label: 'Uptime SLA', value: '99.9%' },
];

const SECTIONS = ['INIT', 'SERVICES', 'CLIENTS', 'PROOF', 'CONTACT'];

/* ─── typewriter hook ─── */

function useTypewriter(text: string, active: boolean, speed = 40) {
  const [displayed, setDisplayed] = useState('');
  const indexRef = useRef(0);

  useEffect(() => {
    if (!active) return;
    indexRef.current = 0;
    setDisplayed('');

    const interval = setInterval(() => {
      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, active, speed]);

  return displayed;
}

/* ─── section wrapper with inView ─── */

function Section({ id, children, className }: { id: string; children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useInView({ threshold: 0.1 });
  return (
    <section
      ref={ref}
      id={id}
      className={`${s.section} ${isVisible ? s.visible : ''} ${className || ''}`}
      data-section={id}
    >
      {children}
    </section>
  );
}

/* ─── list-item components (hooks can't live inside .map) ─── */

function ServiceCard({ service }: { service: typeof SERVICES[number] }) {
  const { ref, isVisible } = useInView({ threshold: 0.15 });
  return (
    <div
      ref={ref}
      className={`${s.serviceCard} ${isVisible ? s.serviceCardVisible : ''}`}
    >
      <div className={s.serviceId}>{service.id}</div>
      <h3 className={s.serviceName}>{service.name}</h3>
      <div className={s.serviceStat}>
        <span className={s.serviceStatValue}>{service.stat}</span>
      </div>
      <p className={s.serviceDetail}>{service.detail}</p>
      <div className={s.serviceBar} />
    </div>
  );
}

function ClientRow({ client, index }: { client: string; index: number }) {
  const { ref, isVisible } = useInView({ threshold: 0.2 });
  return (
    <div
      ref={ref}
      className={`${s.clientRow} ${isVisible ? s.clientRowVisible : ''}`}
    >
      <span className={s.clientNumber}>{String(index + 1).padStart(2, '0')}</span>
      <span className={s.clientName}>{client}</span>
      <span className={s.clientDivider} />
      <span className={s.clientStatus}>ACTIVE</span>
    </div>
  );
}

function StatBlock({ stat }: { stat: typeof STATS[number] }) {
  const { ref, isVisible } = useInView({ threshold: 0.2 });
  return (
    <div
      ref={ref}
      className={`${s.statBlock} ${isVisible ? s.statBlockVisible : ''}`}
    >
      <div className={s.statValue}>{stat.value}</div>
      <div className={s.statLabel}>{stat.label}</div>
    </div>
  );
}

/* ─── main page ─── */

export default function V1Page() {
  const { wrapperRef, progress } = useStickyScroll();
  const [currentSection, setCurrentSection] = useState('INIT');
  const [time, setTime] = useState('00:00:00');

  /* clock */
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* section tracker via IntersectionObserver */
  useEffect(() => {
    const ids = ['hero', 'services', 'clients', 'proof', 'cta'];
    const labels = ['INIT', 'SERVICES', 'CLIENTS', 'PROOF', 'CONTACT'];

    const observers: IntersectionObserver[] = [];

    ids.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setCurrentSection(labels[i]);
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, []);

  /* hero phase from sticky progress */
  const heroPhase = Math.floor(progress * 4); // 0-3

  /* inView hooks for individual elements */
  const servicesHead = useInView({ threshold: 0.2 });
  const clientsHead = useInView({ threshold: 0.2 });
  const statsHead = useInView({ threshold: 0.2 });
  const ctaHead = useInView({ threshold: 0.2 });

  /* typewriter for tagline */
  const tagline = useTypewriter('We build. We ship. We show the work.', heroPhase >= 1, 50);

  return (
    <div className={s.page}>
      {/* ─── STATUS BAR ─── */}
      <div className={s.statusBar}>
        <span className={s.statusLeft}>
          <span className={s.statusBlink}>_</span>
          BEIRUX/{currentSection.toLowerCase()}
        </span>
        <span className={s.statusCenter}>
          {SECTIONS.map((sec) => (
            <span
              key={sec}
              className={`${s.statusDot} ${sec === currentSection ? s.statusDotActive : ''}`}
            />
          ))}
        </span>
        <span className={s.statusRight}>{time} EST</span>
      </div>

      {/* ─── HERO: sticky scroll ─── */}
      <div ref={wrapperRef} className={s.heroWrapper} id="hero">
        <div className={s.heroSticky}>
          {/* phase 0: agency name fills screen */}
          <div className={`${s.heroLayer} ${heroPhase === 0 ? s.heroLayerActive : ''}`}>
            <h1 className={s.heroTitle}>BEIRUX</h1>
            <div className={s.heroCornerTag}>DIGITAL AGENCY / MIAMI</div>
          </div>

          {/* phase 1: tagline typewriter */}
          <div className={`${s.heroLayer} ${heroPhase === 1 ? s.heroLayerActive : ''}`}>
            <div className={s.heroTagline}>
              <span className={s.heroTaglineText}>{tagline}</span>
              <span className={s.heroCursor}>|</span>
            </div>
          </div>

          {/* phase 2: stats flash */}
          <div className={`${s.heroLayer} ${heroPhase === 2 ? s.heroLayerActive : ''}`}>
            <div className={s.heroStats}>
              <div className={s.heroStatLine}>12 shipped</div>
              <div className={s.heroStatLine}>0 templates</div>
              <div className={s.heroStatLine}>100% custom</div>
            </div>
          </div>

          {/* phase 3: scroll prompt */}
          <div className={`${s.heroLayer} ${heroPhase >= 3 ? s.heroLayerActive : ''}`}>
            <div className={s.heroScroll}>
              <span className={s.heroScrollArrow}>V</span>
              <span className={s.heroScrollText}>SCROLL TO CONTINUE</span>
            </div>
          </div>

          {/* progress bar at bottom of hero */}
          <div className={s.heroProgress}>
            <div className={s.heroProgressFill} style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      </div>

      {/* ─── SERVICES ─── */}
      <Section id="services" className={s.servicesSection}>
        <div className={s.sectionHeader} ref={servicesHead.ref}>
          <span className={s.sectionIndex}>01</span>
          <h2 className={`${s.sectionTitle} ${servicesHead.isVisible ? s.titleReveal : ''}`}>
            WHAT WE<br />BUILD
          </h2>
        </div>

        <div className={s.servicesGrid}>
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

        {/* raw data strip */}
        <div className={s.dataStrip}>
          <div className={s.dataStripScroll}>
            {Array.from({ length: 3 }).map((_, i) => (
              <span key={i} className={s.dataStripContent}>
                DIGITAL_PRODUCTS::SHIPPED=12 &nbsp;|&nbsp; AI_AUTOMATION::WORKFLOWS=47 &nbsp;|&nbsp; GROWTH_OPS::ROI=3.2X &nbsp;|&nbsp; TEMPLATES_USED=0 &nbsp;|&nbsp; CUSTOM_BUILT=100% &nbsp;|&nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── CLIENTS ─── */}
      <Section id="clients" className={s.clientsSection}>
        <div className={s.sectionHeader} ref={clientsHead.ref}>
          <span className={s.sectionIndex}>02</span>
          <h2 className={`${s.sectionTitle} ${clientsHead.isVisible ? s.titleReveal : ''}`}>
            WHO WE<br />SHIP FOR
          </h2>
        </div>

        <div className={s.clientsList}>
          {CLIENTS.map((client, i) => (
            <ClientRow key={client} client={client} index={i} />
          ))}
        </div>
      </Section>

      {/* ─── PROOF / STATS ─── */}
      <Section id="proof" className={s.proofSection}>
        <div className={s.sectionHeader} ref={statsHead.ref}>
          <span className={s.sectionIndex}>03</span>
          <h2 className={`${s.sectionTitle} ${statsHead.isVisible ? s.titleReveal : ''}`}>
            RAW<br />DATA
          </h2>
        </div>

        <div className={s.statsGrid}>
          {STATS.map((stat) => (
            <StatBlock key={stat.label} stat={stat} />
          ))}
        </div>

        <div className={s.proofQuote}>
          <span className={s.proofQuoteMark}>&gt;</span>
          No case studies. No decks. Ship the product, show the dashboard.
        </div>
      </Section>

      {/* ─── CTA ─── */}
      <Section id="cta" className={s.ctaSection}>
        <div ref={ctaHead.ref} className={`${s.ctaInner} ${ctaHead.isVisible ? s.ctaVisible : ''}`}>
          <h2 className={s.ctaTitle}>LET&apos;S<br />BUILD</h2>
          <div className={s.ctaMeta}>
            <span>samih@beirux.com</span>
            <span className={s.ctaDivider}>/</span>
            <span>Miami, FL</span>
          </div>
          <a href="mailto:samih@beirux.com" className={s.ctaButton}>
            <span className={s.ctaButtonText}>INITIATE CONTACT</span>
            <span className={s.ctaButtonArrow}>&rarr;</span>
          </a>
          <div className={s.ctaTerminal}>
            <span className={s.ctaPrompt}>$</span> beirux --new-project --client=you
          </div>
        </div>
      </Section>

      {/* ─── FOOTER ─── */}
      <footer className={s.footer}>
        <div className={s.footerLeft}>
          <span>&copy; BEIRUX 2026</span>
        </div>
        <div className={s.footerRight}>
          <span>ALL RIGHTS RESERVED</span>
          <span className={s.footerDot} />
          <span>MIAMI FL</span>
        </div>
      </footer>
    </div>
  );
}
