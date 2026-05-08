'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useInView } from '@/hooks/useInView';
import { useStickyScroll } from '@/hooks/useStickyScroll';
import s from './v2.module.scss';

/* -----------------------------------------------
   Data
   ----------------------------------------------- */
const SERVICES = [
  {
    title: 'Digital Products',
    desc: 'Full-stack web and mobile applications built to ship fast and scale. Next.js, React Native, serverless infrastructure. No templates, no page builders.',
  },
  {
    title: 'AI & Automation',
    desc: 'Custom AI agents, workflow automation, and intelligent systems that run your operations while you sleep. We build the machines that do the work.',
  },
  {
    title: 'Growth Ops',
    desc: 'SEO, analytics, paid acquisition, and conversion infrastructure. Data-driven growth with full attribution. Every dollar tracked, every channel measured.',
  },
  {
    title: 'Brand Systems',
    desc: 'Identity, design systems, and visual language that scales across every touchpoint. Not just a logo, a system that works without you.',
  },
];

const CLIENTS = [
  'Cartley LLC',
  'Steven Paul Diamonds',
  'Adonis Market',
  'Rides With Vinnie',
  'Key Vision LLC',
];

const PROOF_STATS = [
  { number: '47+', label: 'Projects shipped to production' },
  { number: '12', label: 'Active AI agents in the field' },
  { number: '3.2x', label: 'Average client revenue lift' },
  { number: '<72h', label: 'From brief to first deploy' },
];

const APPROACH_STEPS = [
  {
    title: 'Scope ruthlessly',
    desc: 'We strip the brief to what actually moves the needle. No feature bloat, no scope creep, no vanity pages.',
  },
  {
    title: 'Build in public',
    desc: 'You see every commit, every deploy, every decision. No black box, no "it\'ll be ready next week."',
  },
  {
    title: 'Ship fast, iterate faster',
    desc: 'First version live in days, not months. Then we measure, learn, and push. Speed is the strategy.',
  },
  {
    title: 'Automate the boring',
    desc: 'Anything that happens more than twice gets automated. AI agents handle ops so humans handle growth.',
  },
];

/* -----------------------------------------------
   Section wrappers with reveal
   ----------------------------------------------- */
function Reveal({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}) {
  const { ref, isVisible } = useInView();
  return (
    <Tag
      ref={ref}
      className={`${s.reveal} ${isVisible ? s.visible : ''} ${className}`}
    >
      {children}
    </Tag>
  );
}

/* -----------------------------------------------
   Hero glass parallax on mouse
   ----------------------------------------------- */
function useMouseParallax() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMouse({ x, y });
    }
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return mouse;
}

/* -----------------------------------------------
   Page
   ----------------------------------------------- */
