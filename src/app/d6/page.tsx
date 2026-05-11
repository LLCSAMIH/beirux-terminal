'use client';

import { useInView } from '@/hooks/useInView';
import s from './d6.module.scss';

/* ─── data ─── */

const SERVICES = [
  { number: '01', name: 'Web Systems', metric: '12 shipped' },
  { number: '02', name: 'AI Agents', metric: '4 active' },
  { number: '03', name: 'Growth Ops', metric: '3.2x ROI' },
  { number: '04', name: 'Automation', metric: '47 flows' },
  { number: '05', name: 'Design', metric: '0 templates' },
];

const CLIENTS = [
  { name: 'Cartley LLC', type: 'E-Commerce Platform', year: '2024' },
  { name: 'Steven Paul Diamonds', type: 'Luxury Brand Site', year: '2024' },
  { name: 'Adonis Market', type: 'Marketplace App', year: '2024' },
  { name: 'Rides With Vinnie', type: 'Booking System', year: '2025' },
  { name: 'Key Vision LLC', type: 'Business Dashboard', year: '2025' },
];

const NUMBERS = [
  { value: '12', label: 'Projects' },
  { value: '4', label: 'Agents' },
  { value: '92', label: 'Satisfaction %' },
  { value: '0', label: 'Templates' },
];

/* ─── page ─── */

export default function D6Page() {
  const statementView = useInView({ threshold: 0.2 });

  return (
    <div className={s.page}>
      {/* ─── 1. GRID HERO ─── */}
      <section className={s.hero}>
        <div className={s.heroGrid} />
        <h1 className={s.heroTitle}>BEIRUX</h1>
        <div className={s.heroRule} />
        <p className={s.heroSubtitle}>Digital Agency</p>
      </section>

      {/* ─── 2. INDEX ─── */}
      <section className={s.index}>
        <p className={s.indexLabel}>Services</p>
        <ul className={s.indexList}>
          {SERVICES.map((svc) => (
            <li key={svc.number} className={s.indexRow}>
              <span className={s.indexNumber}>{svc.number}</span>
              <span className={s.indexName}>{svc.name}</span>
              <span className={s.indexMetric}>{svc.metric}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ─── 3. STATEMENT ─── */}
      <section
        ref={statementView.ref}
        className={`${s.statement} ${statementView.isVisible ? s.visible : ''}`}
      >
        <h2 className={s.statementText}>Zero templates.</h2>
        <p className={s.statementSub}>
          Every project built from first principles.
        </p>
      </section>

      {/* ─── 4. CLIENT REGISTER ─── */}
      <section className={s.register}>
        <div className={s.registerInner}>
          <p className={s.registerLabel}>Clients</p>
          <ul className={s.registerList}>
            {CLIENTS.map((client) => (
              <li key={client.name} className={s.registerItem}>
                <span className={s.registerDot} />
                <span className={s.registerClientName}>{client.name}</span>
                <span className={s.registerDash}>&mdash;</span>
                <span className={s.registerType}>{client.type}</span>
                <span className={s.registerDash}>&mdash;</span>
                <span className={s.registerYear}>{client.year}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── 5. NUMBERS ─── */}
      <section className={s.numbers}>
        <div className={s.numbersGrid}>
          {NUMBERS.map((num) => (
            <div key={num.label} className={s.numberCell}>
              <div className={s.numberValue}>{num.value}</div>
              <div className={s.numberLabel}>{num.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── 6. CONTACT ─── */}
      <section className={s.contact}>
        <div className={s.contactEmail}>
          <a href="mailto:samih@beirux.com">samih@beirux.com</a>
        </div>
        <div className={s.contactLocation}>Miami, FL</div>
      </section>
    </div>
  );
}
