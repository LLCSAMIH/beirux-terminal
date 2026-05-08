'use client';

import { useState, useEffect } from 'react';
import { useInView } from '@/hooks/useInView';
import { useStickyScroll } from '@/hooks/useStickyScroll';
import s from './v4.module.scss';

/* ─── Boot sequence lines ─── */

const ASCII_LOGO = `
 ██████╗ ███████╗██╗██████╗ ██╗   ██╗██╗  ██╗
 ██╔══██╗██╔════╝██║██╔══██╗██║   ██║╚██╗██╔╝
 ██████╔╝█████╗  ██║██████╔╝██║   ██║ ╚███╔╝
 ██╔══██╗██╔══╝  ██║██╔══██╗██║   ██║ ██╔██╗
 ██████╔╝███████╗██║██║  ██║╚██████╔╝██╔╝ ██╗
 ╚═════╝ ╚══════╝╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝`;

interface BootLine {
  text: string;
  type: 'system' | 'ascii' | 'tagline' | 'separator' | 'blank';
}

const BOOT_SEQUENCE: BootLine[] = [
  { text: '$ ssh root@beirux.com', type: 'system' },
  { text: 'Connecting to beirux.com (149.28.44.12)... established.', type: 'system' },
  { text: 'Last login: Mon May  5 09:14:22 2026 from miami.local', type: 'system' },
  { text: '', type: 'blank' },
  { text: '────────────────────────────────────────────────────────', type: 'separator' },
  { text: ASCII_LOGO, type: 'ascii' },
  { text: '', type: 'blank' },
  { text: '  DIGITAL AGENCY // MIAMI, FL', type: 'system' },
  { text: '  Build v4.2.0 | Kernel 6.1.0-beirux | Uptime 1,247d', type: 'system' },
  { text: '────────────────────────────────────────────────────────', type: 'separator' },
  { text: '', type: 'blank' },
  { text: '  System status ........... ALL SERVICES OPERATIONAL', type: 'system' },
  { text: '  Active agents ........... 4 (Bebe, Boba, Powell, Bubbles)', type: 'system' },
  { text: '  Projects in flight ...... 3', type: 'system' },
  { text: '  Client satisfaction ..... 92%', type: 'system' },
  { text: '  Templates used .......... 0', type: 'system' },
  { text: '', type: 'blank' },
  { text: 'We build. We ship. We show the work.', type: 'tagline' },
  { text: '', type: 'blank' },
  { text: '  Type `beirux --help` for available commands.', type: 'system' },
  { text: '  Scroll to continue >', type: 'system' },
];

/* ─── Services data ─── */

const SERVICES = [
  {
    flag: '--digital-products',
    alias: '-d',
    desc: 'Web apps, mobile, SaaS platforms. From zero to production.',
    stat: '12 shipped',
  },
  {
    flag: '--ai-automation',
    alias: '-a',
    desc: 'Agents, pipelines, integrations. Systems that run themselves.',
    stat: '47 workflows',
  },
  {
    flag: '--growth-ops',
    alias: '-g',
    desc: 'SEO, paid, CRO, analytics. Data-driven, no guessing.',
    stat: '3.2x avg ROI',
  },
  {
    flag: '--branding',
    alias: '-b',
    desc: 'Identity, design systems, visual language. Built to last.',
    stat: '8 brands',
  },
  {
    flag: '--infra',
    alias: '-i',
    desc: 'Cloud, CI/CD, monitoring, security. The foundation under everything.',
    stat: '99.9% uptime',
  },
];

/* ─── Clients data ─── */

interface Client {
  name: string;
  type: string;
  status: string;
  since: string;
}

const CLIENTS: Client[] = [
  { name: 'Cartley LLC', type: 'SaaS Platform', status: 'ACTIVE', since: '2024-03' },
  { name: 'Steven Paul Diamonds', type: 'E-Commerce', status: 'ACTIVE', since: '2024-06' },
  { name: 'Adonis Market', type: 'Marketplace', status: 'ACTIVE', since: '2024-09' },
  { name: 'Rides With Vinnie', type: 'Mobile App', status: 'ACTIVE', since: '2025-01' },
  { name: 'Key Vision LLC', type: 'Web Platform', status: 'ACTIVE', since: '2025-04' },
];

/* ─── Dashboard stats ─── */

const DASH_STATS = [
  { label: 'Projects Shipped', value: '12', color: 'cyan' },
  { label: 'Active Clients', value: '5', color: 'cyan' },
  { label: 'AI Agents Running', value: '4', color: 'cyan' },
  { label: 'Avg Delivery', value: '4 wks', color: 'pink' },
  { label: 'Client Retention', value: '92%', color: 'cyan' },
  { label: 'Templates Used', value: '0', color: 'cyan' },
  { label: 'Response Time', value: '<2h', color: 'cyan' },
  { label: 'Custom Built', value: '100%', color: 'pink' },
];

const DASH_BARS = [
  { label: 'Client Satisfaction', percent: 92, color: 'cyan' },
  { label: 'On-Time Delivery', percent: 96, color: 'cyan' },
  { label: 'Code Quality Score', percent: 88, color: 'cyan' },
  { label: 'System Uptime', percent: 99, color: 'cyan' },
  { label: 'Agent Autonomy', percent: 74, color: 'pink' },
];

/* ─── Traceroute data ─── */

