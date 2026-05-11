'use client';

import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useInView } from '@/hooks/useInView';
import s from './d2.module.scss';

/* ─── data ─── */

const SERVICES = [
  { name: 'Digital Products', desc: 'Custom web apps, platforms, and SaaS from first commit to production', page: 'p.04' },
  { name: 'AI Automation', desc: 'Autonomous agents and pipelines that replace entire workflows', page: 'p.08' },
  { name: 'Growth Ops', desc: 'SEO architecture, paid acquisition, analytics infrastructure', page: 'p.14' },
  { name: 'Branding', desc: 'Visual identity systems built for digital-first businesses', page: 'p.18' },
  { name: 'Infrastructure', desc: 'Cloud architecture, CI/CD, monitoring, and uptime guarantees', page: 'p.22' },
];

const CLIENTS = [
  {
    name: 'Cartley LLC',
    type: 'E-commerce Platform',
    narrative: 'Rebuilt their entire storefront from a Shopify template into a custom Next.js application. Conversion rate doubled within 60 days of launch.',
  },
  {
    name: 'Steven Paul Diamonds',
    type: 'Luxury Brand Site',
    narrative: 'Designed and shipped a high-end digital showroom that matched the craftsmanship of their product. Organic traffic up 340% in the first quarter.',
  },
  {
    name: 'Adonis Market',
    type: 'Marketplace Platform',
    narrative: 'Built a multi-vendor marketplace with AI-powered inventory management from scratch. Processing thousands of orders monthly with zero downtime.',
  },
];

const METRICS = [
  { number: '12', label: 'Projects Shipped' },
  { number: '4', label: 'AI Agents' },
  { number: '92%', label: 'Satisfaction' },
  { number: '0', label: 'Templates' },
];

const CLASSIFIED_FILLER = `FOR SALE: One slightly used marketing strategy. Never deployed. $0 OBO. --- WANTED: Developer who can center a div. Must have 15 years React experience. --- LOST: Our patience for agencies that ship PDFs instead of products. If found, do not return. --- HELP WANTED: Business owner tired of waiting 6 months for a landing page. Apply within. --- FOR RENT: Premium server space. 99.9% uptime guaranteed. No shared hosting. --- NOTICE: All templates have been permanently retired. No exceptions. No refunds. No regrets. --- SEEKING: Founding clients for Q3 cohort. Only 2 slots remain. Serious inquiries only.`;

const SPREAD_LABELS = ['I', 'II', 'III', 'IV', 'V'];