export default function V2Page() {
  const mouse = useMouseParallax();
  const [expandedService, setExpandedService] = useState<number | null>(0);
  const { wrapperRef, progress } = useStickyScroll();

  /* Determine active approach step from scroll progress */
  const activeStep = Math.min(
    APPROACH_STEPS.length - 1,
    Math.floor(progress * APPROACH_STEPS.length)
  );

  /* Orb transforms driven by scroll */
  const orbRotation = progress * 180;
  const orbScale = 0.8 + progress * 0.4;

  /* Parallax depths for hero panels */
  const panelDepths = [0.04, -0.03, 0.025, -0.035, 0.02];

  return (
    <div className={s.page}>
      {/* ====== HERO ====== */}
      <section className={s.hero}>
        <div className={s.heroGlassField}>
          {panelDepths.map((depth, i) => (
            <div
              key={i}
              className={s.heroPanel}
              style={{
                transform: `
                  ${getBaseTransform(i)}
                  translateX(${mouse.x * depth * 100}px)
                  translateY(${mouse.y * depth * 100}px)
                `,
              }}
            />
          ))}
        </div>

        <div className={s.heroContent}>
          <Reveal>
            <div className={s.heroLabel}>Digital Agency / Miami</div>
          </Reveal>
          <Reveal>
            <h1 className={s.heroHeadline}>
              We build.
              <br />
              We ship.
              <span className={s.heroHeadlineAccent}>
                We show the work.
              </span>
            </h1>
          </Reveal>
          <Reveal>
            <p className={s.heroSubtext}>
              BEIRUX is the agency that treats your product like our own.
              Real code, real results, real fast.
            </p>
          </Reveal>
          <Reveal>
            <button className={s.heroCta}>
              Start a project
              <span className={s.ctaArrow}>&rarr;</span>
            </button>
          </Reveal>
        </div>

        <div className={s.heroScrollHint}>
          <div className={s.scrollLine} />
          scroll
        </div>
      </section>

      {/* ====== SERVICES — stacked accordion ====== */}
      <Reveal as="section" className={s.services}>
        <span className={s.sectionTag}>What we do</span>
        <div className={s.servicesStack}>
          {SERVICES.map((svc, i) => (
            <div
              key={i}
              className={`${s.serviceItem} ${expandedService === i ? s.serviceExpanded : ''}`}
              onClick={() => setExpandedService(expandedService === i ? null : i)}
            >
              <span className={s.serviceIndex}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className={s.serviceTitle}>{svc.title}</h3>
                <p className={s.serviceDesc}>{svc.desc}</p>
              </div>
              <span className={s.serviceExpandIcon}>+</span>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ====== CLIENTS — horizontal flowing strip ====== */}
      <Reveal as="section" className={s.clients}>
        <div className={s.clientsInner}>
          <h2 className={s.clientsHeadline}>
            Trusted by teams
            <br />
            <span className={s.headlineGhost}>that ship real products</span>
          </h2>
        </div>
        <div className={s.clientsStrip}>
          <div className={s.clientsTrack}>
            {/* Double the list for seamless loop */}
            {[...CLIENTS, ...CLIENTS, ...CLIENTS, ...CLIENTS].map((name, i) => (
              <span key={i} className={s.clientName}>
                {name}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ====== PROOF — single large glass panel ====== */}
      <Reveal as="section" className={s.proof}>
        <div className={s.proofPanel}>
          <div className={s.proofHeader}>
            <h2 className={s.proofTitle}>Numbers that matter</h2>
            <p className={s.proofSubtitle}>
              We track everything. These are the metrics
              we are proud to show.
            </p>
          </div>
          <div className={s.proofGrid}>
            {PROOF_STATS.map((stat, i) => (
              <div key={i} className={s.proofStat}>
                <span className={s.statNumber}>{stat.number}</span>
                <span className={s.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ====== APPROACH — sticky scroll ====== */}
      <section className={s.approach}>
        <div className={s.approachWrapper} ref={wrapperRef}>
          <div className={s.approachSticky}>
            <div className={s.approachContent}>
              <div className={s.approachLeft}>
                <span className={s.sectionTag} style={{ paddingLeft: 0 }}>
                  How we work
                </span>
                {APPROACH_STEPS.map((step, i) => (
                  <div
                    key={i}
                    className={`${s.approachStep} ${activeStep === i ? s.stepActive : ''}`}
                  >
                    <div className={s.stepNumber}>Step {String(i + 1).padStart(2, '0')}</div>
                    <h3 className={s.stepTitle}>{step.title}</h3>
                    <p className={s.stepDesc}>{step.desc}</p>
                  </div>
                ))}
              </div>

              <div className={s.approachVisual}>
                <div
                  className={`${s.approachOrb} ${s.orbLarge}`}
                  style={{
                    transform: `translate(-50%, -50%) rotate(${orbRotation}deg) scale(${orbScale})`,
                  }}
                />
                <div
                  className={`${s.approachOrb} ${s.orbMedium}`}
                  style={{
                    transform: `translate(${Math.sin(progress * Math.PI * 2) * 20}px, ${Math.cos(progress * Math.PI * 2) * 15}px) scale(${1 + progress * 0.2})`,
                  }}
                />
                <div
                  className={`${s.approachOrb} ${s.orbSmall}`}
                  style={{
                    transform: `translate(${Math.cos(progress * Math.PI * 3) * 30}px, ${Math.sin(progress * Math.PI * 2) * 25}px)`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== CTA — asymmetric split ====== */}
      <Reveal as="section" className={s.cta}>
        <div className={s.ctaSplit}>
          <div className={s.ctaTextSide}>
            <div className={s.ctaTag}>Ready to build?</div>
            <h2 className={s.ctaHeadline}>
              Your next product
              <br />
              starts here.
            </h2>
            <p className={s.ctaBody}>
              No pitches, no decks, no six-week discovery phase.
              Tell us what you need. We will tell you what it takes.
              Then we build it.
            </p>
            <button className={s.ctaButton}>
              Get in touch
              <span className={s.ctaBtnArrow}>&rarr;</span>
            </button>
          </div>

          <div className={s.ctaPanelSide}>
            <div className={s.ctaGlassPanel}>
              <div className={s.ctaPanelLine}>
                <span className={s.panelDot} />
                Strategy & scoping
              </div>
              <div className={s.ctaPanelLine}>
                <span className={s.panelDot} />
                Design & prototyping
              </div>
              <div className={s.ctaPanelLine}>
                <span className={s.panelDot} />
                Development & deploy
              </div>
              <div className={s.ctaPanelLine}>
                <span className={s.panelDot} />
                Growth & automation
              </div>
            </div>
            <div className={s.ctaGlassPanel} />
          </div>
        </div>
      </Reveal>

      {/* ====== FOOTER ====== */}
      <footer className={s.footer}>
        <span className={s.footerBrand}>BEIRUX</span>
        <div className={s.footerLinks}>
          <a className={s.footerLink} href="mailto:samih@beirux.com">
            Email
          </a>
          <a
            className={s.footerLink}
            href="https://beirux.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Website
          </a>
          <a
            className={s.footerLink}
            href="https://instagram.com/beirux"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>
        <div className={s.footerCopy}>
          &copy; {new Date().getFullYear()} BEIRUX. Miami, FL.
        </div>
      </footer>
    </div>
  );
}

/* -----------------------------------------------
   Helper: base transform per hero panel index
   (matches the nth-child CSS, so parallax adds on top)
   ----------------------------------------------- */
function getBaseTransform(i: number): string {
  switch (i) {
    case 0:
      return 'rotateY(4deg) rotateX(-2deg)';
    case 1:
      return 'rotateY(-6deg) rotateX(3deg)';
    case 2:
      return 'rotateY(2deg) rotateX(4deg)';
    case 3:
      return 'rotateY(-3deg) rotateX(-5deg)';
    case 4:
      return 'translate(-50%, -50%) rotateY(8deg) rotateX(-4deg)';
    default:
      return '';
  }
}
