'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
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
  { label: 'Projects Shipped', value: '12', color: 'green' },
  { label: 'Active Clients', value: '5', color: 'green' },
  { label: 'AI Agents Running', value: '4', color: 'cyan' },
  { label: 'Avg Delivery', value: '4 wks', color: 'amber' },
  { label: 'Client Retention', value: '92%', color: 'green' },
  { label: 'Templates Used', value: '0', color: 'green' },
  { label: 'Response Time', value: '<2h', color: 'cyan' },
  { label: 'Custom Built', value: '100%', color: 'amber' },
];

const DASH_BARS = [
  { label: 'Client Satisfaction', percent: 92, color: 'green' },
  { label: 'On-Time Delivery', percent: 96, color: 'green' },
  { label: 'Code Quality Score', percent: 88, color: 'cyan' },
  { label: 'System Uptime', percent: 99, color: 'green' },
  { label: 'Agent Autonomy', percent: 74, color: 'amber' },
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

/* ─── Tmux tab config ─── */

const TMUX_TABS = [
  { name: 'main', sectionId: 'hero' },
  { name: 'manifesto', sectionId: 'vim' },
  { name: 'services', sectionId: 'services' },
  { name: 'process', sectionId: 'traceroute' },
  { name: 'clients', sectionId: 'clients' },
  { name: 'crontab', sectionId: 'crontab' },
  { name: 'proof', sectionId: 'proof' },
  { name: 'reviews', sectionId: 'tail' },
  { name: 'contact', sectionId: 'cta' },
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

/* ═══════════════════════════════════════════════
   TMUX TOP BAR
   ═══════════════════════════════════════════════ */

function TmuxTopBar({ activeSection }: { activeSection: string }) {
  const [clock, setClock] = useState('');

  useEffect(() => {
    function tick() {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const sec = String(now.getSeconds()).padStart(2, '0');
      setClock(`${h}:${m}:${sec}`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const handleTabClick = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className={s.tmuxTop}>
      <div className={s.tmuxLeft}>
        <span className={s.tmuxSession}>[0]</span>
        {TMUX_TABS.map((tab) => (
          <span
            key={tab.sectionId}
            className={activeSection === tab.sectionId ? s.tmuxTabActive : s.tmuxTab}
            onClick={() => handleTabClick(tab.sectionId)}
          >
            {tab.name}
          </span>
        ))}
      </div>
      <div className={s.tmuxRight}>
        <span className={s.tmuxConnected}>● connected</span>
        <span className={s.tmuxClock}>{clock}</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   TMUX BOTTOM BAR
   ═══════════════════════════════════════════════ */

function TmuxBottomBar() {
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    function tick() {
      const now = new Date();
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const month = months[now.getMonth()];
      const day = String(now.getDate()).padStart(2, '0');
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      setDateStr(`${month} ${day} ${h}:${m}`);
    }
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={s.tmuxBottom}>
      <span className={s.tmuxBottomLeft}>[beirux] 0:zsh*</span>
      <span className={s.tmuxBottomCenter}>root@beirux.com</span>
      <div className={s.tmuxBottomRight}>
        <span>{dateStr}</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════════════ */

function HeroSection() {
  const { wrapperRef, progress } = useStickyScroll();

  // Map progress to number of visible boot lines
  const totalLines = BOOT_SEQUENCE.length;
  const visibleCount = Math.floor(progress * totalLines * 1.4); // 1.4 to finish before end of scroll

  return (
    <div className={s.heroWrapper} ref={wrapperRef} id="hero">
      <div className={s.heroSticky}>
        <div className={s.terminal}>
          {BOOT_SEQUENCE.map((line, i) => {
            const isVisible = i < visibleCount;
            const classes = `${s.bootLine} ${isVisible ? s.visible : ''}`;

            if (line.type === 'ascii') {
              return (
                <pre key={i} className={classes}>
                  <span className={s.asciiLogo}>{line.text}</span>
                </pre>
              );
            }

            if (line.type === 'tagline') {
              return (
                <div key={i} className={classes}>
                  <span className={s.taglineLine}>
                    {isVisible ? line.text : ''}
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
    // Render the # in dim, the rest in bright green bold
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
    // e.g. "#   1. Ship > Slide decks"
    // Render # in dim, number in amber, rest in cyan
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
    // # in dim, body text in cyan (emphasis)
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

  // Default: plain comment
  return <span className={s.vimComment}>{text}</span>;
}

function VimSection() {
  const { ref, isVisible } = useInView();
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let count = 0;
    const total = MANIFESTO_LINES.length;
    const id = setInterval(() => {
      count++;
      setVisibleLines(count);
      if (count >= total) clearInterval(id);
    }, 30);

    return () => clearInterval(id);
  }, [isVisible]);

  const tildeCount = 6;
  const totalLineCount = MANIFESTO_LINES.length;

  return (
    <section className={s.vimSection} ref={ref} id="vim">
      <div className={s.vimEditor}>
        <div className={s.vimTitleBar}>
          manifesto.md [+] - VIM
        </div>

        <div className={s.vimContent}>
          {MANIFESTO_LINES.map((line, i) => (
            <div
              key={i}
              className={`${s.vimLine} ${i < visibleLines ? s.vimLineVisible : ''}`}
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              <span className={s.vimLineNumber}>{i + 1}</span>
              <span className={s.vimLineContent}>
                {renderManifestoLine(line)}
              </span>
            </div>
          ))}

          {Array.from({ length: tildeCount }).map((_, i) => (
            <div key={`tilde-${i}`} className={s.vimTilde}>
              <span className={s.vimTildeChar}>~</span>
              <span />
            </div>
          ))}
        </div>

        <div className={s.vimStatusBar}>
          <span className={s.vimMode}>-- NORMAL --</span>
          <div className={s.vimFileInfo}>
            <span>manifesto.md [+]</span>
            <span>utf-8</span>
            <span>unix</span>
            <span>{totalLineCount}L, 842B</span>
            <span className={s.vimPosition}>12,1{'  '}All</span>
          </div>
        </div>

        <div className={s.vimCommandLine}>
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

  return (
    <section className={s.servicesSection} ref={ref} id="services">
      <div className={`${s.helpBlock} ${isVisible ? s.visible : ''}`}>
        <div className={s.helpHeader}>
          <div className={s.dim}>$ beirux --help</div>
          <div>&nbsp;</div>
          <div className={s.helpUsage}>
            Usage: beirux {'<command>'} [options]
          </div>
          <div className={s.helpDesc}>
            Full-service digital agency. We build, ship, and scale products with
            AI-powered systems and zero templates.
          </div>
        </div>

        <div className={s.helpCommandsTitle}>Available Commands:</div>

        {SERVICES.map((svc) => (
          <div key={svc.flag} className={s.helpCommand}>
            <span className={s.helpFlag}>
              {svc.flag}, {svc.alias}
            </span>
            <span className={s.helpFlagDesc}>{svc.desc}</span>
            <span className={s.helpStat}>[{svc.stat}]</span>
          </div>
        ))}

        <div className={s.helpFooter}>
          <div>&nbsp;</div>
          <div className={s.dim}>Options:</div>
          <div>
            <span className={s.cyan}>  --verbose</span>
            <span className={s.white}>        Show the work. Always.</span>
          </div>
          <div>
            <span className={s.cyan}>  --no-templates</span>
            <span className={s.white}>   Everything custom. Every time.</span>
          </div>
          <div>
            <span className={s.cyan}>  --ship-fast</span>
            <span className={s.white}>       Average delivery: 4 weeks.</span>
          </div>
          <div>&nbsp;</div>
          <div className={s.dim}>
            Run `beirux {'<command>'} --help` for more information on a specific command.
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   TRACEROUTE SECTION — PROCESS
   ═══════════════════════════════════════════════ */

function TracerouteSection() {
  const { ref, isVisible } = useInView();
  const [visibleHops, setVisibleHops] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    let count = 0;
    const total = TRACEROUTE_HOPS.length;
    const id = setInterval(() => {
      count++;
      setVisibleHops(count);
      if (count >= total) {
        clearInterval(id);
        setTimeout(() => setShowSummary(true), 400);
      }
    }, 250);

    return () => clearInterval(id);
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

        {TRACEROUTE_HOPS.map((hop) => (
          <div
            key={hop.num}
            className={`${s.tracerouteHop} ${hop.num <= visibleHops ? s.tracerouteHopVisible : ''}`}
          >
            <div className={s.tracerouteHopMain}>
              <span className={s.tracerouteHopNum}>{String(hop.num).padStart(2, ' ')}</span>
              <span className={s.tracerouteHostname}>{hop.host}</span>
              {'  '}
              <span className={s.tracerouteIp}>({hop.ip})</span>
              {'    '}
              <span className={s.tracerouteLatency}>
                {hop.times.map((t) => `${t} ms`).join('   ')}
              </span>
            </div>
            <div className={s.tracerouteDesc}>{hop.desc}</div>
          </div>
        ))}

        <div className={`${s.tracerouteSummary} ${showSummary ? s.tracerouteSummaryVisible : ''}`}>
          8 hops traversed. Average project delivery: 4 weeks. Packet loss: 0%.
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

  // Column widths
  const colId = 4;
  const colName = 24;
  const colType = 16;
  const colStatus = 10;
  const colSince = 12;

  const hr = `+${'-'.repeat(colId + 2)}+${'-'.repeat(colName + 2)}+${'-'.repeat(colType + 2)}+${'-'.repeat(colStatus + 2)}+${'-'.repeat(colSince + 2)}+`;
  const header = `| ${pad('ID', colId)} | ${pad('CLIENT', colName)} | ${pad('TYPE', colType)} | ${pad('STATUS', colStatus)} | ${pad('SINCE', colSince)} |`;

  return (
    <section className={s.clientsSection} ref={ref} id="clients">
      <div className={`${s.sqlBlock} ${isVisible ? s.visible : ''}`}>
        <div className={s.sqlQuery}>
          <span className={s.dim}>beirux=# </span>
          <span className={s.sqlKeyword}>SELECT</span> * <span className={s.sqlKeyword}>FROM</span> clients <span className={s.sqlKeyword}>WHERE</span> status = <span className={s.amber}>&apos;active&apos;</span> <span className={s.sqlKeyword}>ORDER BY</span> since <span className={s.sqlKeyword}>ASC</span>;
        </div>

        <pre className={s.sqlTable}>
          <span className={s.sqlBorder}>{hr}{'\n'}</span>
          <span className={s.sqlHeader}>{header}{'\n'}</span>
          <span className={s.sqlBorder}>{hr}{'\n'}</span>
          {CLIENTS.map((client, i) => (
            <span key={i}>
              <span className={s.sqlRow}>
                {'| '}{pad(String(i + 1), colId)}{' | '}{pad(client.name, colName)}{' | '}{pad(client.type, colType)}{' | '}
              </span>
              <span className={s.sqlActive}>{pad(client.status, colStatus)}</span>
              <span className={s.sqlRow}>
                {' | '}{pad(client.since, colSince)}{' |'}
              </span>
              {'\n'}
            </span>
          ))}
          <span className={s.sqlBorder}>{hr}</span>
        </pre>

        <div className={s.sqlRowCount}>
          ({CLIENTS.length} rows)
        </div>
        <div>&nbsp;</div>
        <div className={s.dim}>
          Time: 0.042ms
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   CRONTAB SECTION — AUTOMATION
   ═══════════════════════════════════════════════ */

function CrontabSection() {
  const { ref, isVisible } = useInView();

  return (
    <section className={s.crontabSection} ref={ref} id="crontab">
      <div className={`${s.crontabBlock} ${isVisible ? s.visible : ''}`}>
        <div className={s.crontabCmd}>
          <span className={s.dim}>$</span> crontab -l
        </div>

        <div className={s.crontabContent}>
          {CRONTAB_LINES.map((entry, i) => {
            if (entry.type === 'blank') {
              return <div key={i}>&nbsp;</div>;
            }

            if (entry.type === 'comment') {
              return (
                <div key={i} className={s.crontabComment}>{entry.text}</div>
              );
            }

            if (entry.type === 'commentBold') {
              return (
                <div key={i} className={s.crontabCommentBold}>{entry.text}</div>
              );
            }

            if (entry.type === 'sectionHeader') {
              return (
                <div key={i} className={s.crontabComment}>{entry.text}</div>
              );
            }

            // job line
            return (
              <div key={i} className={s.crontabLine}>
                <span className={s.crontabSchedule}>{entry.schedule}</span>
                <span className={s.crontabPath}>{entry.path}</span>
                <span className={s.crontabFlags}>{entry.flags}</span>
                {entry.running && (
                  <span className={s.crontabRunning}>{'  '}● RUNNING</span>
                )}
              </div>
            );
          })}
        </div>

        <div className={s.crontabSummary}>
          12 scheduled jobs | 4 agents active | 0 failures (last 30d) | next run: 14:30:00 EST
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PROOF SECTION (System Dashboard)
   ═══════════════════════════════════════════════ */

function ProofSection() {
  const { ref, isVisible } = useInView();

  const getValueClass = (color: string) => {
    switch (color) {
      case 'amber': return s.dashValueAmber;
      case 'cyan': return s.dashValueCyan;
      default: return s.dashValue;
    }
  };

  const getFillClass = (color: string) => {
    switch (color) {
      case 'amber': return s.dashBarFillAmber;
      case 'cyan': return s.dashBarFillCyan;
      default: return s.dashBarFill;
    }
  };

  return (
    <section className={s.proofSection} ref={ref} id="proof">
      <div className={`${s.dashBlock} ${isVisible ? s.visible : ''}`}>
        <div className={s.dashHeader}>
          <div className={s.dashTitle}>
            {'┌─ BEIRUX System Monitor ────────────────────────┐'}
          </div>
          <div className={s.dashHostname}>
            {'│'} hostname: beirux.com {'|'} pid: 4201 {'|'} load: 0.42 0.38 0.35 {'│'}
          </div>
          <div className={s.dashTitle}>
            {'└────────────────────────────────────────────────┘'}
          </div>
        </div>

        <div className={s.dashGrid}>
          {DASH_STATS.map((stat) => (
            <div key={stat.label} className={s.dashRow}>
              <span className={s.dashLabel}>{stat.label}</span>
              <span className={getValueClass(stat.color)}>{stat.value}</span>
            </div>
          ))}
        </div>

        <div className={s.dashBarsTitle}>Resource Utilization</div>

        {DASH_BARS.map((bar) => (
          <div key={bar.label} className={s.dashBar}>
            <span className={s.dashBarLabel}>{bar.label}</span>
            <div className={s.dashBarTrack}>
              <div
                className={getFillClass(bar.color)}
                style={{ width: isVisible ? `${bar.percent}%` : '0%' }}
              />
            </div>
            <span className={s.dashBarPercent}>{bar.percent}%</span>
          </div>
        ))}

        <div className={s.dashUptime}>
          <span className={s.dashUptimeLabel}>System Uptime</span>
          <span className={s.dashUptimeValue}>1,247 days</span>
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
  const [visibleLogs, setVisibleLogs] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let count = 0;
    const total = TAIL_LOGS.length;
    const id = setInterval(() => {
      count++;
      setVisibleLogs(count);
      if (count >= total) clearInterval(id);
    }, 500);

    return () => clearInterval(id);
  }, [isVisible]);

  return (
    <section className={s.tailSection} ref={ref} id="tail">
      <div className={`${s.tailBlock} ${isVisible ? s.visible : ''}`}>
        <div className={s.tailCmd}>
          <span className={s.dim}>$</span> tail -f /var/log/client-feedback.log
        </div>

        <div className={s.tailLog}>
          {TAIL_LOGS.map((log, i) => {
            if (i >= visibleLogs) return null;

            return (
              <div
                key={i}
                className={s.tailLine}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <span className={s.tailTimestamp}>[{log.time}]</span>
                <span className={log.level === 'WARN' ? s.tailWarn : s.tailInfo}>
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

  return (
    <section className={s.ctaSection} ref={ref} id="cta">
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
                <span className={s.ctaOutputLine}>
                  <span className={s.ctaCheck}>{'[OK]'}</span>
                  <span className={s.white}>Initializing project workspace...</span>
                </span>
                <span className={s.ctaOutputLine}>
                  <span className={s.ctaCheck}>{'[OK]'}</span>
                  <span className={s.white}>Assigning dedicated team...</span>
                </span>
                <span className={s.ctaOutputLine}>
                  <span className={s.ctaCheck}>{'[OK]'}</span>
                  <span className={s.white}>Deploying AI agents...</span>
                </span>
                <span className={s.ctaOutputLine}>
                  <span className={s.ctaCheck}>{'[OK]'}</span>
                  <span className={s.white}>Ready to ship.</span>
                </span>
              </div>

              <div className={s.ctaPrompt}>
                <span className={s.dim}>Press ENTER to start</span>
                <span className={s.cursorAmber} />
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
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════ */

export default function V4Page() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const sectionIds = TMUX_TABS.map((t) => t.sectionId);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.2, rootMargin: '-10% 0px -10% 0px' }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className={s.page}>
      <TmuxTopBar activeSection={activeSection} />
      <HeroSection />
      <VimSection />
      <ServicesSection />
      <TracerouteSection />
      <ClientsSection />
      <CrontabSection />
      <ProofSection />
      <TailLogSection />
      <CtaSection />
      <footer className={s.footer}>
        <div className={s.footerEof}>
          --- EOF ----------------------------------------------------------
        </div>
        <div className={s.footerDisconnect}>
          Connection to beirux.com closed.
        </div>
        <div className={s.footerLogout}>logout</div>
        <div className={s.footerHint}>
          [Process completed - press &uarr; to reconnect]
        </div>
      </footer>
      <TmuxBottomBar />
    </div>
  );
}