const TRACEROUTE_HOPS = [
  { num: 1, host: 'discovery.beirux.local', ip: '10.0.1.1', times: ['1.203', '0.892', '1.104'], desc: 'We listen. Goals, constraints, what\'s been tried.' },
  { num: 2, host: 'research.beirux.local', ip: '10.0.2.1', times: ['3.412', '2.891', '3.207'], desc: 'Market, competition, technical feasibility.' },
  { num: 3, host: 'strategy.beirux.local', ip: '10.0.3.1', times: ['7.824', '6.513', '7.102'], desc: 'Architecture decisions, timeline, success metrics.' },
  { num: 4, host: 'design.beirux.local', ip: '10.0.4.1', times: ['12.341', '11.827', '12.005'], desc: 'Wireframes, prototypes, visual direction.' },
  { num: 5, host: 'build.beirux.local', ip: '10.0.5.1', times: ['18.702', '17.234', '18.119'], desc: 'Code, integrations, real infrastructure.' },
  { num: 6, host: 'test.beirux.local', ip: '10.0.6.1', times: ['22.415', '21.903', '22.087'], desc: 'Load testing, edge cases, security audit.' },
  { num: 7, host: 'deploy.beirux.local', ip: '10.0.7.1', times: ['24.106', '23.812', '24.001'], desc: 'CI/CD pipeline, monitoring, go-live.' },
  { num: 8, host: 'project.beirux.com', ip: '149.28.44.12', times: ['25.331', '24.998', '25.102'], desc: 'Live in production. Our ops team watches it from here.' },
];

/* ─── Crontab data ─── */

interface CrontabEntry {
  type: 'comment' | 'commentBold' | 'job' | 'blank' | 'sectionHeader';
  text?: string;
  schedule?: string;
  path?: string;
  flags?: string;
  running?: boolean;
}

const CRONTAB_LINES: CrontabEntry[] = [
  { type: 'blank' },
  { type: 'commentBold', text: '# ════════════════════════════════════════════════════════' },
  { type: 'commentBold', text: '# BEIRUX Automated Operations' },
  { type: 'comment', text: '# Maintained by: Boba (lead dev agent)' },
  { type: 'comment', text: '# Last modified: 2026-05-06 14:22:01 EST' },
  { type: 'commentBold', text: '# ════════════════════════════════════════════════════════' },
  { type: 'blank' },
  { type: 'sectionHeader', text: '# -- Client Monitoring -----------------------------------' },
  { type: 'job', schedule: '*/5 * * * *', path: '/opt/beirux/agents/bebe', flags: ' --monitor-clients --alert=telegram', running: true },
  { type: 'job', schedule: '0 9 * * 1-5', path: '/opt/beirux/agents/bebe', flags: ' --daily-standup --channel=#ops' },
  { type: 'job', schedule: '0 18 * * 5', path: '/opt/beirux/agents/bebe', flags: ' --weekly-summary --to=samih' },
  { type: 'blank' },
  { type: 'sectionHeader', text: '# -- AI Agent Operations ---------------------------------' },
  { type: 'job', schedule: '*/15 * * * *', path: '/opt/beirux/agents/boba', flags: ' --check-build-queue --auto-assign', running: true },
  { type: 'job', schedule: '0 */4 * * *', path: '/opt/beirux/agents/powell', flags: ' --financial-scan --threshold=500' },
  { type: 'job', schedule: '0 6 * * *', path: '/opt/beirux/agents/bubbles', flags: ' --publish-queue --auto' },
  { type: 'blank' },
  { type: 'sectionHeader', text: '# -- Reporting & Analytics -------------------------------' },
  { type: 'job', schedule: '0 8 * * 1', path: '/opt/beirux/reports/weekly-analytics', flags: ' --all-clients --format=pdf' },
  { type: 'job', schedule: '0 0 1 * *', path: '/opt/beirux/reports/monthly-revenue', flags: ' --notify=slack' },
  { type: 'job', schedule: '30 9 * * 1', path: '/opt/beirux/reports/seo-rankings', flags: ' --compare=last-week' },
  { type: 'blank' },
  { type: 'sectionHeader', text: '# -- Infrastructure --------------------------------------' },
  { type: 'job', schedule: '0 3 * * *', path: '/opt/beirux/ops/backup', flags: ' --incremental --encrypt --s3' },
  { type: 'job', schedule: '0 4 * * 0', path: '/opt/beirux/ops/security-scan', flags: ' --deep --report --notify' },
  { type: 'job', schedule: '0 2 1 * *', path: '/opt/beirux/ops/cert-renewal', flags: ' --auto --domains=all' },
];

/* ─── Tail log data ─── */

const TAIL_LOGS = [
  { time: '2026-04-28 14:22:01', level: 'INFO', client: 'cartley-llc', msg: 'Shipped their SaaS MVP in 3 weeks. Users onboarded day one.' },
  { time: '2026-04-15 09:41:33', level: 'INFO', client: 'adonis-market', msg: 'Marketplace handles 10x the traffic we planned for.' },
  { time: '2026-03-22 16:08:17', level: 'INFO', client: 'steven-paul', msg: 'E-commerce conversion rate: +127% post-redesign.' },
  { time: '2026-03-01 11:33:42', level: 'INFO', client: 'rides-w-vinnie', msg: 'Mobile app hit 4.8* on App Store within first month.' },
  { time: '2026-02-14 08:15:09', level: 'INFO', client: 'key-vision', msg: 'Platform scaled from 50 to 2,000 users. Zero downtime.' },
  { time: '2026-01-30 19:44:21', level: 'WARN', client: 'system', msg: 'Client attempted to pay above quoted rate. Politely declined.' },
  { time: '2026-01-15 10:02:55', level: 'INFO', client: 'cartley-llc', msg: '"Best technical partner we\'ve worked with." -- CEO, Cartley LLC' },
];

/* ─── Vim manifesto data ─── */

interface ManifestoLine {
  text: string;
  type: 'blank' | 'heading' | 'subheading' | 'principle-num' | 'principle-title' | 'principle-body' | 'author' | 'comment';
}

