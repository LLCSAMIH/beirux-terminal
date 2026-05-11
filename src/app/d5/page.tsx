'use client';

import { useMemo } from 'react';
import { useStickyScroll } from '@/hooks/useStickyScroll';
import s from './d5.module.scss';

/* ─── data ─── */

const CHANNELS = [
  { id: 'CH.01', name: 'Digital Products', desc: 'Full-stack web and mobile apps. Schema to production.', accent: 'pink' as const },
  { id: 'CH.02', name: 'AI Automation', desc: 'Autonomous agents and workflow engines that run 24/7.', accent: 'green' as const },
  { id: 'CH.03', name: 'Growth Ops', desc: 'SEO, analytics, paid media, conversion infrastructure.', accent: 'amber' as const },
  { id: 'CH.04', name: 'Branding', desc: 'Identity systems and design language. Zero templates.', accent: 'pink' as const },
  { id: 'CH.05', name: 'Infrastructure', desc: 'Cloud architecture, CI/CD, monitoring, 99.9% uptime.', accent: 'green' as const },
  { id: 'CH.06', name: 'Strategy', desc: 'Product roadmaps, technical audits, hard conversations.', accent: 'amber' as const },
];

const CLIENTS = [
  { num: '01', name: 'Cartley LLC', type: 'SaaS Platform' },
  { num: '02', name: 'Steven Paul Diamonds', type: 'E-Commerce' },
  { num: '03', name: 'Adonis Market', type: 'Marketplace' },
  { num: '04', name: 'Rides With Vinnie', type: 'Mobile App' },
  { num: '05', name: 'Key Vision LLC', type: 'Web Platform' },
];

const TOTAL_FRAMES = 5;

/* ─── helpers ─── */

function progressToTimecode(p: number): string {
  const totalSeconds = Math.floor(p * 327);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  const frames = Math.floor((p * 327 - totalSeconds) * 30);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}:${String(frames).padStart(2, '0')}`;
}

/* ─── frame components ─── */

function TitleCard() {
  return (
    <div className={s.frame}>
      <div className={s.titleCard}>
        <div className={s.trackingLines} aria-hidden="true" />
        <div className={s.titleContent}>
          <span className={s.titleGhost} aria-hidden="true">BEIRUX</span>
          <h1 className={s.titleMain}>BEIRUX</h1>
        </div>
        <p className={s.titleTagline}>
          WE BUILD. WE SHIP. WE SHOW THE WORK.
        </p>
        <div className={s.titleMeta}>
          <span className={s.titleYear}>2026</span>
          <span className={s.titleDivider}>|</span>
          <span className={s.titleLabel}>DIGITAL AGENCY</span>
        </div>
      </div>
    </div>
  );
}

function ChannelGuide() {
  return (
    <div className={s.frame}>
      <div className={s.channelGuide}>
        <div className={s.channelHeader}>
          <span className={s.channelHeaderIcon}>&#9632;</span>
          <h2 className={s.channelHeading}>Channel Guide</h2>
          <span className={s.channelHeaderTime}>LIVE</span>
        </div>
        <div className={s.channelList}>
          {CHANNELS.map((ch) => (
            <div key={ch.id} className={s.channelRow} data-accent={ch.accent}>
              <span className={s.channelId}>{ch.id}</span>
              <div className={s.channelInfo}>
                <span className={s.channelName}>{ch.name}</span>
                <span className={s.channelDesc}>{ch.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ClientReel() {
  return (
    <div className={s.frame}>
      <div className={s.clientReel}>
        <h2 className={s.reelTitle}>Client Reel</h2>
        <div className={s.creditScroll}>
          {CLIENTS.map((c) => (
            <div key={c.num} className={s.creditLine}>
              <span className={s.creditNum}>{c.num}</span>
              <span className={s.creditName}>{c.name}</span>
              <span className={s.creditType}>{c.type}</span>
            </div>
          ))}
        </div>
        <div className={s.reelFooter}>
          <span>A BEIRUX PRODUCTION</span>
        </div>
      </div>
    </div>
  );
}

function BroadcastManifesto() {
  return (
    <div className={s.frame}>
      <div className={s.manifesto}>
        <h2 className={s.manifestoTitle}>
          {'THIS IS NOT A TEMPLATE AGENCY.'.split(' ').map((word, i) => (
            <span key={i} className={s.manifestoWord}>{word} </span>
          ))}
        </h2>
        <p className={s.manifestoBody}>
          Every line of code is written for one client, one problem, one outcome.
          We run four AI agents around the clock because real leverage compounds,
          and real work does not come from a theme marketplace.
        </p>
      </div>
    </div>
  );
}

function SignalCta() {
  return (
    <div className={s.frame}>
      <div className={s.signalCta}>
        <div className={s.testBars}>
          <div className={s.bar} data-color="pink" />
          <div className={s.bar} data-color="green" />
          <div className={s.bar} data-color="amber" />
          <div className={s.bar} data-color="white" />
          <div className={s.bar} data-color="green" />
          <div className={s.bar} data-color="pink" />
          <div className={s.bar} data-color="amber" />
        </div>
        <div className={s.signalContent}>
          <h2 className={s.signalTitle}>Signal Open</h2>
          <div className={s.signalEmail}>
            samih@beirux.com<span className={s.signalCursor} />
          </div>
          <a href="mailto:samih@beirux.com" className={s.signalButton}>
            Transmit
          </a>
        </div>
        <div className={s.testBars}>
          <div className={s.bar} data-color="amber" />
          <div className={s.bar} data-color="pink" />
          <div className={s.bar} data-color="green" />
          <div className={s.bar} data-color="white" />
          <div className={s.bar} data-color="amber" />
          <div className={s.bar} data-color="green" />
          <div className={s.bar} data-color="pink" />
        </div>
      </div>
    </div>
  );
}

/* ─── page ─── */

export default function D5Page() {
  const { wrapperRef, progress } = useStickyScroll();

  const translateX = useMemo(() => {
    const maxShift = (TOTAL_FRAMES - 1) * 100;
    return -(progress * maxShift);
  }, [progress]);

  const timecode = useMemo(() => progressToTimecode(progress), [progress]);

  const currentFrame = Math.min(
    TOTAL_FRAMES,
    Math.floor(progress * TOTAL_FRAMES) + 1
  );

  return (
    <div className={s.page} ref={wrapperRef}>
      {/* Fixed CRT frame */}
      <div className={s.crtFrame}>
        {/* Scanline overlay */}
        <div className={s.scanlines} aria-hidden="true" />

        {/* CRT vignette */}
        <div className={s.vignette} aria-hidden="true" />

        {/* Tape counter */}
        <div className={s.tapeCounter}>
          <span className={s.counterLabel}>TC</span>
          <span className={s.counterValue}>{timecode}</span>
        </div>

        {/* REC indicator */}
        <div className={s.recIndicator}>
          <span className={s.recDot} />
          <span className={s.recText}>REC</span>
        </div>

        {/* Frame indicator */}
        <div className={s.frameIndicator}>
          {currentFrame}/{TOTAL_FRAMES}
        </div>

        {/* Horizontal content track */}
        <div className={s.viewport}>
          <div
            className={s.track}
            style={{ transform: `translateX(${translateX}%)` }}
          >
            <TitleCard />
            <ChannelGuide />
            <ClientReel />
            <BroadcastManifesto />
            <SignalCta />
          </div>
        </div>
      </div>
    </div>
  );
}
