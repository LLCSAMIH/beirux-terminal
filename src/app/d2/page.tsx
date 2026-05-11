'use client';

import { Fragment } from 'react';
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
  const { ref, isVisible } = useInView({ threshold: 0.1 });
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
  const { ref, isVisible } = useInView({ threshold: 0.1 });
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
   1. MASTHEAD HERO
   ═══════════════════════════════════════════════════ */

function MastheadHero() {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <section className={s.masthead}>
      <Reveal>
        <div className={s.mastheadTopLine}>
          <span>Volume IV</span>
          <span>Miami, FL</span>
          <span>{dateStr}</span>
        </div>
      </Reveal>

      <div className={s.mastheadRule} />
      <div className={s.mastheadRuleThin} />

      <Reveal delay={0.2}>
        <h1 className={s.mastheadHeadline}>
          We Build. We Ship.<br />
          We Show the Work.
        </h1>
      </Reveal>

      <div className={s.mastheadColumns}>
        <Reveal delay={0.3}>
          <p className={`${s.mastheadCol} ${s.dropCap}`}>
            BEIRUX is a digital agency that operates on a simple premise: the work
            speaks for itself. We do not sell decks. We do not pitch roadmaps that
            stretch into next year. We build real products, deploy real systems,
            and show you the dashboard on day one.
          </p>
        </Reveal>
        <Reveal delay={0.45}>
          <p className={s.mastheadCol}>
            Every engagement starts from first principles. We study your business,
            your customers, your numbers. Then we design systems that compound:
            AI agents that work while you sleep, interfaces that convert because
            they were engineered to, infrastructure that does not go down.
          </p>
        </Reveal>
        <Reveal delay={0.6}>
          <p className={s.mastheadCol}>
            Based in Miami, working globally. Four AI agents on staff. Zero
            templates in the archive. Twelve projects shipped and counting. We are
            not the biggest agency. We are the one that ships.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   2. DATELINE FEATURE
   ═══════════════════════════════════════════════════ */

function DatelineFeature() {
  return (
    <section className={s.dateline}>
      <div>
        <Reveal>
          <div className={s.datelineImage} aria-label="BEIRUX workspace photography" />
          <p className={s.datelineCaption}>
            The BEIRUX operations floor, where four autonomous agents manage client
            infrastructure around the clock. Miami, 2026.
          </p>
        </Reveal>
      </div>

      <div className={s.datelineStory}>
        <Reveal delay={0.15}>
          <p className={s.datelineByline}>By Samih Mansour</p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className={s.datelineBody}>
            <p className={s.datelineLede}>
              <strong>MIAMI</strong> — The agency model is broken. Everyone knows it. Clients
              pay for hours, not outcomes. Deliverables arrive late, over budget,
              and underwhelming. The industry has optimized for billing, not building.
            </p>
            <br />
            <p>
              BEIRUX was founded on the opposite bet: that a small, technically
              obsessive team could outship agencies ten times its size. The secret
              is not hustle. It is architecture. Every project runs on custom
              infrastructure, monitored by AI agents that catch problems before
              clients notice them.
            </p>
            <br />
            <p>
              Bebe handles project management and client communication. Boba writes
              and reviews code. Powell watches the money. Bubbles publishes content.
              Four agents, zero ego, no meetings about meetings. The result is
              a studio that moves at startup speed with enterprise-grade reliability.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   3. SERVICES INDEX
   ═══════════════════════════════════════════════════ */

function ServicesIndex() {
  return (
    <section className={s.servicesIndex}>
      <Rule />
      <Reveal>
        <p className={s.servicesIndexHeader}>Section Index</p>
      </Reveal>

      {SERVICES.map((svc, i) => (
        <Reveal key={svc.name} delay={0.1 * (i + 1)}>
          <div className={s.serviceRow}>
            <span className={s.serviceName}>{svc.name}</span>
            <span className={s.serviceDesc}>{svc.desc}</span>
            <span className={s.servicePageRef}>{svc.page}</span>
          </div>
        </Reveal>
      ))}
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   4. PULL QUOTE DIVIDER
   ═══════════════════════════════════════════════════ */

function PullQuoteDivider() {
  return (
    <section className={s.pullQuote}>
      <div className={s.pullQuoteRule} />
      <Reveal>
        <blockquote className={s.pullQuoteText}>
          &ldquo;Every project starts from first principles.<br />
          Your business is not a template.&rdquo;
        </blockquote>
      </Reveal>
      <Reveal delay={0.2}>
        <p className={s.pullQuoteAttribution}>Samih Mansour, Founder</p>
      </Reveal>
      <div className={s.pullQuoteRule} />
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   5. CLIENT DOSSIER
   ═══════════════════════════════════════════════════ */

function ClientDossier() {
  return (
    <section className={s.dossier}>
      <Reveal>
        <p className={s.dossierHeader}>Client Dossier</p>
      </Reveal>
      <Rule />

      <div className={s.dossierGrid}>
        {CLIENTS.map((client, i) => (
          <Fragment key={client.name}>
            {i > 0 && <div className={s.dossierDivider} />}
            <div className={s.dossierColumn}>
              <Reveal delay={0.15 * (i + 1)}>
                <p className={s.dossierClientName}>
                  <span className={s.dossierRedDot} />
                  {client.name}
                </p>
                <p className={s.dossierType}>{client.type}</p>
                <p className={s.dossierNarrative}>{client.narrative}</p>
              </Reveal>
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   6. INFOGRAPHIC STRIP
   ═══════════════════════════════════════════════════ */

function InfographicStrip() {
  return (
    <section className={s.infographic}>
      <div className={s.infographicInner}>
        {METRICS.map((metric, i) => (
          <Fragment key={metric.label}>
            {i > 0 && <div className={s.infographicDivider} />}
            <div className={s.infographicItem}>
              <Reveal delay={0.15 * (i + 1)}>
                <div className={s.infographicNumber}>{metric.number}</div>
                <div className={s.infographicLabel}>{metric.label}</div>
              </Reveal>
            </div>
          </Fragment>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   7. CLASSIFIED CTA
   ═══════════════════════════════════════════════════ */

function ClassifiedCta() {
  return (
    <section className={s.classified}>
      <div className={s.classifiedInner}>
        <div className={s.classifiedColFiller}>
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

        <div className={s.classifiedColFiller}>
          {CLASSIFIED_FILLER}
        </div>
      </div>

      <div className={s.classifiedFooter}>
        <span className={s.classifiedFooterText}>
          &copy; {new Date().getFullYear()} BEIRUX
        </span>
        <span className={s.classifiedFooterText}>
          Miami, FL &middot; All Rights Reserved
        </span>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════ */

export default function D2Page() {
  return (
    <main className={s.page}>
      <MastheadHero />
      <DatelineFeature />
      <ServicesIndex />
      <PullQuoteDivider />
      <ClientDossier />
      <InfographicStrip />
      <ClassifiedCta />
    </main>
  );
}