const MANIFESTO_LINES: ManifestoLine[] = [
  { text: '# BEIRUX MANIFESTO', type: 'heading' },
  { text: '# ================', type: 'subheading' },
  { text: '', type: 'blank' },
  { text: '# We are not an agency. We are an operating system', type: 'comment' },
  { text: '# for building digital products.', type: 'comment' },
  { text: '', type: 'blank' },
  { text: '# PRINCIPLES:', type: 'heading' },
  { text: '', type: 'blank' },
  { text: '#   1. Ship > Slide decks', type: 'principle-num' },
  { text: '#      If it doesn\'t run in production, it doesn\'t exist.', type: 'principle-body' },
  { text: '', type: 'blank' },
  { text: '#   2. Zero templates', type: 'principle-num' },
  { text: '#      Every project starts from first principles.', type: 'principle-body' },
  { text: '#      Your business is not a template.', type: 'principle-body' },
  { text: '', type: 'blank' },
  { text: '#   3. AI-native, not AI-washed', type: 'principle-num' },
  { text: '#      Our agents run 24/7. They monitor, report, deploy.', type: 'principle-body' },
  { text: '#      This isn\'t a buzzword. Check the crontab.', type: 'principle-body' },
  { text: '', type: 'blank' },
  { text: '#   4. Show the work', type: 'principle-num' },
  { text: '#      No mystery. No black boxes. You see every commit,', type: 'principle-body' },
  { text: '#      every deploy, every metric.', type: 'principle-body' },
  { text: '', type: 'blank' },
  { text: '#   5. Operators, not vendors', type: 'principle-num' },
  { text: '#      We don\'t hand off and disappear. We operate what', type: 'principle-body' },
  { text: '#      we build. Our uptime is your uptime.', type: 'principle-body' },
  { text: '', type: 'blank' },
  { text: '# -- Samih Mansour, Founder', type: 'author' },
  { text: '# -- Miami, FL | 2026', type: 'author' },
];

/* ─── Typewriter hook ─── */

function useTypewriter(text: string, speed: number, startTyping: boolean) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!startTyping) {
      setDisplayed('');
      setDone(false);
      return;
    }

    let i = 0;
    setDisplayed('');
    setDone(false);

    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, startTyping]);

  return { displayed, done };
}

/* ─── Helper: pad string to width ─── */

function pad(str: string, width: number): string {
  return str + ' '.repeat(Math.max(0, width - str.length));
}

/* ─── Helper: animated counter hook ─── */

function useCountUp(target: number, duration: number, start: boolean): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) { setValue(0); return; }

    const startTime = Date.now();
    const id = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress >= 1) clearInterval(id);
    }, 16);

    return () => clearInterval(id);
  }, [target, duration, start]);

  return value;
}

/* ═══════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════ */

