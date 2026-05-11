'use client';

import { useInView } from '@/hooks/useInView';
import s from './d12.module.scss';

/* --- data --- */

const SERVICES = [
  { coord: 'B1', name: 'Digital Products', desc: 'Full-stack web and mobile. Schema-first, production-grade.', status: 'ACTIVE' },
  { coord: 'B2', name: 'AI Automation', desc: 'Autonomous agents and workflow engines that run themselves.', status: 'ACTIVE' },
  { coord: 'B3', name: 'Growth Ops', desc: 'SEO, analytics, paid media. Conversion infrastructure that compounds.', status: 'ACTIVE' },
  { coord: 'B4', name: 'Branding', desc: 'Identity systems, design language, visual standards. Zero templates.', status: 'ACTIVE' },
  { coord: 'B5', name: 'Infrastructure', desc: 'Cloud architecture, CI/CD, monitoring. 99.9% uptime SLAs.', status: 'ACTIVE' },
  { coord: 'B6', name: 'Strategy', desc: 'Product roadmaps, technical audits, hard conversations about what to build.', status: 'ACTIVE' },
];

const CLIENTS = [
  { code: 'CRT-01', name: 'Cartley LLC', type: 'SaaS Platform', status: 'SHIPPED' },
  { code: 'SPD-02', name: 'Steven Paul Diamonds', type: 'E-Commerce', status: 'SHIPPED' },
  { code: 'ADN-03', name: 'Adonis Market', type: 'Marketplace', status: 'SHIPPED' },
  { code: 'RWV-04', name: 'Rides With Vinnie', type: 'Mobile App', status: 'SHIPPED' },
  { code: 'KVL-05', name: 'Key Vision LLC', type: 'Web Platform', status: 'SHIPPED' },
];

const COORD_INDEX = [
  { label: 'A1', desc: 'Identity' },
  { label: 'A2', desc: 'Descriptor' },
  { label: 'A3', desc: 'Coordinates' },
  { label: 'B1-B6', desc: 'Services' },
  { label: 'C1', desc: 'Client Index' },
  { label: 'C2', desc: 'Project Codes' },
  { label: 'D1', desc: 'Contact' },
];

/* --- component --- */

export default function D12Page() {
  const heroView = useInView();
  const servicesView = useInView();
  const clientsView = useInView();
  const contactView = useInView();

  return (
    <div className={s.page}>
      {/* Coordinate Index (top-right legend) */}
      <nav className={s.coordIndex} aria-label="Grid coordinate index">
        {COORD_INDEX.map((c) => (
          <div key={c.label} className={s.coordRow}>
            <span className={s.coordLabel}>{c.label}</span>
            <span className={s.coordDesc}>{c.desc}</span>
          </div>
        ))}
      </nav>

      {/* ====== Section A: Hero / Identity ====== */}
      <section
        ref={heroView.ref}
        className={`${s.section} ${heroView.isVisible ? s.sectionVisible : ''}`}
      >
        <span className={s.coordTag}>A1</span>
        <span className={s.paddingTop}>p:100</span>
        <span className={s.paddingLeft}>p:60</span>

        <div className={s.heroWrap}>
          <div className={s.heroDimWrap}>
            <div className={s.heroDimLine} aria-hidden="true" />
            <div>
              <div className={s.dimLabel}>w:800 h:auto</div>
              <h1 className={s.heroTitle}>BEIRUX</h1>
            </div>
          </div>

          <div>
            <span className={s.coordTag} style={{ position: 'relative', top: 0, left: 0 }}>A2</span>
            <p className={s.heroSub}>
              Digital agency that builds real products with AI-powered systems.
              We ship production code, not pitch decks.
            </p>
          </div>

          <div>
            <span className={s.coordTag} style={{ position: 'relative', top: 0, left: 0 }}>A3</span>
            <div className={s.heroCoords}>
              <span className={s.heroCoordItem}>New Jersey, US</span>
              <span className={s.heroCoordItem}>EST / UTC-5</span>
              <span className={s.heroCoordItem}>Founded 2024</span>
            </div>
          </div>
        </div>

        {/* Alignment guide decoration */}
        <div className={s.alignGuideH} style={{ top: '50%' }} aria-hidden="true" />
      </section>

      {/* Connector */}
      <div className={s.connectorVertical} aria-hidden="true" />

      {/* ====== Section B: Services ====== */}
      <section
        ref={servicesView.ref}
        className={`${s.section} ${servicesView.isVisible ? s.sectionVisible : ''}`}
      >
        <span className={s.coordTag}>B1-B6</span>
        <span className={s.paddingTop}>p:100</span>

        <div className={s.dimLabel} style={{ marginBottom: 16 }}>
          grid: auto-fit / minmax(260,1fr) / gap:2
        </div>

        <div className={s.servicesGrid}>
          {SERVICES.map((svc) => (
            <div key={svc.coord} className={s.serviceNode}>
              <span className={s.serviceCoord}>{svc.coord}</span>
              <span className={s.serviceName}>{svc.name}</span>
              <span className={s.serviceDesc}>{svc.desc}</span>
              <span className={s.serviceStatus}>{svc.status}</span>
            </div>
          ))}
        </div>

        {/* Connector line row under services */}
        <div className={s.serviceConnectorRow} style={{ marginTop: 16 }}>
          <span className={s.serviceConnectorDot} />
          <div className={s.connectorHorizontal} />
          <span className={s.serviceConnectorDot} />
          <div className={s.connectorHorizontal} />
          <span className={s.serviceConnectorDot} />
        </div>
      </section>

      {/* Connector */}
      <div className={s.connectorVertical} aria-hidden="true" />

      {/* ====== Section C: Clients ====== */}
      <section
        ref={clientsView.ref}
        className={`${s.section} ${clientsView.isVisible ? s.sectionVisible : ''}`}
      >
        <span className={s.coordTag}>C1</span>

        <div className={s.clientsWrap}>
          <div className={s.clientsHeader}>
            <span className={s.clientsTitle}>Client Index</span>
            <span className={s.clientsCount}>{CLIENTS.length} entries / C2</span>
          </div>

          {CLIENTS.map((client) => (
            <div key={client.code} className={s.clientRow}>
              <span className={s.clientCode}>{client.code}</span>
              <span className={s.clientName}>{client.name}</span>
              <span className={s.clientType}>{client.type}</span>
              <span className={s.clientStatus}>{client.status}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Connector */}
      <div className={s.connectorVertical} aria-hidden="true" />

      {/* ====== Section D: Contact ====== */}
      <section
        ref={contactView.ref}
        className={`${s.section} ${contactView.isVisible ? s.sectionVisible : ''}`}
      >
        <span className={s.coordTag}>D1</span>

        <div className={s.contactWrap}>
          <div className={s.contactPoint}>
            <div className={s.contactDot} />
            <h2 className={s.contactLabel}>Contact</h2>
          </div>

          <p className={s.contactMeta}>
            Single coordinate point. All inquiries route here.
          </p>

          <div>
            <a href="mailto:samih@beirux.com" className={s.contactLink}>
              samih@beirux.com
            </a>
          </div>

          <div className={s.contactCoordMeta}>
            <span>x: D1.0</span>
            <span>y: end</span>
            <span>z-index: 1</span>
          </div>
        </div>

        <div className={s.alignGuideV} style={{ left: '60px' }} aria-hidden="true" />
      </section>

      {/* Footer */}
      <footer className={s.footer}>
        <span>BEIRUX / 2024</span>
        <span>Grid System v12.0</span>
        <span>Coordinates: A1 through D1</span>
      </footer>
    </div>
  );
}
