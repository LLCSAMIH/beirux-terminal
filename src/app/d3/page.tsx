'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';
import s from './d3.module.scss';

/* ─── data ─── */

const SERVICES = [
  { name: 'Web Systems', icon: '{ }', stat: '12 shipped' },
  { name: 'AI Agents', icon: '⚡', stat: '4 active' },
  { name: 'Growth Ops', icon: '↗', stat: '3.2x ROI' },
  { name: 'Automation', icon: '⧉', stat: '47 flows' },
  { name: 'Design', icon: '◊', stat: '0 templates' },
];

const CLIENTS = [
  { name: 'Cartley LLC', type: 'E-Commerce Platform', span: false },
  { name: 'Steven Paul Diamonds', type: 'Luxury Brand Site', span: true },
  { name: 'Adonis Market', type: 'Marketplace App', span: false },
  { name: 'Rides With Vinnie', type: 'Booking System', span: false },
  { name: 'Key Vision LLC', type: 'Business Dashboard', span: true },
];

const LAYERS = [
  { name: 'CLIENT INTERFACE', desc: 'Responsive frontends, dashboards, and customer-facing apps' },
  { name: 'AI LAYER', desc: '4 autonomous agents handling ops, code, finance, and publishing' },
  { name: 'FRONTEND', desc: 'Next.js, React, SCSS modules, motion-first component systems' },
  { name: 'BACKEND', desc: 'Node, Python, serverless functions, real-time event pipelines' },
  { name: 'INFRASTRUCTURE', desc: 'Vercel, GCP, Neon Postgres, Firebase, 99.9% uptime SLA' },
];

const SPECS = [
  { param: 'PROJECTS_SHIPPED', value: '12' },
  { param: 'ACTIVE_CLIENTS', value: '5' },
  { param: 'TEMPLATE_COUNT', value: '0' },
  { param: 'CUSTOM_BUILT', value: '100%' },
  { param: 'AVG_DELIVERY', value: '4 wks' },
  { param: 'UPTIME_SLA', value: '99.9%' },
  { param: 'AI_AGENTS', value: '4' },
  { param: 'WORKFLOWS', value: '47' },
];

/* ─── reusable section wrapper ─── */

function Section({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, isVisible } = useInView({ threshold: 0.08 });
  return (
    <section
      ref={ref}
      id={id}
      className={`${s.section} ${isVisible ? s.visible : ''} ${className || ''}`}
    >
      {children}
    </section>
  );
}

/* ─── schematic node ─── */