function HeroSection() {
  const { wrapperRef, progress } = useStickyScroll();
  const [prevCount, setPrevCount] = useState(0);
  const [asciiShown, setAsciiShown] = useState(false);

  // Map progress to number of visible boot lines
  const totalLines = BOOT_SEQUENCE.length;
  const visibleCount = Math.floor(progress * totalLines * 1.4); // 1.4 to finish before end of scroll

  // Track which line just appeared for phosphor flash
  useEffect(() => {
    setPrevCount(visibleCount);
  }, [visibleCount]);

  // Track ASCII logo first appearance
  useEffect(() => {
    const asciiIdx = BOOT_SEQUENCE.findIndex(l => l.type === 'ascii');
    if (visibleCount > asciiIdx && !asciiShown) {
      setAsciiShown(true);
    }
  }, [visibleCount, asciiShown]);

  return (
    <div className={s.heroWrapper} ref={wrapperRef} id="hero">
      <div className={s.heroSticky}>
        <div className={s.terminal}>
          {BOOT_SEQUENCE.map((line, i) => {
            const isVisible = i < visibleCount;
            const justAppeared = isVisible && i >= prevCount - 1 && i === visibleCount - 1;
            const classes = [
              s.bootLine,
              isVisible ? s.visible : '',
              justAppeared ? s.phosphorFlash : '',
            ].filter(Boolean).join(' ');

            if (line.type === 'ascii') {
              return (
                <pre key={i} className={classes} style={{ position: 'relative' }}>
                  <span className={s.asciiLogo}>{line.text}</span>
                  {isVisible && asciiShown && (
                    <span className={s.asciiLogoGlow} />
                  )}
                </pre>
              );
            }

            if (line.type === 'tagline') {
              const words = line.text.split(' ');
              return (
                <div key={i} className={classes}>
                  <span className={s.taglineLine}>
                    {isVisible ? words.map((word, wi) => (
                      <span
                        key={wi}
                        className={s.taglineWord}
                        style={{ animationDelay: `${wi * 100}ms` }}
                      >
                        {word}{wi < words.length - 1 ? ' ' : ''}
                      </span>
                    )) : ''}
                    {isVisible && i === visibleCount - 1 && (
                      <span className={s.cursor} />
                    )}
                  </span>
                </div>
              );
            }

            if (line.type === 'separator') {
              return (
                <div key={i} className={classes}>
                  <span className={s.separator}>{line.text}</span>
                </div>
              );
            }

            if (line.type === 'blank') {
              return <div key={i} className={classes}>&nbsp;</div>;
            }

            // system lines
            return (
              <div key={i} className={classes}>
                <span className={s.dim}>{line.text}</span>
                {isVisible && i === visibleCount - 1 && i === totalLines - 1 && (
                  <span className={s.cursor} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   VIM SECTION — MANIFESTO
   ═══════════════════════════════════════════════ */

function renderManifestoLine(line: ManifestoLine) {
  const { text, type } = line;

  if (type === 'blank') {
    return <span>&nbsp;</span>;
  }

  if (type === 'heading') {
    const hashEnd = text.indexOf(' ');
    return (
      <>
        <span className={s.vimComment}>{text.slice(0, hashEnd)}</span>
        <span className={s.vimHeading}>{text.slice(hashEnd)}</span>
      </>
    );
  }

  if (type === 'subheading') {
    return <span className={s.vimHeading}>{text}</span>;
  }

  if (type === 'principle-num') {
    const match = text.match(/^(#\s+)(\d+\.)(.*)$/);
    if (match) {
      return (
        <>
          <span className={s.vimComment}>{match[1]}</span>
          <span className={s.vimNumber}>{match[2]}</span>
          <span className={s.vimEmphasis}>{match[3]}</span>
        </>
      );
    }
    return <span className={s.vimComment}>{text}</span>;
  }

  if (type === 'principle-body') {
    const hashEnd = text.indexOf(' ');
    return (
      <>
        <span className={s.vimComment}>{text.slice(0, hashEnd)}</span>
        <span className={s.vimEmphasis}>{text.slice(hashEnd)}</span>
      </>
    );
  }

  if (type === 'author') {
    const hashEnd = text.indexOf(' ');
    return (
      <>
        <span className={s.vimComment}>{text.slice(0, hashEnd)}</span>
        <span className={s.vimAuthor}>{text.slice(hashEnd)}</span>
      </>
    );
  }

  return <span className={s.vimComment}>{text}</span>;
}

function VimSection() {
  const { ref, isVisible } = useInView();
  const [visibleLines, setVisibleLines] = useState(0);
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [statusVisible, setStatusVisible] = useState(false);
  const [commandVisible, setCommandVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    // Brief file-loading flicker
    setEditorLoaded(true);

    let count = 0;
    const total = MANIFESTO_LINES.length;
    const id = setInterval(() => {
      count++;
      setVisibleLines(count);
      if (count >= total) {
        clearInterval(id);
        // Status bar slides up after all lines loaded
        setTimeout(() => setStatusVisible(true), 200);
        // Command line fades in after status bar
        setTimeout(() => setCommandVisible(true), 500);
      }
    }, 40);

    return () => clearInterval(id);
  }, [isVisible]);

  const tildeCount = 6;
  const totalLineCount = MANIFESTO_LINES.length;

  return (
    <section className={s.vimSection} ref={ref} id="vim">
      <div className={`${s.vimEditor} ${editorLoaded ? s.vimLoading : ''}`}>
        <div className={s.vimTitleBar}>
          manifesto.md [+] - VIM
        </div>

        <div className={s.vimContent}>
          {MANIFESTO_LINES.map((line, i) => (
            <div
              key={i}
              className={`${s.vimLine} ${i < visibleLines ? s.vimLineVisible : ''}`}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <span
                className={s.vimLineNumber}
                style={{ animationDelay: `${i * 40 - 20}ms` }}
              >
                {i + 1}
              </span>
              <span className={s.vimLineContent}>
                {renderManifestoLine(line)}
              </span>
            </div>
          ))}

          {Array.from({ length: tildeCount }).map((_, i) => (
            <div key={`tilde-${i}`} className={s.vimTilde}>
              <span
                className={s.vimTildeChar}
                style={{ animationDelay: `${i * 500}ms` }}
              >
                ~
              </span>
              <span />
            </div>
          ))}
        </div>

        <div className={`${s.vimStatusBar} ${statusVisible ? s.vimStatusVisible : ''}`}>
          <span className={s.vimMode}>-- NORMAL --</span>
          <div className={s.vimFileInfo}>
            <span>manifesto.md [+]</span>
            <span>utf-8</span>
            <span>unix</span>
            <span>{totalLineCount}L, 842B</span>
            <span className={s.vimPosition}>12,1{'  '}All</span>
          </div>
        </div>

        <div className={`${s.vimCommandLine} ${commandVisible ? s.vimCommandVisible : ''}`}>
          :<span className={s.cursor} />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SERVICES SECTION (CLI --help)
   ═══════════════════════════════════════════════ */

function ServicesSection() {
  const { ref, isVisible } = useInView();

  const command = '$ beirux --help';
  const { displayed: cmdDisplayed, done: cmdDone } = useTypewriter(command, 50, isVisible);

  // Cascade the help output lines after command finishes
  const [visibleOutputLines, setVisibleOutputLines] = useState(0);
  // Total output lines: header(4) + commands title(1) + SERVICES(5) + footer options(8)
  const totalOutputLines = 4 + 1 + SERVICES.length + 8;

  useEffect(() => {
    if (!cmdDone) return;

    let count = 0;
    const id = setInterval(() => {
      count++;
      setVisibleOutputLines(count);
      if (count >= totalOutputLines) clearInterval(id);
    }, 80);

    return () => clearInterval(id);
  }, [cmdDone, totalOutputLines]);

  const lineClass = (idx: number) =>
    `${s.helpOutputLine} ${idx < visibleOutputLines ? s.helpLineVisible : ''}`;

  return (
    <section className={s.servicesSection} ref={ref} id="services">
      <div className={`${s.helpBlock} ${isVisible ? s.visible : ''}`}>
        {/* Typewriter command */}
        <div className={s.dim}>
          {cmdDisplayed}
          {!cmdDone && <span className={s.cursor} />}
        </div>

        {cmdDone && (
          <>
            <div className={s.helpHeader}>
              <div
                className={lineClass(0)}
                style={{ animationDelay: '0ms' }}
              >
                &nbsp;
              </div>
              <div
                className={lineClass(1)}
                style={{ animationDelay: '80ms' }}
              >
                <span className={s.helpUsage}>
                  Usage: beirux {'<command>'} [options]
                </span>
              </div>
              <div
                className={lineClass(2)}
                style={{ animationDelay: '160ms' }}
              >
                <span className={s.helpDesc}>
                  Full-service digital agency. We build, ship, and scale products with
                  AI-powered systems and zero templates.
                </span>
              </div>
            </div>

            <div
              className={lineClass(3)}
              style={{ animationDelay: '240ms' }}
            >
              <span className={s.helpCommandsTitle}>Available Commands:</span>
            </div>

            {SERVICES.map((svc, i) => {
              const lineIdx = 4 + i;
              return (
                <div
                  key={svc.flag}
                  className={`${s.helpCommand} ${lineClass(lineIdx)}`}
                  style={{ animationDelay: `${lineIdx * 80}ms` }}
                >
                  <span className={`${s.helpFlag} ${lineIdx < visibleOutputLines ? s.helpFlagFlash : ''}`}>
                    {svc.flag}, {svc.alias}
                  </span>
                  <span className={s.helpFlagDesc}>{svc.desc}</span>
                  <span className={s.helpStat}>[{svc.stat}]</span>
                </div>
              );
            })}

            <div className={s.helpFooter}>
              {[
                <div key="f0">&nbsp;</div>,
                <div key="f1" className={s.dim}>Options:</div>,
                <div key="f2">
                  <span className={s.cyan}>  --verbose</span>
                  <span className={s.white}>        Show the work. Always.</span>
                </div>,
                <div key="f3">
                  <span className={s.cyan}>  --no-templates</span>
                  <span className={s.white}>   Everything custom. Every time.</span>
                </div>,
                <div key="f4">
                  <span className={s.cyan}>  --ship-fast</span>
                  <span className={s.white}>       Average delivery: 4 weeks.</span>
                </div>,
                <div key="f5">&nbsp;</div>,
                <div key="f6" className={s.dim}>
                  Run `beirux {'<command>'} --help` for more information on a specific command.
                </div>,
              ].map((el, fi) => {
                const lineIdx = 4 + SERVICES.length + fi;
                return (
                  <div
                    key={`footer-${fi}`}
                    className={lineClass(lineIdx)}
                    style={{ animationDelay: `${lineIdx * 80}ms` }}
                  >
                    {el}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   TRACEROUTE SECTION — PROCESS
   ═══════════════════════════════════════════════ */

function TracerouteSection() {
  const { ref, isVisible } = useInView();
  // Track hop states: 'hidden' | 'resolving' | 'resolved'
  const [hopStates, setHopStates] = useState<('hidden' | 'resolving' | 'resolved')[]>(
    TRACEROUTE_HOPS.map(() => 'hidden')
  );
  const [showSummary, setShowSummary] = useState(false);
  const summaryText = '8 hops traversed. Average project delivery: 4 weeks. Packet loss: 0%.';
  const { displayed: summaryDisplayed, done: summaryDone } = useTypewriter(summaryText, 20, showSummary);

  useEffect(() => {
    if (!isVisible) return;

    const total = TRACEROUTE_HOPS.length;
    let hopIdx = 0;

    const advanceHop = () => {
      if (hopIdx >= total) {
        setTimeout(() => setShowSummary(true), 400);
        return;
      }

      // Phase 1: resolving (show * * *)
      setHopStates(prev => {
        const next = [...prev];
        next[hopIdx] = 'resolving';
        return next;
      });

      const currentIdx = hopIdx;
      // Phase 2: resolved after 300ms
      setTimeout(() => {
        setHopStates(prev => {
          const next = [...prev];
          next[currentIdx] = 'resolved';
          return next;
        });
      }, 300);

      hopIdx++;
      setTimeout(advanceHop, 350);
    };

    advanceHop();
  }, [isVisible]);

  return (
    <section className={s.tracerouteSection} ref={ref} id="traceroute">
      <div className={`${s.tracerouteBlock} ${isVisible ? s.visible : ''}`}>
        <div className={s.tracerouteHeader}>
          <div className={s.tracerouteCmd}>$ traceroute project.beirux.com</div>
          <div className={s.tracerouteInfo}>
            traceroute to project.beirux.com (149.28.44.12), 8 hops max, 60 byte packets
          </div>
        </div>

        {TRACEROUTE_HOPS.map((hop, i) => {
          const state = hopStates[i];
          const hopClass = [
            s.tracerouteHop,
            state === 'resolving' ? s.tracerouteHopResolving : '',
            state === 'resolved' ? s.tracerouteHopResolved : '',
          ].filter(Boolean).join(' ');

          return (
            <div key={hop.num} className={hopClass}>
              <div className={s.tracerouteHopMain}>
                <span className={s.tracerouteHopNum}>{String(hop.num).padStart(2, ' ')}</span>
                {state === 'resolving' ? (
                  <span className={s.tracerouteStars}>* * *</span>
                ) : state === 'resolved' ? (
                  <>
                    <span className={s.tracerouteHostname}>{hop.host}</span>
                    {'  '}
                    <span className={s.tracerouteIp}>({hop.ip})</span>
                    {'    '}
                    <span className={s.tracerouteLatency}>
                      {hop.times.map((t) => `${t} ms`).join('   ')}
                    </span>
                  </>
                ) : null}
              </div>
              {state === 'resolved' && (
                <div className={s.tracerouteDesc}>{hop.desc}</div>
              )}
            </div>
          );
        })}

        <div className={`${s.tracerouteSummary} ${showSummary ? s.tracerouteSummaryVisible : ''}`}>
          {summaryDisplayed}
          {showSummary && !summaryDone && <span className={s.cursor} />}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   CLIENTS SECTION (SQL Table)
   ═══════════════════════════════════════════════ */

function ClientsSection() {
  const { ref, isVisible } = useInView();

  // Typewriter for SQL query
  const sqlText = "SELECT * FROM clients WHERE status = 'active' ORDER BY since ASC;";
  const { displayed: sqlDisplayed, done: sqlDone } = useTypewriter(sqlText, 30, isVisible);

  // Table construction phases
  const [phase, setPhase] = useState(0);
  // 0: nothing, 1: top border, 2: header, 3: separator, 4-8: rows, 9: bottom border, 10: row count

  useEffect(() => {
    if (!sqlDone) return;

    let current = 0;
    const maxPhase = 4 + CLIENTS.length + 2; // border + header + sep + N rows + bottom border + count
    const id = setInterval(() => {
      current++;
      setPhase(current);
      if (current >= maxPhase) clearInterval(id);
    }, 150);

    return () => clearInterval(id);
  }, [sqlDone]);

  // Column widths
  const colId = 4;
  const colName = 24;
  const colType = 16;
  const colStatus = 10;
  const colSince = 12;

  const hr = `+${'-'.repeat(colId + 2)}+${'-'.repeat(colName + 2)}+${'-'.repeat(colType + 2)}+${'-'.repeat(colStatus + 2)}+${'-'.repeat(colSince + 2)}+`;
  const header = `| ${pad('ID', colId)} | ${pad('CLIENT', colName)} | ${pad('TYPE', colType)} | ${pad('STATUS', colStatus)} | ${pad('SINCE', colSince)} |`;

  // Parse SQL keywords for flash effect during typewriting
  const renderSqlTyped = () => {
    const keywords = ['SELECT', 'FROM', 'WHERE', 'ORDER BY', 'ASC'];
    const parts: { text: string; isKeyword: boolean }[] = [];
    let remaining = sqlDisplayed;
    let pos = 0;

    while (pos < remaining.length) {
      let matched = false;
      for (const kw of keywords) {
        if (remaining.slice(pos).startsWith(kw)) {
          if (pos > 0) {
            parts.push({ text: remaining.slice(0, pos), isKeyword: false });
            remaining = remaining.slice(pos);
            pos = 0;
          }
          parts.push({ text: kw, isKeyword: true });
          remaining = remaining.slice(kw.length);
          pos = 0;
          matched = true;
          break;
        }
      }
      if (!matched) pos++;
    }
    if (remaining.length > 0) {
      parts.push({ text: remaining, isKeyword: false });
    }

    return parts.map((part, pi) => (
      part.isKeyword ? (
        <span key={pi} className={`${s.sqlKeyword} ${s.phosphorFlashCyan}`}>{part.text}</span>
      ) : (
        <span key={pi}>{part.text}</span>
      )
    ));
  };

  return (
    <section className={s.clientsSection} ref={ref} id="clients">
      <div className={`${s.sqlBlock} ${isVisible ? s.visible : ''}`}>
        <div className={s.sqlQuery}>
          <span className={s.dim}>beirux=# </span>
          {renderSqlTyped()}
          {!sqlDone && <span className={s.cursor} />}
        </div>

        {sqlDone && (
          <>
            <pre className={s.sqlTable}>
              {phase >= 1 && (
                <span className={s.sqlBorderAnimated}>{hr}{'\n'}</span>
              )}
              {phase >= 2 && (
                <span className={`${s.sqlHeader} ${s.sqlHeaderFlash}`}>{header}{'\n'}</span>
              )}
              {phase >= 3 && (
                <span className={s.sqlBorderAnimated}>{hr}{'\n'}</span>
              )}
              {CLIENTS.map((client, i) => {
                const rowPhase = 4 + i;
                if (phase < rowPhase) return null;
                return (
                  <span key={i} className={s.sqlRowAnimated}>
                    <span className={s.sqlRow}>
                      {'| '}{pad(String(i + 1), colId)}{' | '}{pad(client.name, colName)}{' | '}{pad(client.type, colType)}{' | '}
                    </span>
                    <span className={s.sqlActive}>{pad(client.status, colStatus)}</span>
                    <span className={s.sqlRow}>
                      {' | '}{pad(client.since, colSince)}{' |'}
                    </span>
                    {'\n'}
                  </span>
                );
              })}
              {phase >= 4 + CLIENTS.length && (
                <span className={s.sqlBorderAnimated}>{hr}</span>
              )}
            </pre>

            {phase >= 4 + CLIENTS.length + 1 && (
              <>
                <div className={s.sqlRowCount}>
                  ({CLIENTS.length} rows)
                </div>
                <div>&nbsp;</div>
                <div className={s.dim}>
                  Time: 0.042ms
                </div>
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   CRONTAB SECTION — AUTOMATION
   ═══════════════════════════════════════════════ */

function CrontabSection() {
  const { ref, isVisible } = useInView();
  const [visibleLines, setVisibleLines] = useState(0);
  const [summaryReady, setSummaryReady] = useState(false);
  const [summaryText, setSummaryText] = useState('');
  const finalSummary = '12 scheduled jobs | 4 agents active | 0 failures (last 30d) | next run: 14:30:00 EST';

  useEffect(() => {
    if (!isVisible) return;

    let count = 0;
    const total = CRONTAB_LINES.length;
    const id = setInterval(() => {
      count++;
      setVisibleLines(count);
      if (count >= total) {
        clearInterval(id);
        setTimeout(() => setSummaryReady(true), 200);
      }
    }, 50);

    return () => clearInterval(id);
  }, [isVisible]);

  // Summary count-up effect
  useEffect(() => {
    if (!summaryReady) return;

    // Rapidly cycle through numbers before settling
    let frame = 0;
    const totalFrames = 20;
    const id = setInterval(() => {
      frame++;
      if (frame >= totalFrames) {
        clearInterval(id);
        setSummaryText(finalSummary);
        return;
      }
      const jobs = Math.round((frame / totalFrames) * 12);
      const agents = Math.round((frame / totalFrames) * 4);
      const failures = 0;
      setSummaryText(`${jobs} scheduled jobs | ${agents} agents active | ${failures} failures (last 30d) | next run: 14:30:00 EST`);
    }, 40);

    return () => clearInterval(id);
  }, [summaryReady, finalSummary]);

  return (
    <section className={s.crontabSection} ref={ref} id="crontab">
      <div className={`${s.crontabBlock} ${isVisible ? s.visible : ''}`}>
        <div className={s.crontabCmd}>
          <span className={s.dim}>$</span> crontab -l
        </div>

        <div className={s.crontabContent}>
          {CRONTAB_LINES.map((entry, i) => {
            const wrapperClass = `${s.crontabLineWrapper} ${i < visibleLines ? s.crontabLineVisible : ''}`;

            if (entry.type === 'blank') {
              return (
                <div key={i} className={wrapperClass}>
                  &nbsp;
                </div>
              );
            }

            if (entry.type === 'comment') {
              return (
                <div key={i} className={wrapperClass}>
                  <span className={s.crontabComment}>{entry.text}</span>
                </div>
              );
            }

            if (entry.type === 'commentBold') {
              return (
                <div key={i} className={wrapperClass}>
                  <span className={s.crontabCommentBold}>{entry.text}</span>
                </div>
              );
            }

            if (entry.type === 'sectionHeader') {
              return (
                <div key={i} className={wrapperClass}>
                  <span className={s.crontabComment}>{entry.text}</span>
                </div>
              );
            }

            // job line
            return (
              <div
                key={i}
                className={`${wrapperClass} ${entry.running ? s.crontabLineRunning : ''}`}
              >
                <div className={s.crontabLine}>
                  <span className={s.crontabSchedule}>{entry.schedule}</span>
                  <span className={s.crontabPath}>{entry.path}</span>
                  <span className={s.crontabFlags}>{entry.flags}</span>
                  {entry.running && (
                    <>
                      <span className={s.crontabRunningDot}>{'  '}&bull;</span>
                      <span className={s.crontabRunningText}> RUNNING</span>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {summaryReady && (
          <div className={s.crontabSummary}>
            {summaryText}
          </div>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PROOF SECTION (System Dashboard)
   ═══════════════════════════════════════════════ */

function ProofSection() {
  const { ref, isVisible } = useInView();
  const [drawPhase, setDrawPhase] = useState(0); // 0: hidden, 1: top, 2: middle, 3: bottom
  const [barsFilled, setBarsFilled] = useState(false);

  // Box-drawing entrance
  useEffect(() => {
    if (!isVisible) return;

    const timers = [
      setTimeout(() => setDrawPhase(1), 100),
      setTimeout(() => setDrawPhase(2), 600),
      setTimeout(() => setDrawPhase(3), 1000),
      setTimeout(() => setBarsFilled(true), 2700), // After bars finish filling (~1.5s after they start at ~1.2s)
    ];

    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  // Count-up for numeric stat values
  const projectsShipped = useCountUp(12, 1000, isVisible);
  const activeClients = useCountUp(5, 1000, isVisible);
  const aiAgents = useCountUp(4, 1000, isVisible);
  const clientRetention = useCountUp(92, 1000, isVisible);
  const templatesUsed = useCountUp(0, 1000, isVisible);
  const customBuilt = useCountUp(100, 1000, isVisible);
  const uptimeCount = useCountUp(1247, 1500, isVisible);

  const getAnimatedValue = (stat: typeof DASH_STATS[0]) => {
    if (!isVisible) return stat.value;
    switch (stat.label) {
      case 'Projects Shipped': return String(projectsShipped);
      case 'Active Clients': return String(activeClients);
      case 'AI Agents Running': return String(aiAgents);
      case 'Client Retention': return `${clientRetention}%`;
      case 'Templates Used': return String(templatesUsed);
      case 'Custom Built': return `${customBuilt}%`;
      // Non-numeric: just flash in
      case 'Avg Delivery': return stat.value;
      case 'Response Time': return stat.value;
      default: return stat.value;
    }
  };

  const getValueClass = (color: string) => {
    switch (color) {
      case 'pink': return s.dashValuePink;
      case 'cyan': return s.dashValueCyan;
      default: return s.dashValue;
    }
  };

  const getFillClass = (color: string) => {
    switch (color) {
      case 'pink': return s.dashBarFillPink;
      case 'cyan': return s.dashBarFillCyan;
      default: return s.dashBarFill;
    }
  };

  return (
    <section className={s.proofSection} ref={ref} id="proof">
      <div className={`${s.dashBlock} ${isVisible ? s.visible : ''}`}>
        <div className={s.dashHeader}>
          <div className={`${s.dashHeaderTop} ${drawPhase >= 1 ? s.dashDrawTop : ''}`}>
            {'┌─ BEIRUX System Monitor ────────────────────────┐'}
          </div>
          <div className={`${s.dashHeaderMiddle} ${drawPhase >= 2 ? s.dashDrawMiddle : ''}`}>
            {'│'} hostname: beirux.com {'|'} pid: 4201 {'|'} load: 0.42 0.38 0.35 {'│'}
          </div>
          <div className={`${s.dashHeaderBottom} ${drawPhase >= 3 ? s.dashDrawBottom : ''}`}>
            {'└────────────────────────────────────────────────┘'}
          </div>
        </div>

        <div className={s.dashGrid}>
          {DASH_STATS.map((stat) => (
            <div key={stat.label} className={s.dashRow}>
              <span className={s.dashLabel}>{stat.label}</span>
              <span className={getValueClass(stat.color)}>{getAnimatedValue(stat)}</span>
            </div>
          ))}
        </div>

        <div className={s.dashBarsTitle}>Resource Utilization</div>

        {DASH_BARS.map((bar) => (
          <div key={bar.label} className={s.dashBar}>
            <span className={s.dashBarLabel}>{bar.label}</span>
            <div className={s.dashBarTrack}>
              <div
                className={`${getFillClass(bar.color)} ${barsFilled ? s.dashBarFilled : ''}`}
                style={{ width: isVisible ? `${bar.percent}%` : '0%' }}
              />
            </div>
            <span className={s.dashBarPercent}>{bar.percent}%</span>
          </div>
        ))}

        <div className={s.dashUptime}>
          <span className={s.dashUptimeLabel}>System Uptime</span>
          <span className={s.dashUptimeValue}>
            {isVisible ? uptimeCount.toLocaleString() : '0'} days
          </span>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   TAIL LOG SECTION — TESTIMONIALS
   ═══════════════════════════════════════════════ */

function TailLogSection() {
  const { ref, isVisible } = useInView();

  // Typewriter for the tail command
  const tailCmd = '$ tail -f /var/log/client-feedback.log';
  const { displayed: cmdDisplayed, done: cmdDone } = useTypewriter(tailCmd, 40, isVisible);

  // Stream log entries after a pause
  const [visibleLogs, setVisibleLogs] = useState(0);
  const [streamStarted, setStreamStarted] = useState(false);

  useEffect(() => {
    if (!cmdDone) return;

    // 0.8s pause simulating tail starting
    const pauseTimer = setTimeout(() => {
      setStreamStarted(true);
    }, 800);

    return () => clearTimeout(pauseTimer);
  }, [cmdDone]);

  useEffect(() => {
    if (!streamStarted) return;

    let count = 0;
    const total = TAIL_LOGS.length;
    const id = setInterval(() => {
      count++;
      setVisibleLogs(count);
      if (count >= total) clearInterval(id);
    }, 600);

    return () => clearInterval(id);
  }, [streamStarted]);

  return (
    <section className={s.tailSection} ref={ref} id="tail">
      <div className={`${s.tailBlock} ${isVisible ? s.visible : ''}`}>
        <div className={s.tailCmd}>
          {cmdDisplayed}
          {!cmdDone && <span className={s.cursor} />}
        </div>

        <div className={s.tailLog}>
          {TAIL_LOGS.map((log, i) => {
            if (i >= visibleLogs) return null;

            const isWarn = log.level === 'WARN';
            const lineClass = [
              s.tailLine,
              s.tailLineVisible,
              isWarn ? s.tailLineWarn : '',
            ].filter(Boolean).join(' ');

            return (
              <div key={i} className={lineClass}>
                <span className={s.tailTimestamp}>[{log.time}]</span>
                <span className={isWarn ? s.tailWarn : s.tailInfo}>
                  [{log.level}]
                </span>
                <span className={s.tailClient}>[{log.client}]</span>
                <span className={s.tailMsg}>{log.msg}</span>
              </div>
            );
          })}

          {visibleLogs >= TAIL_LOGS.length && (
            <div className={s.tailCursor}>
              <span className={s.cursor} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   CTA SECTION (Command Prompt)
   ═══════════════════════════════════════════════ */

function CtaSection() {
  const { ref, isVisible } = useInView();

  const command = '$ beirux init --project "yours"';
  const { displayed, done } = useTypewriter(command, 60, isVisible);

  // Screen flash when command "executes"
  const [showFlash, setShowFlash] = useState(false);
  // Stagger the [OK] lines
  const [okLines, setOkLines] = useState(0);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (!done) return;

    // Flash the screen
    setShowFlash(true);
    const flashTimer = setTimeout(() => setShowFlash(false), 150);

    // Stagger [OK] lines
    let count = 0;
    const okTimer = setInterval(() => {
      count++;
      setOkLines(count);
      if (count >= 4) {
        clearInterval(okTimer);
        setTimeout(() => setShowPrompt(true), 400);
      }
    }, 200);

    return () => {
      clearTimeout(flashTimer);
      clearInterval(okTimer);
    };
  }, [done]);

  const okData = [
    'Initializing project workspace...',
    'Assigning dedicated team...',
    'Deploying AI agents...',
    'Ready to ship.',
  ];

  return (
    <section className={s.ctaSection} ref={ref} id="cta">
      {showFlash && <div className={s.ctaScreenFlash} />}

      <div className={`${s.ctaBlock} ${isVisible ? s.visible : ''}`}>
        <div className={s.ctaBox}>
          <span className={s.ctaBoxTitle}>{'[ NEW PROJECT ]'}</span>

          <div className={s.ctaCommand}>
            {displayed}
            {!done && <span className={s.cursor} />}
          </div>

          {done && (
            <>
              <div className={s.ctaOutput}>
                {okData.map((text, i) => {
                  if (i >= okLines) return null;
                  return (
                    <span
                      key={i}
                      className={s.ctaOutputLine}
                      style={{ animationDelay: `${i * 50}ms` }}
                    >
                      <span className={s.ctaCheck}>{'[OK]'}</span>
                      <span className={s.white}>{text}</span>
                    </span>
                  );
                })}
              </div>

              {showPrompt && (
                <>
                  <div className={s.ctaPrompt}>
                    <span className={s.dim}>Press ENTER to start</span>
                    <span className={s.cursorPinkGlow} />
                  </div>

                  <a
                    href="mailto:samih@beirux.com?subject=New%20Project%20Inquiry"
                    className={s.ctaEnter}
                  >
                    START PROJECT
                  </a>

                  <div className={s.ctaEmail}>
                    or reach us directly at{' '}
                    <a href="mailto:samih@beirux.com">samih@beirux.com</a>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════ */

function FooterSection() {
  const { ref, isVisible } = useInView();
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const timers = [
      setTimeout(() => setPhase(1), 100),   // EOF line draws
      setTimeout(() => setPhase(2), 900),   // "Connection closed" flickers in
      setTimeout(() => setPhase(3), 1400),  // "logout" appears
      setTimeout(() => setPhase(4), 1900),  // "[Process completed]" fades in dim
    ];

    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  return (
    <footer className={`${s.footer} ${phase >= 3 ? s.footerDimmed : ''}`} ref={ref}>
      <div className={`${s.footerEof} ${phase >= 1 ? s.footerEofVisible : ''}`}>
        --- EOF ----------------------------------------------------------
      </div>
      <div className={`${s.footerDisconnect} ${phase >= 2 ? s.footerDisconnectVisible : ''}`}>
        Connection to beirux.com closed.
      </div>
      <div className={`${s.footerLogout} ${phase >= 3 ? s.footerLogoutVisible : ''}`}>
        logout
      </div>
      <div className={`${s.footerHint} ${phase >= 4 ? s.footerHintVisible : ''}`}>
        [Process completed - press &uarr; to reconnect]
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════ */

export default function V4Page() {
  return (
    <div className={s.page}>
      {/* CRT power-on flash */}
      <div className={s.crtPowerOn} />
      {/* Global CRT scan line */}
      <div className={s.crtScanLine} />
      {/* Background gradient blobs */}
      <div className={s.blob1} />
      <div className={s.blob2} />
      <div className={s.blob3} />

      <HeroSection />
      <VimSection />
      <ServicesSection />
      <TracerouteSection />
      <ClientsSection />
      <CrontabSection />
      <ProofSection />
      <TailLogSection />
      <CtaSection />
      <FooterSection />
    </div>
  );
}
