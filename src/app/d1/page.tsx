'use client';

import { useEffect, useState } from 'react';
import s from './d1.module.scss';

/* ─── data ─── */

const AGENTS = [
  { name: 'Bebe', role: 'PM / Ops', status: 'ONLINE', color: 'cyan' as const },
  { name: 'Boba', role: 'Lead Dev', status: 'ONLINE', color: 'green' as const },
  { name: 'Powell', role: 'Finance', status: 'STANDBY', color: 'orange' as const },
  { name: 'Bubbles', role: 'Publishing', status: 'ONLINE', color: 'purple' as const },
];

const SERVICES = [
  { name: 'Digital Products', status: 'ACTIVE', load: 87 },
  { name: 'AI Automation', status: 'ACTIVE', load: 94 },
  { name: 'Growth Ops', status: 'ACTIVE', load: 72 },
  { name: 'Branding', status: 'ACTIVE', load: 65 },
  { name: 'Infrastructure', status: 'ACTIVE', load: 99 },
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
];

const METRICS = [
  { label: 'Projects Shipped', value: '12' },
  { label: 'Avg Delivery', value: '4.2 wks' },
  { label: 'System Uptime', value: '99.9%' },
  { label: 'Active Clients', value: '5' },
];

/* ─── clock hook ─── */

function useClock() {
  const [time, setTime] = useState('--:--:--');
  const [date, setDate] = useState('');

  useEffect(() => {
    function tick() {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
      setDate(
        now.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
        })
      );
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return { time, date };
}

/* ─── page ─── */

export default function D1Page() {
  const { time, date } = useClock();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className={`${s.dashboard} ${mounted ? s.mounted : ''}`}>
      {/* ── top bar ── */}
      <header className={s.topBar}>
        <div className={s.topBarLeft}>
          <span className={s.statusDot} />
          <span className={s.statusLabel}>ALL SYSTEMS OPERATIONAL</span>
        </div>
        <span className={s.topBarTitle}>BEIRUX MISSION CONTROL</span>
        <div className={s.topBarRight}>
          <span className={s.topBarDate}>{date}</span>
          <span className={s.clock}>{time}</span>
        </div>
      </header>

      {/* ── identity panel ── */}
      <section className={s.identity}>
        <h1 className={s.logoMark}>BEIRUX</h1>
        <p className={s.tagline}>Digital Operations Command</p>
        <div className={s.metricRow}>
          {METRICS.map((m) => (
            <div key={m.label} className={s.metricCell}>
              <span className={s.metricValue}>{m.value}</span>
              <span className={s.metricLabel}>{m.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── agent roster ── */}
      <section className={s.agents}>
        <h2 className={s.panelTitle}>// AGENT ROSTER</h2>
        <div className={s.agentList}>
          {AGENTS.map((a) => (
            <div key={a.name} className={`${s.agentRow} ${s[`accent_${a.color}`]}`}>
              <span className={`${s.agentDot} ${s[`dot_${a.color}`]}`} />
              <span className={s.agentName}>{a.name}</span>
              <span className={s.agentRole}>{a.role}</span>
              <span className={`${s.agentStatus} ${a.status === 'ONLINE' ? s.online : s.standby}`}>
                {a.status}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── services matrix ── */}
      <section className={s.services}>
        <h2 className={s.panelTitle}>// SERVICES</h2>
        <div className={s.serviceList}>
          {SERVICES.map((svc) => (
            <div key={svc.name} className={s.serviceRow}>
              <span className={s.serviceName}>{svc.name}</span>
              <div className={s.serviceBarTrack}>
                <div
                  className={s.serviceBarFill}
                  style={{ '--load': `${svc.load}%` } as React.CSSProperties}
                />
              </div>
              <span className={s.serviceLoad}>{svc.load}%</span>
              <span className={s.serviceStatus}>{svc.status}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── live feed ── */}
      <section className={s.feed}>
        <h2 className={s.panelTitle}>// LIVE FEED</h2>
        <div className={s.feedScroll}>
          <div className={s.scanlines} />
          {FEED_EVENTS.map((evt, i) => (
            <div key={i} className={`${s.feedRow} ${s[`feed_${evt.color}`]}`}>
              <span className={s.feedTime}>[{evt.time}]</span>
              <span className={s.feedAgent}>{evt.agent}:</span>
              <span className={s.feedMsg}>{evt.msg}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── transmission CTA ── */}
      <section className={s.transmission}>
        <div className={s.transmissionInner}>
          <h2 className={s.transmissionTitle}>INITIATE TRANSMISSION</h2>
          <div className={s.commandLine}>
            <span className={s.prompt}>&gt;</span>
            <a href="mailto:inquiry@beirux.com" className={s.commandLink}>
              ssh inquiry@beirux.com
            </a>
            <span className={s.cursor} />
          </div>
          <p className={s.transmissionSub}>All frequencies monitored. Response time &lt;2h.</p>
        </div>
      </section>

      {/* ── bottom status ── */}
      <footer className={s.bottomBar}>
        <span className={s.bottomSys}>SYS:OK</span>
        <span className={s.bottomNet}>NET:STABLE</span>
        <span className={s.bottomBuild}>BUILD:#847</span>
        <span className={s.bottomVer}>v2.4.0</span>
      </footer>
    </main>
  );
}