function SchematicNode({
  service,
  index,
}: {
  service: (typeof SERVICES)[number];
  index: number;
}) {
  const { ref, isVisible } = useInView({ threshold: 0.15 });
  return (
    <div
      ref={ref}
      className={`${s.node} ${isVisible ? s.nodeVisible : ''}`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className={s.nodeBorder} />
      <div className={s.nodeInner}>
        <span className={s.nodeIcon}>{service.icon}</span>
        <span className={s.nodeName}>{service.name}</span>
        <span className={s.nodeStat}>{service.stat}</span>
      </div>
    </div>
  );
}

/* ─── client cell ─── */

function ClientCell({
  client,
  index,
}: {
  client: (typeof CLIENTS)[number];
  index: number;
}) {
  const { ref, isVisible } = useInView({ threshold: 0.15 });
  return (
    <div
      ref={ref}
      className={`${s.clientCell} ${client.span ? s.clientCellSpan : ''} ${isVisible ? s.clientCellVisible : ''}`}
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div className={s.clientCellInner}>
        <span className={s.clientIndex}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className={s.clientCellName}>{client.name}</span>
        <span className={s.clientType}>{client.type}</span>
        <span className={s.clientBadge}>LIVE</span>
      </div>
    </div>
  );
}

/* ─── elevation layer ─── */

function ElevationLayer({
  layer,
  index,
  total,
}: {
  layer: (typeof LAYERS)[number];
  index: number;
  total: number;
}) {
  const { ref, isVisible } = useInView({ threshold: 0.2 });
  const intensity = ((total - index) / total) * 100;
  return (
    <div
      ref={ref}
      className={`${s.elevLayer} ${isVisible ? s.elevLayerVisible : ''}`}
      style={{
        animationDelay: `${(total - 1 - index) * 180}ms`,
        '--intensity': `${intensity}%`,
      } as React.CSSProperties}
    >
      <div className={s.elevLayerBar} />
      <div className={s.elevLayerContent}>
        <span className={s.elevLayerName}>{layer.name}</span>
        <span className={s.elevLayerDesc}>{layer.desc}</span>
      </div>
    </div>
  );
}

/* ─── spec row ─── */

function SpecRow({
  spec,
  index,
}: {
  spec: (typeof SPECS)[number];
  index: number;
}) {
  const { ref, isVisible } = useInView({ threshold: 0.2 });
  return (
    <div
      ref={ref}
      className={`${s.specRow} ${isVisible ? s.specRowVisible : ''}`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <span className={s.specParam}>{spec.param}</span>
      <span className={s.specDots} />
      <span className={s.specValue}>{spec.value}</span>
    </div>
  );
}

/* ─── main page ─── */

export default function D3Page() {
  const [coords, setCoords] = useState('');

  useEffect(() => {
    setCoords('25.7617° N, 80.1918° W');
  }, []);

  /* Pulse rings for CTA */
  const ctaView = useInView({ threshold: 0.2 });

  return (
    <div className={s.page}>
      {/* ─── 1. BLUEPRINT HERO ─── */}
      <section className={s.hero} id="hero">
        <div className={s.heroGrid} />
        <div className={s.heroContent}>
          <div className={s.heroLineLeft} />
          <h1 className={s.heroTitle}>BEIRUX</h1>
          <div className={s.heroLineRight} />
          <p className={s.heroSub}>Digital Architecture Studio</p>
          <span className={s.heroCoords}>
            {coords} &mdash; Miami, FL
          </span>
        </div>
      </section>

      {/* ─── 2. SCHEMATIC SERVICES ─── */}
      <Section id="services" className={s.servicesSection}>
        <h2 className={s.sectionLabel}>
          <span className={s.labelSlash}>//</span> SERVICES
        </h2>
        <div className={s.nodesGrid}>
          {/* connection lines */}
          <div className={s.nodesConnector} />
          {SERVICES.map((svc, i) => (
            <SchematicNode key={svc.name} service={svc} index={i} />
          ))}
        </div>
      </Section>

      {/* ─── 3. WIRE GRID CLIENTS ─── */}
      <Section id="clients" className={s.clientsSection}>
        <h2 className={s.sectionLabel}>
          <span className={s.labelSlash}>//</span> CLIENT GRID
        </h2>
        <div className={s.clientsGrid}>
          {CLIENTS.map((client, i) => (
            <ClientCell key={client.name} client={client} index={i} />
          ))}
        </div>
      </Section>

      {/* ─── 4. ELEVATION VIEW ─── */}
      <Section id="elevation" className={s.elevSection}>
        <h2 className={s.sectionLabel}>
          <span className={s.labelSlash}>//</span> ELEVATION VIEW
        </h2>
        <div className={s.elevStack}>
          {LAYERS.map((layer, i) => (
            <ElevationLayer
              key={layer.name}
              layer={layer}
              index={i}
              total={LAYERS.length}
            />
          ))}
        </div>
      </Section>

      {/* ─── 5. SPEC SHEET ─── */}
      <Section id="specs" className={s.specsSection}>
        <h2 className={s.sectionLabel}>
          <span className={s.labelSlash}>//</span> SYSTEM SPECIFICATIONS
        </h2>
        <div className={s.specsSheet}>
          {SPECS.map((spec, i) => (
            <SpecRow key={spec.param} spec={spec} index={i} />
          ))}
        </div>
      </Section>

      {/* ─── 6. SIGNAL CTA ─── */}
      <section
        ref={ctaView.ref}
        id="signal"
        className={`${s.signalSection} ${ctaView.isVisible ? s.signalVisible : ''}`}
      >
        <div className={s.signalRings}>
          <div className={s.ring} />
          <div className={s.ring} />
          <div className={s.ring} />
          <div className={s.ring} />
        </div>
        <div className={s.signalContent}>
          <h2 className={s.signalTitle}>ESTABLISH CONNECTION</h2>
          <div className={s.signalTerminal}>
            <span className={s.termPrompt}>&gt;</span>
            <a href="mailto:samih@beirux.com" className={s.termInput}>
              samih@beirux.com
            </a>
            <span className={s.termCursor} />
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className={s.footer}>
        <span>&copy; BEIRUX 2026</span>
        <span>ALL SYSTEMS NOMINAL</span>
      </footer>
    </div>
  );
}
