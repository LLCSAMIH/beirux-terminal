'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from '@/hooks/useInView';
import s from './d1.module.scss';

/* ─── data ─── */

const STATS = [
  { label: 'Projects', value: '12' },
  { label: 'Agents', value: '4' },
  { label: 'Uptime', value: '99.9%' },
  { label: 'Clients', value: '5' },
  { label: 'Templates', value: '0' },
];

const TIMELINE = [
  { date: '2024 Q1', title: 'Cartley LLC SaaS platform shipped', desc: 'Full-stack SaaS build from schema to production. Custom dashboard, billing integration, multi-tenant architecture.' },
  { date: '2024 Q2', title: 'Steven Paul Diamonds e-commerce launched', desc: 'High-end e-commerce with 3D product views, custom checkout flow, and inventory sync.' },
  { date: '2024 Q3', title: 'Adonis Market marketplace live', desc: 'Two-sided marketplace with vendor onboarding, payment splits, and real-time order tracking.' },
  { date: '2024 Q4', title: 'AI agent fleet deployed', desc: 'Four autonomous agents running 24/7: PM, dev, finance, and publishing. Zero human intervention.' },
  { date: '2025 Q1', title: 'Rides With Vinnie mobile app', desc: 'Cross-platform mobile app with real-time GPS, booking engine, and driver management.' },
  { date: '2025 Q2', title: 'Key Vision LLC web platform', desc: 'Custom web platform with advanced data visualization, client portals, and API integrations.' },
];

const AGENTS = [
  { name: 'Bebe', role: 'PM / Operations', color: 'cyan' as const, stats: ['Client standups daily', 'Task routing to all agents', 'Manages crons via Telegram'] },
  { name: 'Boba', role: 'Lead Developer', color: 'green' as const, stats: ['Orchestrates all code tasks', 'Build + deploy automation', '847 builds shipped'] },
  { name: 'Powell', role: 'Finance', color: 'orange' as const, stats: ['Invoice generation', 'Revenue tracking', 'Alert-only mode'] },
  { name: 'Bubbles', role: 'Publishing', color: 'purple' as const, stats: ['Content scheduling', 'Social distribution', 'Cross-platform sync'] },
];

const FEED_EVENTS = [
  { time: '14:22:01', agent: 'bebe', color: 'cyan' as const, msg: 'Client standup completed: Cartley LLC' },
  { time: '14:18:33', agent: 'boba', color: 'green' as const, msg: 'Build #847 deployed to production' },
  { time: '14:15:07', agent: 'powell', color: 'orange' as const, msg: 'Invoice #0042 generated: $12,400' },
  { time: '14:12:44', agent: 'bubbles', color: 'purple' as const, msg: 'Blog post scheduled: "Why We Killed Templates"' },
  { time: '14:08:19', agent: 'boba', color: 'green' as const, msg: 'PR #312 merged: auth flow refactor' },
  { time: '14:05:55', agent: 'bebe', color: 'cyan' as const, msg: 'New lead ingested: inquiry@example.com' },
  { time: '14:02:11', agent: 'boba', color: 'green' as const, msg: 'Database migration completed: 0.4s' },
  { time: '13:58:30', agent: 'powell', color: 'orange' as const, msg: 'Monthly revenue report: $48,200 (+12%)' },
  { time: '13:55:02', agent: 'bubbles', color: 'purple' as const, msg: 'Portfolio case study published: Adonis Market' },
  { time: '13:50:18', agent: 'bebe', color: 'cyan' as const, msg: 'Sprint velocity updated: 94 pts/week' },
];

const SERVICES = [
  { name: 'Digital Products', status: 'ACTIVE', deployed: '12', metric: '4.2wk avg delivery' },
  { name: 'AI Automation', status: 'ACTIVE', deployed: '8', metric: '24/7 uptime' },
  { name: 'Growth Ops', status: 'ACTIVE', deployed: '6', metric: '+34% avg ROI' },
  { name: 'Branding', status: 'ACTIVE', deployed: '5', metric: '100% custom' },
  { name: 'Infrastructure', status: 'ACTIVE', deployed: '9', metric: '99.9% SLA' },
];

