'use client';

import { useInView } from '@/hooks/useInView';
import { useStickyScroll } from '@/hooks/useStickyScroll';
import s from './d13.module.scss';

/* --- data --- */

const SERVICES = [
  { name: 'Digital Products', desc: 'Full-stack web and mobile. Schema-first, production-grade.' },
  { name: 'AI Automation', desc: 'Autonomous agents and workflow engines that run themselves.' },
  { name: 'Growth Ops', desc: 'SEO, analytics, paid media. Conversion infrastructure that compounds.' },
  { name: 'Branding', desc: 'Identity systems, design language, visual standards. Zero templates.' },
  { name: 'Infrastructure', desc: 'Cloud architecture, CI/CD, monitoring. 99.9% uptime SLAs.' },
  { name: 'Strategy', desc: 'Product roadmaps, technical audits, hard conversations about what to build.' },
];

const CLIENTS = [
  { name: 'Cartley LLC', type: 'SaaS Platform' },
  { name: 'Steven Paul Diamonds', type: 'E-Commerce' },
  { name: 'Adonis Market', type: 'Marketplace' },
  { name: 'Rides With Vinnie', type: 'Mobile App' },
  { name: 'Key Vision LLC', type: 'Web Platform' },
];

/* --- component --- */

export default function D13Page() {
  const { wrapperRef } = useStickyScroll();

  const heroView = useInView();
  const servicesView = useInView();
  const workView = useInView();
  const philosophyView = useInView();
  const contactView = useInView();

  return (
    <div className={s.page}>
      {/* Floating brand pill */}
      <div className={s.brandPill}>BEIRUX</div>

      {/* Stacking wrapper */}
      <div ref={wrapperRef} className={s.stackWrapper}>

        {/* Panel 1: Hero */}
        <div className={`${s.panel} ${s.panelHero}`}>
          <div
            ref={heroView.ref}
            className={`${s.panelInner} ${heroView.isVisible ? s.panelVisible : ''}`}
          >
            <span className={s.panelLabel}>Welcome</span>
            <div className={s.heroContent}>
              <h1 className={s.heroTitle}>BEIRUX</h1>
              <p className={s.heroTagline}>
                Digital agency that builds real products with AI-powered systems.
                We ship production code, not pitch decks.
              </p>
              <div className={s.heroMeta}>
                <span>New Jersey, US</span>
                <span>EST / UTC-5</span>
                <span>Founded 2024</span>
              </div>
            </div>
          </div>
        </div>

        {/* Panel 2: Services */}
        <div className={`${s.panel} ${s.panelServices}`}>
          <div
            ref={servicesView.ref}
            className={`${s.panelInner} ${servicesView.isVisible ? s.panelVisible : ''}`}
          >
            <span className={s.panelLabel}>Services</span>
            <div className={s.servicesGrid}>
              {SERVICES.map((svc) => (
                <div key={svc.name} className={s.serviceBadge}>
                  <span className={s.serviceName}>{svc.name}</span>
                  <span className={s.serviceDesc}>{svc.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel 3: Work */}
        <div className={`${s.panel} ${s.panelWork}`}>
          <div
            ref={workView.ref}
            className={`${s.panelInner} ${workView.isVisible ? s.panelVisible : ''}`}
          >
            <span className={s.panelLabel}>Work</span>
            <div className={s.clientList}>
              {CLIENTS.map((client) => (
                <div key={client.name} className={s.clientRow}>
                  <span className={s.clientName}>{client.name}</span>
                  <span className={s.clientType}>{client.type}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel 4: Philosophy */}
        <div className={`${s.panel} ${s.panelPhilosophy}`}>
          <div
            ref={philosophyView.ref}
            className={`${s.panelInner} ${philosophyView.isVisible ? s.panelVisible : ''}`}
          >
            <span className={s.panelLabel}>Philosophy</span>
            <div className={s.philosophyContent}>
              <p className={s.philosophyQuote}>
                We don&apos;t build for the sake of building. Every line of code is a{' '}
                <span className={s.philosophyAccent}>liability</span> until it delivers{' '}
                <span className={s.philosophyAccent}>value</span>.
              </p>
              <span className={s.philosophyAttrib}>-- The BEIRUX Principle</span>
            </div>
          </div>
        </div>

        {/* Panel 5: Contact */}
        <div className={`${s.panel} ${s.panelContact}`}>
          <div
            ref={contactView.ref}
            className={`${s.panelInner} ${contactView.isVisible ? s.panelVisible : ''}`}
          >
            <span className={s.panelLabel}>Contact</span>
            <div className={s.contactContent}>
              <h2 className={s.contactHeading}>Let&apos;s build something.</h2>
              <a href="mailto:samih@beirux.com" className={s.contactEmail}>
                samih@beirux.com
              </a>
              <span className={s.contactSub}>All inquiries route here.</span>
            </div>
          </div>
        </div>

      </div>

      {/* Footer */}
      <footer className={s.footer}>
        <span>BEIRUX / 2024</span>
        <span>Glassmorphic Layers v13.0</span>
      </footer>
    </div>
  );
}
