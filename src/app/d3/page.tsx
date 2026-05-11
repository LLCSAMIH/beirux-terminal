'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { useInView } from '@/hooks/useInView';
import { useStickyScroll } from '@/hooks/useStickyScroll';
import s from './d3.module.scss';

/* ─── data ─── */

const SECTIONS = [
  { id: 'origin', coord: 'SEC.01', label: 'ORIGIN' },
  { id: 'services', coord: 'SEC.02', label: 'SERVICES' },
  { id: 'clients', coord: 'SEC.03', label: 'CLIENTS' },
  { id: 'stack', coord: 'SEC.04', label: 'STACK' },
  { id: 'specs', coord: 'SEC.05', label: 'SPECS' },
  { id: 'signal', coord: 'SEC.06', label: 'SIGNAL' },
];

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

/* ─── helpers ─── */

function getActiveSection(progress: number): number {
  const sectionCount = SECTIONS.length;
  const idx = Math.floor(progress * sectionCount);
  return Math.min(idx, sectionCount - 1);
}

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

/* ─── blueprint left panel ─── */

function BlueprintPanel({ activeIndex }: { activeIndex: number }) {
  const nodePositions = useMemo(() => [
    { x: 50, y: 12 },
    { x: 50, y: 28 },
    { x: 50, y: 44 },
    { x: 50, y: 60 },
    { x: 50, y: 76 },
    { x: 50, y: 92 },
  ], []);

  return (
    <div className={s.blueprint}>
      <div className={s.blueprintGrid} />

      {/* header mark */}
      <div className={s.blueprintHeader}>
        <span className={s.blueprintTitle}>BEIRUX</span>
        <span className={s.blueprintSubtitle}>SYSTEM BLUEPRINT</span>
      </div>

      {/* SVG schematic */}
      <svg
        className={s.blueprintSvg}
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* vertical connector line */}
        <line
          x1="50" y1={nodePositions[0].y}
          x2="50" y2={nodePositions[nodePositions.length - 1].y}
          className={s.svgLine}
        />

        {/* horizontal tick marks */}
        {nodePositions.map((pos, i) => (
          <line
            key={`tick-${i}`}
            x1="44" y1={pos.y}
            x2="56" y2={pos.y}
            className={s.svgLine}
          />
        ))}

        {/* diamond nodes */}
        {SECTIONS.map((sec, i) => {
          const pos = nodePositions[i];
          const isActive = i === activeIndex;
          const isPast = i < activeIndex;
          return (
            <g key={sec.id}>
              {/* diamond shape */}
              <polygon
                points={`${pos.x},${pos.y - 3} ${pos.x + 3},${pos.y} ${pos.x},${pos.y + 3} ${pos.x - 3},${pos.y}`}
                className={`${s.svgDiamond} ${isActive ? s.svgDiamondActive : ''} ${isPast ? s.svgDiamondPast : ''}`}
              />

              {/* glow ring for active */}
              {isActive && (
                <circle
                  cx={pos.x} cy={pos.y} r="5"
                  className={s.svgGlow}
                />
              )}

              {/* coordinate label - left side */}
              <text
                x={pos.x - 8}
                y={pos.y - 1}
                className={`${s.svgCoord} ${isActive ? s.svgCoordActive : ''}`}
                textAnchor="end"
              >
                {sec.coord}
              </text>

              {/* section label - right side */}
              <text
                x={pos.x + 8}
                y={pos.y + 1}
                className={`${s.svgLabel} ${isActive ? s.svgLabelActive : ''}`}
                textAnchor="start"
              >
                {sec.label}
              </text>
            </g>
          );
        })}

        {/* active section bracket indicator */}
        <line
          x1="38" y1={nodePositions[activeIndex].y - 4}
          x2="38" y2={nodePositions[activeIndex].y + 4}
          className={s.svgBracket}
        />
        <line
          x1="62" y1={nodePositions[activeIndex].y - 4}
          x2="62" y2={nodePositions[activeIndex].y + 4}
          className={s.svgBracket}
        />
      </svg>

      {/* bottom status line */}
      <div className={s.blueprintFooter}>
        <span className={s.blueprintStatus}>STATUS: NOMINAL</span>
        <span className={s.blueprintZone}>ZONE {String(activeIndex + 1).padStart(2, '0')}</span>
      </div>
    </div>
  );
}

/* ─── main page ─── */

export default function D3Page() {
  const { wrapperRef, progress } = useStickyScroll();
  const activeIndex = getActiveSection(progress);
  const [coords, setCoords] = useState('');

  useEffect(() => {
    setCoords('25.7617° N, 80.1918° W');
  }, []);

  const ctaView = useInView({ threshold: 0.2 });

  return (
    <div ref={wrapperRef} className={s.page}>
      {/* ─── SPLIT PANEL LAYOUT ─── */}
      <div className={s.splitLayout}>
        {/* LEFT: Sticky blueprint panel */}
        <aside className={s.leftPanel}>
          <BlueprintPanel activeIndex={activeIndex} />
        </aside>

        {/* RIGHT: Scrollable content */}
        <main className={s.rightPanel}>
          {/* ─── SEC.01 ORIGIN ─── */}
          <section className={s.hero} id="origin">
            <div className={s.heroGrid} />
            <div className={s.heroContent}>
              <h1 className={s.heroTitle}>BEIRUX</h1>
              <p className={s.heroSub}>Digital Architecture Studio</p>
              <span className={s.heroCoords}>
                {coords} &mdash; Miami, FL
              </span>
            </div>
          </section>

          {/* ─── SEC.02 SERVICES ─── */}
          <Section id="services" className={s.servicesSection}>
            <h2 className={s.sectionLabel}>
              <span className={s.labelCoord}>SEC.02</span>
              <span className={s.labelSlash}>//</span> SERVICES
            </h2>
            <div className={s.nodesGrid}>
              <div className={s.nodesConnector} />
              {SERVICES.map((svc, i) => (
                <SchematicNode key={svc.name} service={svc} index={i} />
              ))}
            </div>
          </Section>

          {/* ─── SEC.03 CLIENTS ─── */}
          <Section id="clients" className={s.clientsSection}>
            <h2 className={s.sectionLabel}>
              <span className={s.labelCoord}>SEC.03</span>
              <span className={s.labelSlash}>//</span> CLIENT GRID
            </h2>
            <div className={s.clientsGrid}>
              {CLIENTS.map((client, i) => (
                <ClientCell key={client.name} client={client} index={i} />
              ))}
            </div>
          </Section>

          {/* ─── SEC.04 STACK ─── */}
          <Section id="stack" className={s.elevSection}>
            <h2 className={s.sectionLabel}>
              <span className={s.labelCoord}>SEC.04</span>
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

          {/* ─── SEC.05 SPECS ─── */}
          <Section id="specs" className={s.specsSection}>
            <h2 className={s.sectionLabel}>
              <span className={s.labelCoord}>SEC.05</span>
              <span className={s.labelSlash}>//</span> SYSTEM SPECIFICATIONS
            </h2>
            <div className={s.specsSheet}>
              {SPECS.map((spec, i) => (
                <SpecRow key={spec.param} spec={spec} index={i} />
              ))}
            </div>
          </Section>

          {/* ─── SEC.06 SIGNAL ─── */}
          <section
            ref={ctaView.ref}
            id="signal"
            className={`${s.signalSection} ${ctaView.isVisible ? s.signalVisible : ''}`}
          >
            <div className={s.signalRings}>
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
        </main>
      </div>
    </div>
  );
}
