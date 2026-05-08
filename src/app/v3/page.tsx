'use client';

import React from 'react';
import { useInView } from '@/hooks/useInView';
import s from './v3.module.scss';

/* ─── data ─── */

const SERVICES = [
  {
    id: '001',
    name: 'Digital Products',
    stat: '12 shipped',
    detail: 'Web apps, mobile, SaaS platforms. From architecture to production.',
  },
  {
    id: '002',
    name: 'AI & Automation',
    stat: '47 workflows',
    detail: 'Agents, pipelines, integrations. Systems that operate without you.',
  },
  {
    id: '003',
    name: 'Growth Ops',
    stat: '3.2x avg ROI',
    detail: 'SEO, paid, CRO, analytics. Every dollar tracked.',
  },
];

const CLIENTS = [
  'Cartley LLC',
  'Steven Paul Diamonds',
  'Adonis Market',
  'Rides With Vinnie',
  'Key Vision LLC',
];

const APPROACH = [
  {
    num: '01',
    title: 'Scope ruthlessly',
    desc: 'We strip the brief to what matters. No feature bloat, no "nice to haves" in v1. Ship the core.',
  },
  {
    num: '02',
    title: 'Build in the open',
    desc: 'You see the work as it happens. Staging links, weekly demos, no surprises at launch.',
  },
  {
    num: '03',
    title: 'Measure everything',
    desc: 'Every decision has a number behind it. We instrument from day one so you know what is working.',
  },
];

/* ─── reveal wrapper ─── */

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useInView();
  const stagger = delay > 0 && delay <= 8 ? ` ${s[`stagger${delay}`]}` : '';

  return (
    <div
      ref={ref}
      className={`${s.reveal}${isVisible ? ` ${s.visible}` : ''}${stagger} ${className}`}
    >
      {children}
    </div>
  );
}

/* ─── page ─── */

export default function V3Page() {
  return (
    <div className={s.page}>
      {/* persistent grid lines */}
      <div className={s.gridOverlay}>
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} />
        ))}
      </div>

      {/* ── 01 HERO ── */}
      <section className={`${s.section} ${s.hero}`}>
        <Reveal>
          <h1 className={s.heroHeading}>
            We build<span>.</span> We ship<span>.</span>
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <div className={s.heroSubtitle}>
            Digital products, AI systems, and growth infrastructure. Miami.
          </div>
        </Reveal>
        <div className={s.heroRule} />
        <div className={s.heroScrollHint}>Scroll</div>
      </section>

      {/* ── 02 SERVICES ── */}
      <section className={`${s.section} ${s.services}`}>
        <span className={s.sectionNum}>02</span>
        <div className={s.servicesGrid}>
          {SERVICES.map((svc, i) => (
            <Reveal key={svc.id} className={s.serviceItem} delay={i + 1}>
              <span className={s.serviceId}>{svc.id}</span>
              <h2 className={s.serviceName}>{svc.name}</h2>
              <span className={s.serviceStat}>{svc.stat}</span>
              <p className={s.serviceDetail}>{svc.detail}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── 03 CLIENTS ── */}
      <section className={`${s.section} ${s.clients}`}>
        <span className={s.sectionNum}>03</span>
        <Reveal>
          <div className={s.clientsLabel}>Selected clients</div>
        </Reveal>
        <Reveal delay={1}>
          <div className={s.clientsRow}>
            {CLIENTS.map((name, i) => (
              <React.Fragment key={name}>
                {i > 0 && <span className={s.clientDivider} />}
                <span className={s.clientName}>{name}</span>
              </React.Fragment>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── 04 PROOF ── */}
      <section className={`${s.section} ${s.proof}`}>
        <span className={s.sectionNum}>04</span>
        <div className={s.proofGrid}>
          <Reveal className={`${s.proofStat} ${s.proofStatLeft}`}>
            <div className={s.proofNumber}>
              12<span>+</span>
            </div>
            <div className={s.proofLabel}>Products shipped</div>
          </Reveal>
          <Reveal className={`${s.proofStat} ${s.proofStatRight}`} delay={1}>
            <div className={s.proofNumber}>
              0
            </div>
            <div className={s.proofLabel}>Templates used</div>
          </Reveal>
          <Reveal className={s.proofBody} delay={2}>
            <p>
              Every project is custom-built from a blank file. No themes, no page builders,
              no drag-and-drop. We write the code, own the architecture, and ship systems
              designed for the specific problem. That is why our clients stay.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── 05 APPROACH ── */}
      <section className={`${s.section} ${s.approach}`}>
        <span className={s.sectionNum}>05</span>
        <div className={s.approachGrid}>
          <Reveal className={s.approachHeadingWrap}>
            <h2 className={s.approachHeading}>How we work</h2>
          </Reveal>
          <div className={s.approachItems}>
            {APPROACH.map((item, i) => (
              <Reveal key={item.num} className={s.approachItem} delay={i + 1}>
                <span className={s.approachNum}>{item.num}</span>
                <h3 className={s.approachTitle}>{item.title}</h3>
                <p className={s.approachDesc}>{item.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 06 CTA ── */}
      <section className={`${s.section} ${s.cta}`}>
        <span className={s.sectionNum}>06</span>
        <div className={s.ctaGrid}>
          <Reveal className={s.ctaHeadingWrap}>
            <h2 className={s.ctaHeading}>
              Let&rsquo;s build<br />something real
            </h2>
          </Reveal>
          <Reveal className={s.ctaRight} delay={2}>
            <p className={s.ctaSubtext}>
              No pitch decks. No discovery phases. Tell us what you need and we will scope it in 48 hours.
            </p>
            <a href="mailto:samih@beirux.com" className={s.ctaButton}>
              Start a project
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className={`${s.section} ${s.footer}`}>
        <div className={s.footerLeft}>BEIRUX, Miami</div>
        <div className={s.footerRight}>&copy; 2026</div>
      </footer>
    </div>
  );
}
