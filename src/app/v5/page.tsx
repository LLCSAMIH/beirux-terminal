'use client';

import { useRef, useEffect, useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { useStickyScroll } from '@/hooks/useStickyScroll';
import s from './v5.module.scss';

/* ─── data ─── */

const SERVICES = [
  {
    name: 'Digital Products',
    description:
      'Web applications, mobile platforms, SaaS from first commit to production. Every interface custom-built, every interaction considered. No templates, no shortcuts, no apologies.',
  },
  {
    name: 'AI & Automation',
    description:
      'Autonomous agents, data pipelines, workflow engines that replace entire departments. We build systems that think, decide, and execute while you sleep.',
  },
  {
    name: 'Growth Ops',
    description:
      'SEO architecture, paid acquisition, conversion optimization, analytics infrastructure. Not guesswork dressed as strategy. Numbers that move, tracked to the cent.',
  },
];

const CLIENTS = [
  'Cartley LLC',
  'Steven Paul Diamonds',
  'Adonis Market',
  'Rides With Vinnie',
  'Key Vision LLC',
];

/* ─── reveal wrapper ─── */

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useInView({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`${s.reveal} ${isVisible ? s.revealVisible : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

/* ─── noise overlay ─── */

function NoiseOverlay() {
  return <div className={s.noiseOverlay} aria-hidden="true" />;
}

/* ─── gold rule ─── */

function GoldRule({ visible, delay = 0 }: { visible: boolean; delay?: number }) {
  return (
    <div
      className={`${s.goldRule} ${visible ? s.goldRuleVisible : ''}`}
      style={{ transitionDelay: `${delay}s` }}
      aria-hidden="true"
    />
  );
}

/* ─── hero section ─── */

function HeroSection() {
  const { wrapperRef, progress } = useStickyScroll();
  const [lineDrawn, setLineDrawn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLineDrawn(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const textY = progress * -30;
  const bgScale = 1 + progress * 0.15;
  const bgOpacity = Math.max(0, 0.06 - progress * 0.04);

  return (
    <div ref={wrapperRef} className={s.heroWrapper}>
      <section className={s.hero}>
        <div
          className={s.heroBgWord}
          style={{
            transform: `scale(${bgScale})`,
            opacity: bgOpacity,
          }}
          aria-hidden="true"
        >
          BEIRUX
        </div>

        <div
          className={s.heroContent}
          style={{ transform: `translateY(${textY}vh)` }}
        >
          <p className={s.heroEyebrow}>Miami Digital Agency</p>

          <h1 className={s.heroHeadline}>
            <span className={s.heroLine}>We build.</span>
            <span className={s.heroLine}>We ship.</span>
            <span className={s.heroLineAccent}>
              We show <em>the work.</em>
            </span>
          </h1>

          <div className={`${s.heroRule} ${lineDrawn ? s.heroRuleVisible : ''}`} />

          <p className={s.heroSubtitle}>
            Digital products &middot; AI systems &middot; Growth infrastructure
          </p>
        </div>

        <div className={s.heroScrollIndicator} aria-hidden="true">
          <span className={s.heroScrollLine} />
        </div>
      </section>
    </div>
  );
}

/* ─── services section ─── */

function ServicesSection() {
  const { ref: sectionRef, isVisible } = useInView({ threshold: 0.08 });

  return (
    <section ref={sectionRef} className={s.services}>
      <div className={s.servicesInner}>
        <div className={s.servicesLabel}>
          <Reveal delay={0.1}>
            <span className={s.servicesLabelText}>Services</span>
          </Reveal>
        </div>

        <div className={s.servicesList}>
          {SERVICES.map((service, i) => (
            <div key={service.name} className={s.serviceItem}>
              <Reveal delay={0.15 * (i + 1)}>
                <div className={s.serviceHeader}>
                  <span className={s.serviceNumber}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className={s.serviceName}>{service.name}</h3>
                </div>
              </Reveal>
              <GoldRule visible={isVisible} delay={0.3 + i * 0.2} />
              <Reveal delay={0.25 + i * 0.15}>
                <p className={s.serviceDescription}>{service.description}</p>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── clients section ─── */

function ClientsSection() {
  const { ref, isVisible } = useInView({ threshold: 0.2 });
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible || !trackRef.current) return;
    let frame: number;
    let x = 0;
    const speed = 0.3;

    function animate() {
      x -= speed;
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth / 2;
        if (Math.abs(x) >= trackWidth) x = 0;
        trackRef.current.style.transform = `translateX(${x}px)`;
      }
      frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [isVisible]);

  const clientList = [...CLIENTS, ...CLIENTS];

  return (
    <section ref={ref} className={s.clients}>
      <div className={s.clientsLabelRow}>
        <Reveal>
          <span className={s.clientsLabel}>Selected Clients</span>
        </Reveal>
      </div>

      <GoldRule visible={isVisible} delay={0.2} />

      <div className={s.clientsTrackContainer}>
        <div ref={trackRef} className={s.clientsTrack}>
          {clientList.map((client, i) => (
            <span key={`${client}-${i}`} className={s.clientName}>
              {client}
              {i < clientList.length - 1 && (
                <span className={s.clientBullet} aria-hidden="true">
                  &bull;
                </span>
              )}
            </span>
          ))}
        </div>
      </div>

      <GoldRule visible={isVisible} delay={0.4} />
    </section>
  );
}

/* ─── proof section ─── */

function ProofSection() {
  const { ref, isVisible } = useInView({ threshold: 0.15 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const target = 12;
    const duration = 2000;
    const stepTime = duration / target;
    let current = 0;

    const interval = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= target) clearInterval(interval);
    }, stepTime);

    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <section ref={ref} className={s.proof}>
      <div className={s.proofInner}>
        <div className={s.proofNumber}>
          <Reveal>
            <span className={s.proofDigit}>{count}</span>
          </Reveal>
          <Reveal delay={0.3}>
            <span className={s.proofLabel}>
              projects
              <br />
              shipped
            </span>
          </Reveal>
        </div>

        <GoldRule visible={isVisible} delay={0.5} />

        <Reveal delay={0.6}>
          <p className={s.proofQuote}>
            Every line of code, a decision.
            <br />
            Every deploy, a promise kept.
          </p>
        </Reveal>

        <div className={s.proofStats}>
          <Reveal delay={0.7}>
            <div className={s.proofStat}>
              <span className={s.proofStatValue}>0</span>
              <span className={s.proofStatLabel}>templates used</span>
            </div>
          </Reveal>
          <Reveal delay={0.8}>
            <div className={s.proofStat}>
              <span className={s.proofStatValue}>100%</span>
              <span className={s.proofStatLabel}>custom built</span>
            </div>
          </Reveal>
          <Reveal delay={0.9}>
            <div className={s.proofStat}>
              <span className={s.proofStatValue}>4 wks</span>
              <span className={s.proofStatLabel}>avg delivery</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ─── CTA section ─── */

function CTASection() {
  const { ref, isVisible } = useInView({ threshold: 0.15 });

  return (
    <section ref={ref} className={s.cta}>
      <div className={s.ctaInner}>
        <div className={s.ctaLeft}>
          <Reveal>
            <h2 className={s.ctaHeadline}>
              Ready to
              <br />
              <em>build?</em>
            </h2>
          </Reveal>
        </div>

        <div className={s.ctaDivider} aria-hidden="true">
          <div
            className={`${s.ctaDividerLine} ${
              isVisible ? s.ctaDividerLineVisible : ''
            }`}
          />
        </div>

        <div className={s.ctaRight}>
          <Reveal delay={0.3}>
            <a
              href="mailto:samih@beirux.com"
              className={s.ctaButton}
            >
              Start a project
            </a>
          </Reveal>
          <Reveal delay={0.5}>
            <p className={s.ctaContact}>
              samih@beirux.com
              <br />
              Miami, FL
            </p>
          </Reveal>
        </div>
      </div>

      <div className={s.ctaFooter}>
        <Reveal delay={0.6}>
          <GoldRule visible={isVisible} delay={0.7} />
          <p className={s.ctaFooterText}>
            &copy; {new Date().getFullYear()} BEIRUX. All rights reserved.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ─── page ─── */

export default function V5Page() {
  return (
    <main className={s.page}>
      <NoiseOverlay />
      <HeroSection />
      <ServicesSection />
      <ClientsSection />
      <ProofSection />
      <CTASection />
    </main>
  );
}