const BARS = [
  { label: 'Client Satisfaction', value: 92 },
  { label: 'On-Time Delivery', value: 96 },
  { label: 'System Uptime', value: 99.9 },
];

const METRIC_TILES = [
  { label: 'Projects Shipped', value: '12' },
  { label: 'Avg Delivery', value: '4 wks' },
  { label: 'Response Time', value: '<2h' },
  { label: 'Code Reviews', value: '100%' },
  { label: 'Zero Downtime Deploys', value: '47' },
  { label: 'Lines Shipped', value: '240k+' },
];

/* ─── components ─── */

function StatusBarHero() {
  const [time, setTime] = useState('');

  useEffect(() => {
    function tick() {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className={s.hero}>
      <div className={s.heroGrid} />
      <div className={s.statusBar}>
        <span className={s.statusDot} />
        <span className={s.statusText}>ALL SYSTEMS OPERATIONAL</span>
        <span className={s.statusTime}>{time}</span>
      </div>
      <div className={s.heroCenter}>
        <h1 className={s.heroTitle}>BEIRUX</h1>
        <p className={s.heroSub}>Digital Operations Command</p>
      </div>
      <div className={s.statRow}>
        {STATS.map((st) => (
          <div key={st.label} className={s.statCard}>
            <span className={s.statValue}>{st.value}</span>
            <span className={s.statLabel}>{st.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function OrbitalTimeline() {
  return (
    <section className={s.timeline}>
      <div className={s.timelineRadial} />
      <h2 className={s.sectionLabel}>// MISSION LOG</h2>
      <div className={s.timelineTrack}>
        <div className={s.timelineLine} />
        {TIMELINE.map((item, i) => (
          <TimelineNode key={item.date} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

function TimelineNode({ item, index }: { item: typeof TIMELINE[number]; index: number }) {
  const { ref, isVisible } = useInView({ threshold: 0.2 });
  const side = index % 2 === 0 ? 'left' : 'right';

  return (
    <div
      ref={ref}
      className={`${s.timelineNode} ${s[side]} ${isVisible ? s.nodeVisible : ''}`}
    >
      <div className={s.nodeDot} />
      <div className={s.nodeContent}>
        <span className={s.nodeDate}>{item.date}</span>
        <h3 className={s.nodeTitle}>{item.title}</h3>
        <p className={s.nodeDesc}>{item.desc}</p>
      </div>
    </div>
  );
}

function AgentRoster() {
  return (
    <section className={s.roster}>
      <h2 className={s.sectionLabel}>// AGENT ROSTER</h2>
      <div className={s.rosterGrid}>
        {AGENTS.map((agent) => (
          <AgentCard key={agent.name} agent={agent} />
        ))}
      </div>
    </section>
  );
}

function AgentCard({ agent }: { agent: typeof AGENTS[number] }) {
  const { ref, isVisible } = useInView({ threshold: 0.2 });
  return (
    <div ref={ref} className={`${s.agentCard} ${s[`agent_${agent.color}`]} ${isVisible ? s.agentVisible : ''}`}>
      <div className={s.agentHeader}>
        <span className={s.agentName}>{agent.name}</span>
        <span className={s.agentStatus}>
          <span className={`${s.agentDot} ${s[`dot_${agent.color}`]}`} />
          ONLINE
        </span>
      </div>
      <span className={s.agentRole}>{agent.role}</span>
      <ul className={s.agentStats}>
        {agent.stats.map((stat) => (
          <li key={stat}>{stat}</li>
        ))}
      </ul>
    </div>
  );
}

function LiveFeed() {
  const { ref, isVisible } = useInView({ threshold: 0.1 });
  return (
    <section className={s.feed}>
      <h2 className={s.sectionLabel}>// LIVE FEED</h2>
      <div ref={ref} className={s.feedPanel}>
        <div className={s.scanlines} />
        {FEED_EVENTS.map((evt, i) => (
          <div
            key={i}
            className={`${s.feedRow} ${s[`feed_${evt.color}`]} ${isVisible ? s.feedRowVisible : ''}`}
            style={{ transitionDelay: isVisible ? `${i * 80}ms` : '0ms' }}
          >
            <span className={s.feedTime}>[{evt.time}]</span>
            <span className={s.feedAgent}>{evt.agent}:</span>
            <span className={s.feedMsg}>{evt.msg}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServicesMatrix() {
  const { ref, isVisible } = useInView({ threshold: 0.1 });
  return (
    <section className={s.matrix}>
      <h2 className={s.sectionLabel}>// SERVICES MATRIX</h2>
      <div ref={ref} className={s.matrixTable}>
        <div className={s.matrixHeaderRow}>
          <span>Service</span>
          <span>Status</span>
          <span>Deployed</span>
          <span>Metric</span>
        </div>
        {SERVICES.map((svc, i) => (
          <div
            key={svc.name}
            className={`${s.matrixRow} ${isVisible ? s.matrixRowVisible : ''}`}
            style={{ transitionDelay: isVisible ? `${i * 120}ms` : '0ms' }}
          >
            <span className={s.matrixService}>{svc.name}</span>
            <span className={s.matrixStatus}>{svc.status}</span>
            <span className={s.matrixDeployed}>{svc.deployed}</span>
            <span className={s.matrixMetric}>{svc.metric}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function TelemetryDashboard() {
  const { ref, isVisible } = useInView({ threshold: 0.2 });
  return (
    <section className={s.telemetry}>
      <h2 className={s.sectionLabel}>// TELEMETRY</h2>
      <div ref={ref} className={s.telemetryBars}>
        {BARS.map((bar) => (
          <div key={bar.label} className={s.barGroup}>
            <div className={s.barLabelRow}>
              <span className={s.barLabel}>{bar.label}</span>
              <span className={s.barValue}>{bar.value}%</span>
            </div>
            <div className={s.barTrack}>
              <div
                className={`${s.barFill} ${isVisible ? s.barFillActive : ''}`}
                style={{ '--bar-target': `${bar.value}%` } as React.CSSProperties}
              />
            </div>
          </div>
        ))}
      </div>
      <div className={s.metricGrid}>
        {METRIC_TILES.map((tile) => (
          <MetricTile key={tile.label} tile={tile} />
        ))}
      </div>
    </section>
  );
}

function MetricTile({ tile }: { tile: typeof METRIC_TILES[number] }) {
  const { ref, isVisible } = useInView({ threshold: 0.3 });
  return (
    <div ref={ref} className={`${s.metricTile} ${isVisible ? s.metricVisible : ''}`}>
      <span className={s.metricTileValue}>{tile.value}</span>
      <span className={s.metricTileLabel}>{tile.label}</span>
    </div>
  );
}

function TransmissionCTA() {
  const { ref, isVisible } = useInView({ threshold: 0.2 });
  return (
    <section className={s.transmission}>
      <div ref={ref} className={`${s.transmissionBox} ${isVisible ? s.transmissionVisible : ''}`}>
        <h2 className={s.transmissionTitle}>INITIATE NEW PROJECT</h2>
        <div className={s.transmissionCommand}>
          <span className={s.commandPrompt}>&gt;</span>
          <a href="mailto:inquiry@beirux.com" className={s.commandText}>
            ssh inquiry@beirux.com
          </a>
          <span className={s.cursor} />
        </div>
        <p className={s.transmissionNote}>
          Transmission channel open. All frequencies monitored.
        </p>
      </div>
    </section>
  );
}

/* ─── page ─── */

export default function D1Page() {
  return (
    <main className={s.page}>
      <StatusBarHero />
      <OrbitalTimeline />
      <AgentRoster />
      <LiveFeed />
      <ServicesMatrix />
      <TelemetryDashboard />
      <TransmissionCTA />
    </main>
  );
}
