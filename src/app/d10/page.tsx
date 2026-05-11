'use client';

import { useInView } from '@/hooks/useInView';
import s from './d10.module.scss';

const SERVICES = [
  'AI Agents & Automation',
  'Web Systems & Platforms',
  'Growth Engineering',
  'Design & Brand Identity',
  'Infrastructure & DevOps',
];

const CLIENTS = [
  'Adonis Market',
  'Hapi',
  'Elevation Church',
  'True Leb',
  'Peekaboo',
];

const STATS = [
  { value: '12+', label: 'Systems shipped' },
  { value: '4', label: 'AI agents live' },
  { value: '0', label: 'Templates used' },
  { value: '100%', label: 'Custom built' },
];

function Panel({
  children,
  className,
  direction = 'left',
}: {
  children: React.ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'bottom' | 'top';
}) {
  const { ref, isVisible } = useInView({ threshold: 0.05 });

  const dirClass = {
    left: s.slideFromLeft,
    right: s.slideFromRight,
    bottom: s.slideFromBottom,
    top: s.slideFromTop,
  }[direction];

  return (
    <div
      ref={ref}
      className={`${s.panel} ${dirClass} ${isVisible ? s.panelVisible : ''} ${className ?? ''}`}
    >
      {children}
    </div>
  );
}

export default function D10Page() {
  return (
    <div className={s.page}>
      {/* Rubber stamp logo */}
      <div className={s.stamp}>BEIRUX</div>

      {/* Panel 1: Yellow - Hero */}
      <Panel className={s.panelHero} direction="left">
        <span className={s.panelLabel}>001 / manifesto</span>
        <h1 className={s.heroHeadline}>
          WE DON&apos;T<br />
          DO<br />
          TEMPLATES.
        </h1>
        <p className={s.heroSub}>
          Every pixel is deliberate. Every system is custom.
          We build what doesn&apos;t exist yet.
        </p>
      </Panel>

      {/* Panel 2: Cyan - Services */}
      <Panel className={s.panelServices} direction="right">
        <span className={s.panelLabel}>002 / capabilities</span>
        <h2 className={s.sectionTitle}>What we build</h2>
        <ul className={s.serviceList}>
          {SERVICES.map((service) => (
            <li key={service} className={s.serviceItem}>
              {service}
            </li>
          ))}
        </ul>
      </Panel>

      {/* Panel 3: Hot pink - Clients */}
      <Panel className={s.panelClients} direction="left">
        <span className={s.panelLabel}>003 / portfolio</span>
        <h2 className={s.sectionTitle}>Built for</h2>
        <div className={s.clientGrid}>
          {CLIENTS.map((client) => (
            <span key={client} className={s.clientName}>
              {client}
            </span>
          ))}
        </div>
      </Panel>

      {/* Panel 4: White - Manifesto */}
      <Panel className={s.panelManifesto} direction="bottom">
        <span className={s.panelLabel}>004 / philosophy</span>
        <blockquote className={s.manifestoText}>
          We don&apos;t pitch decks. We ship products. We don&apos;t do
          &ldquo;discovery phases&rdquo; that last six months. We build the
          thing, put it in front of real users, and iterate with data. If your
          agency needs a committee to change a button color, we&apos;re not
          your agency. We&apos;re the one that replaces them.
        </blockquote>
      </Panel>

      {/* Panel 5: Lime - Stats */}
      <Panel className={s.panelStats} direction="right">
        <span className={s.panelLabel}>005 / proof</span>
        <div className={s.statsGrid}>
          {STATS.map((stat) => (
            <div key={stat.label} className={s.statBlock}>
              <span className={s.statValue}>{stat.value}</span>
              <span className={s.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </Panel>

      {/* Panel 6: Black - Contact */}
      <Panel className={s.panelContact} direction="bottom">
        <span className={s.panelLabelLight}>006 / connect</span>
        <h2 className={s.contactHeadline}>Let&apos;s build something.</h2>
        <a href="mailto:samih@beirux.com" className={s.contactEmail}>
          samih@beirux.com
        </a>
        <p className={s.contactNote}>New Jersey, USA</p>
      </Panel>
    </div>
  );
}
