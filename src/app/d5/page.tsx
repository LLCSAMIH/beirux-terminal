'use client';

import { useState } from 'react';
import { useInView } from '@/hooks/useInView';
import s from './d5.module.scss';

/* ─── data ─── */

const CHANNELS = [
  { id: 'CH.01', name: 'Digital Products', desc: 'Full-stack web and mobile apps. Schema to production, no shortcuts.', accent: 'pink' as const },
  { id: 'CH.02', name: 'AI Automation', desc: 'Autonomous agents, workflow engines, and systems that run 24/7 without babysitting.', accent: 'green' as const },
  { id: 'CH.03', name: 'Growth Ops', desc: 'SEO, analytics, paid media, and conversion infrastructure that compounds.', accent: 'yellow' as const },
  { id: 'CH.04', name: 'Branding', desc: 'Identity systems, design language, and visual standards. Zero templates.', accent: 'pink' as const },
  { id: 'CH.05', name: 'Infrastructure', desc: 'Cloud architecture, CI/CD, monitoring, and 99.9% uptime SLAs.', accent: 'green' as const },
  { id: 'CH.06', name: 'Strategy', desc: 'Product roadmaps, technical audits, and the hard conversations about what to build next.', accent: 'yellow' as const },
];

const CLIENTS = [
  { num: '01', name: 'Cartley LLC', type: 'SaaS Platform', hook: 'Multi-tenant architecture shipped in 11 weeks.' },
  { num: '02', name: 'Steven Paul Diamonds', type: 'E-Commerce', hook: '3D product views and a checkout that converts.' },
  { num: '03', name: 'Adonis Market', type: 'Marketplace', hook: 'Two-sided platform with real-time order tracking.' },
  { num: '04', name: 'Rides With Vinnie', type: 'Mobile App', hook: 'GPS, booking engine, driver management. Cross-platform.' },
  { num: '05', name: 'Key Vision LLC', type: 'Web Platform', hook: 'Data visualization and client portals, built to scale.' },
];

const METRICS = [
  { label: 'Projects', value: '12', height: 75 },
  { label: 'Agents', value: '4', height: 40 },
  { label: 'Uptime', value: '99.9%', height: 95 },
  { label: 'Clients', value: '5', height: 50 },
  { label: 'Builds', value: '847', height: 85 },
  { label: 'Templates', value: '0', height: 5 },
];

/* ─── section components ─── */

function VhsHero() {
  return (
    <section className={s.hero}>
      <div className={s.heroTitle}>
        <span className={s.heroGhost} aria-hidden="true">BEIRUX</span>
        <span className={s.heroMain}>BEIRUX</span>
      </div>
      <p className={s.heroTagline}>WE BUILD. WE SHIP. WE SHOW THE WORK.</p>
      <div className={s.heroRec}>
        <span className={s.recLabel}>REC <span className={s.recDot} /></span>
        <span className={s.recYear}>2026</span>
      </div>
    </section>
  );
}

function ChannelGrid() {
  return (
    <section className={s.channels}>
      <h2 className={s.channelsHeading}>Select Channel</h2>
      <div className={s.channelGrid}>
        {CHANNELS.map((ch) => (
          <ChannelCell key={ch.id} channel={ch} />
        ))}
      </div>
    </section>
  );
}

function ChannelCell({ channel }: { channel: (typeof CHANNELS)[number] }) {
  const { ref, isVisible } = useInView({ threshold: 0.2 });
  return (
    <div
      ref={ref}
      className={`${s.channel} ${isVisible ? s.visible : ''}`}
      data-accent={channel.accent}
    >
      <div className={s.channelNumber}>{channel.id}</div>
      <h3 className={s.channelName}>{channel.name}</h3>
      <p className={s.channelDesc}>{channel.desc}</p>
    </div>
  );
}

function MixtapeClients() {
  return (
    <section className={s.mixtape}>
      <h2 className={s.mixtapeHeading}>B-Side: Client Roster</h2>
      <p className={s.mixtapeSub}>Side B // Curated selection // All original pressings</p>
      <div className={s.inlayCard}>
        {CLIENTS.map((c) => (
          <div key={c.num} className={s.track}>
            <span className={s.trackNumber}>{c.num}</span>
            <div>
              <div>
                <span className={s.trackClient}>{c.name}</span>
                <span className={s.trackType}>({c.type})</span>
              </div>
              <p className={s.trackHook}>{c.hook}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FrequencyBars() {
  const { ref, isVisible } = useInView({ threshold: 0.25 });

  return (
    <section className={s.frequency} ref={ref}>
      <h2 className={s.frequencyHeading}>Signal Strength</h2>
      <div className={s.eqContainer}>
        {METRICS.map((m) => (
          <div key={m.label} className={s.eqCol}>
            <div
              className={`${s.eqBar} ${isVisible ? s.fill : ''}`}
              style={{ height: isVisible ? `${m.height}%` : '0%' }}
            />
            <span className={s.eqValue}>{m.value}</span>
            <span className={s.eqLabel}>{m.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function BroadcastManifesto() {
  return (
    <section className={s.manifesto}>
      <h2 className={s.manifestoTitle}>
        {'THIS IS NOT A TEMPLATE AGENCY.'.split(' ').map((word, i) => (
          <span key={i} className={s.manifestoWord}>{word}</span>
        ))}
      </h2>
      <p className={s.manifestoBody}>
        Every line of code is written for one client, one problem, one outcome.
        We run four AI agents around the clock because real leverage compounds,
        and real work does not come from a theme marketplace.
      </p>
      <div className={s.manifestoStars} aria-hidden="true">&#9733; &#9733; &#9733;</div>
    </section>
  );
}

function StaticCta() {
  const [hovered, setHovered] = useState(false);

  return (
    <section className={s.cta}>
      <div
        className={s.testCard}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className={s.colorBars}>
          <div className={s.colorBar} />
          <div className={s.colorBar} />
          <div className={s.colorBar} />
          <div className={s.colorBar} />
        </div>
        <div className={s.testCardInner}>
          <h2 className={s.ctaTitle}>Signal Open</h2>
          <div className={s.ctaEmail}>
            samih@beirux.com<span className={s.cursor} />
          </div>
          <div>
            <a href="mailto:samih@beirux.com" className={s.ctaButton}>
              Transmit &#8594;
            </a>
          </div>
          <p className={`${s.signalStatus} ${hovered ? s.connected : ''}`}>
            {hovered ? ':: CONNECTED ::' : ':: NO SIGNAL ::'}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── page ─── */

export default function D5Page() {
  return (
    <div className={s.page}>
      <VhsHero />
      <ChannelGrid />
      <MixtapeClients />
      <FrequencyBars />
      <BroadcastManifesto />
      <StaticCta />
    </div>
  );
}