/* ─── reveal wrapper (works for horizontal IntersectionObserver) ─── */

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useInView({ threshold: 0.05 });
  return (
    <div
      ref={ref}
      className={`${s.reveal} ${isVisible ? s.revealVisible : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

/* ─── thin rule with animation ─── */

function Rule({ delay = 0 }: { delay?: number }) {
  const { ref, isVisible } = useInView({ threshold: 0.05 });
  return (
    <div
      ref={ref}
      className={`${s.rule} ${isVisible ? s.ruleVisible : ''}`}
      style={{ transitionDelay: `${delay}s` }}
      aria-hidden="true"
    />
  );
}

/* ═══════════════════════════════════════════════════
   SPREAD 1: MASTHEAD
   ═══════════════════════════════════════════════════ */

function SpreadMasthead() {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className={s.spread}>
      <div className={s.spreadInner}>
        <Reveal>
          <div className={s.mastheadTopLine}>
            <span>Volume IV</span>
            <span>Miami, FL</span>
            <span>{dateStr}</span>
          </div>
        </Reveal>

        <div className={s.mastheadRuleThick} />
        <div className={s.mastheadRuleThin} />

        <Reveal delay={0.06}>
          <h1 className={s.mastheadTitle}>BEIRUX</h1>
        </Reveal>

        <div className={s.mastheadRuleThin} />

        <Reveal delay={0.12}>
          <p className={s.mastheadSubtitle}>
            The Digital Broadsheet
          </p>
        </Reveal>

        <div className={s.mastheadBody}>
          <Reveal delay={0.15}>
            <h2 className={s.mastheadHeadline}>
              We Build. We Ship.<br />
              We Show the Work.
            </h2>
          </Reveal>

          <div className={s.mastheadColumns}>
            <Reveal delay={0.18}>
              <p className={`${s.mastheadCol} ${s.dropCap}`}>
                BEIRUX is a digital agency that operates on a simple premise: the work
                speaks for itself. We do not sell decks. We do not pitch roadmaps that
                stretch into next year. We build real products, deploy real systems,
                and show you the dashboard on day one.
              </p>
            </Reveal>
            <div className={s.columnDivider} aria-hidden="true" />
            <Reveal delay={0.24}>
              <p className={s.mastheadCol}>
                Every engagement starts from first principles. We study your business,
                your customers, your numbers. Then we design systems that compound:
                AI agents that work while you sleep, interfaces that convert because
                they were engineered to, infrastructure that does not go down.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SPREAD 2: FEATURE STORY
   ═══════════════════════════════════════════════════ */

function SpreadFeature() {
  return (
    <section className={s.spread}>
      <div className={s.spreadInner}>
        <Reveal>
          <p className={s.sectionLabel}>Feature Story</p>
        </Reveal>
        <Rule />

        <Reveal delay={0.06}>
          <h2 className={s.featureHeadline}>
            The Agency Model<br />Is Broken. We Fixed It.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className={s.featureByline}>By Samih Mansour, Founder</p>
        </Reveal>

        <div className={s.featureColumns}>
          <div className={s.featureCol}>
            <Reveal delay={0.12}>
              <p className={`${s.featureBody} ${s.dropCap}`}>
                <strong>MIAMI</strong> &mdash; The agency model is broken. Everyone knows it. Clients
                pay for hours, not outcomes. Deliverables arrive late, over budget,
                and underwhelming. The industry has optimized for billing, not building.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className={s.featureBody}>
                BEIRUX was founded on the opposite bet: that a small, technically
                obsessive team could outship agencies ten times its size. The secret
                is not hustle. It is architecture. Every project runs on custom
                infrastructure, monitored by AI agents that catch problems before
                clients notice them.
              </p>
            </Reveal>
          </div>
          <div className={s.columnDivider} aria-hidden="true" />
          <div className={s.featureCol}>
            <Reveal delay={0.12}>
              <p className={s.featureBody}>
                Bebe handles project management and client communication. Boba writes
                and reviews code. Powell watches the money. Bubbles publishes content.
                Four agents, zero ego, no meetings about meetings.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className={s.featureBody}>
                The result is a studio that moves at startup speed with enterprise-grade
                reliability. Based in Miami, working globally. Twelve projects shipped
                and counting. We are not the biggest agency. We are the one that ships.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className={s.featureImage} aria-label="BEIRUX workspace photography" />
              <p className={s.featureCaption}>
                The BEIRUX operations floor, where four autonomous agents manage client
                infrastructure around the clock. Miami, 2026.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SPREAD 3: SERVICES INDEX + PULL QUOTE
   ═══════════════════════════════════════════════════ */

function SpreadServices() {
  return (
    <section className={s.spread}>
      <div className={s.spreadInner}>
        <Reveal>
          <p className={s.sectionLabel}>Section Index</p>
        </Reveal>
        <Rule />

        {SERVICES.map((svc, i) => (
          <Reveal key={svc.name} delay={0.04 * (i + 1)}>
            <div className={s.serviceRow}>
              <span className={s.serviceName}>{svc.name}</span>
              <span className={s.serviceDots} aria-hidden="true" />
              <span className={s.servicePageRef}>{svc.page}</span>
            </div>
            <p className={s.serviceDesc}>{svc.desc}</p>
            {i < SERVICES.length - 1 && (
              <div className={s.serviceRowDivider} />
            )}
          </Reveal>
        ))}

        <div className={s.pullQuoteBlock}>
          <div className={s.pullQuoteRuleH} />
          <Reveal delay={0.06}>
            <blockquote className={s.pullQuoteText}>
              &ldquo;Every project starts from first principles.
              Your business is not a template.&rdquo;
            </blockquote>
          </Reveal>
          <Reveal delay={0.12}>
            <p className={s.pullQuoteAttribution}>
              &mdash; Samih Mansour, Founder
            </p>
          </Reveal>
          <div className={s.pullQuoteRuleH} />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SPREAD 4: CLIENT DOSSIER + METRICS
   ═══════════════════════════════════════════════════ */

function SpreadDossier() {
  return (
    <section className={s.spread}>
      <div className={s.spreadInner}>
        <Reveal>
          <p className={s.sectionLabel}>Client Dossier</p>
        </Reveal>
        <Rule />

        <div className={s.dossierStack}>
          {CLIENTS.map((client, i) => (
            <Fragment key={client.name}>
              <div className={s.dossierCard}>
                <Reveal delay={0.05 * (i + 1)}>
                  <p className={s.dossierClientName}>
                    <span className={s.dossierRedDot} />
                    {client.name}
                  </p>
                  <p className={s.dossierType}>{client.type}</p>
                  <p className={s.dossierNarrative}>{client.narrative}</p>
                </Reveal>
              </div>
              {i < CLIENTS.length - 1 && (
                <div className={s.dossierCardDivider} />
              )}
            </Fragment>
          ))}
        </div>

        <div className={s.metricsRow}>
          <div className={s.metricsRuleH} />
          {METRICS.map((metric, i) => (
            <Fragment key={metric.label}>
              {i > 0 && <div className={s.metricsDivider} aria-hidden="true" />}
              <div className={s.metricsItem}>
                <Reveal delay={0.05 * (i + 1)}>
                  <div className={s.metricsNumber}>{metric.number}</div>
                  <div className={s.metricsLabel}>{metric.label}</div>
                </Reveal>
              </div>
            </Fragment>
          ))}
          <div className={s.metricsRuleH} />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SPREAD 5: CLASSIFIED CTA
   ═══════════════════════════════════════════════════ */

function SpreadClassified() {
  return (
    <section className={`${s.spread} ${s.spreadDark}`}>
      <div className={s.spreadInner}>
        <div className={s.classifiedFiller}>
          {CLASSIFIED_FILLER}
        </div>

        <Reveal>
          <div className={s.classifiedFeatured}>
            <p className={s.classifiedFeaturedLabel}>Featured Listing</p>
            <h2 className={s.classifiedHeadline}>
              Seeking: Ambitious businesses ready to ship.
            </h2>
            <div className={s.classifiedDetails}>
              <p>
                <span className={s.classifiedDetailLabel}>Contact: </span>
                <span className={s.classifiedDetailValue}>samih@beirux.com</span>
              </p>
              <p>
                <span className={s.classifiedDetailLabel}>Location: </span>
                <span className={s.classifiedDetailValue}>Miami, FL</span>
              </p>
              <p>
                <span className={s.classifiedDetailLabel}>Terms: </span>
                <span className={s.classifiedDetailValue}>No templates. No excuses.</span>
              </p>
            </div>
            <a href="mailto:samih@beirux.com" className={s.classifiedCta}>
              Start a Project
            </a>
          </div>
        </Reveal>

        <div className={s.classifiedFiller}>
          {CLASSIFIED_FILLER}
        </div>

        <div className={s.classifiedFooter}>
          <span className={s.classifiedFooterText}>
            &copy; {new Date().getFullYear()} BEIRUX
          </span>
          <span className={s.classifiedFooterText}>
            Miami, FL &middot; All Rights Reserved
          </span>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   HORIZONTAL SCROLL PAGE
   ═══════════════════════════════════════════════════ */

export default function D2Page() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [activeSpread, setActiveSpread] = useState(0);
  const totalSpreads = 5;

  /* Translate vertical wheel into horizontal scroll */
  const onWheel = useCallback((e: WheelEvent) => {
    const container = scrollRef.current;
    if (!container) return;

    // Prevent Lenis/body from capturing this
    e.preventDefault();
    e.stopPropagation();

    container.scrollLeft += e.deltaY + e.deltaX;
  }, []);

  /* Track scroll progress */
  const onScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    if (maxScroll <= 0) return;

    const pct = container.scrollLeft / maxScroll;
    setProgress(pct);

    // Determine active spread from snap position
    const spreadWidth = container.scrollWidth / totalSpreads;
    const idx = Math.round(container.scrollLeft / spreadWidth);
    setActiveSpread(Math.min(idx, totalSpreads - 1));
  }, [totalSpreads]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener('wheel', onWheel, { passive: false });
    container.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      container.removeEventListener('wheel', onWheel);
      container.removeEventListener('scroll', onScroll);
    };
  }, [onWheel, onScroll]);

  /* Keyboard navigation */
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const container = scrollRef.current;
      if (!container) return;

      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        container.scrollLeft += window.innerWidth * 0.8;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        container.scrollLeft -= window.innerWidth * 0.8;
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <div className={s.page}>
      {/* Horizontal scroll track */}
      <div ref={scrollRef} className={s.scrollTrack}>
        <SpreadMasthead />
        <SpreadFeature />
        <SpreadServices />
        <SpreadDossier />
        <SpreadClassified />
      </div>

      {/* Bottom progress bar */}
      <div className={s.progressBar}>
        <div
          className={s.progressFill}
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Spread indicator pips */}
      <div className={s.spreadIndicator}>
        {SPREAD_LABELS.map((label, i) => (
          <button
            key={label}
            className={`${s.spreadPip} ${i === activeSpread ? s.spreadPipActive : ''}`}
            onClick={() => {
              const container = scrollRef.current;
              if (!container) return;
              const targetScroll = (container.scrollWidth / totalSpreads) * i;
              container.scrollTo({ left: targetScroll, behavior: 'smooth' });
            }}
            aria-label={`Go to spread ${label}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
