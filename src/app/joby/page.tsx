'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView } from '@/hooks/useInView';
import { useStickyScroll } from '@/hooks/useStickyScroll';
import s from './joby.module.scss';

/* ═══════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════ */

const EXPERIENCES = [
  {
    headline: 'Leave city congestion behind and choose a stress-free commute through the clouds.',
    body: 'Our all-electric air taxi gets you above it all, turning hours of gridlock into minutes of flight.',
    link: 'Discover the Experience',
    photoLarge: 'linear-gradient(135deg, #8ba4b8 0%, #5b7a94 40%, #3d5a70 100%)',
    photoSmall: 'linear-gradient(135deg, #c4a87c 0%, #a08060 50%, #7a6048 100%)',
  },
  {
    headline: 'Sit back and enjoy. Breathtaking views come standard with every seat.',
    body: 'Floor-to-ceiling windows and whisper-quiet flight create an experience unlike anything on the road.',
    link: 'Discover the Experience',
    photoLarge: 'linear-gradient(135deg, #c4a87c 0%, #d4b88c 30%, #8b7355 100%)',
    photoSmall: 'linear-gradient(135deg, #6b98b8 0%, #4a7a98 100%)',
  },
  {
    headline: 'Enjoy seamless travel with a next-generation rideshare to the vertiport.',
    body: 'Our app coordinates your end-to-end commute, including ground transport to and from our vertiports.',
    link: 'Discover the Experience',
    photoLarge: 'linear-gradient(135deg, #b8a090 0%, #9a8070 40%, #786050 100%)',
    photoSmall: 'linear-gradient(135deg, #7bb0c8 0%, #5a90a8 100%)',
  },
];

const TECH_INDEX = [
  {
    num: '4.1',
    title: 'Performance Engineering',
    desc: "Delivering best-in-class performance through ultra-lightweight, highly optimized design. From airframes and actuators to powertrains and electronics, components are engineered in-house with a relentless focus on innovation.",
  },
  {
    num: '4.2',
    title: 'Equipment-level Testing',
    desc: 'Conducting equipment-level testing at speed, with the capability to support the full spectrum of development and certification testing. State-of-the-art labs enable rapid iteration and validation across systems.',
  },
  {
    num: '4.3',
    title: 'Precision and Quality',
    desc: "A manufacturing process designed for scalability without compromising precision or quality, informed by world-renowned engineering and production systems.",
  },
  {
    num: '4.4',
    title: 'An American Company',
    desc: 'Designed, engineered, built and tested in America.',
  },
];

const NEWS = [
  {
    date: 'May 5, 2026',
    tag: 'Milestones',
    title: 'Electric Air Taxi Completes Landmark Cross-City Flight Test',
    gradient: 'linear-gradient(135deg, #6b98b8 0%, #4a7898 100%)',
  },
  {
    date: 'Apr 28, 2026',
    tag: 'Partnerships',
    title: 'New Partnership Expands Urban Air Mobility Network to 12 Cities',
    gradient: 'linear-gradient(135deg, #c4a87c 0%, #a08060 100%)',
  },
  {
    date: 'Apr 15, 2026',
    tag: 'Sustainability',
    title: 'Annual Report Shows 40% Reduction in Carbon Footprint Year Over Year',
    gradient: 'linear-gradient(135deg, #7bb0c8 0%, #5090a8 100%)',
  },
];

const STATS = [
  { number: 'Zero', label: 'operating emissions during flight' },
  { number: '90%', label: 'fewer emissions than a helicopter' },
];

const PROCESS_TEXT =
  'Joby is a vertically-integrated company, meaning we design, engineer, test and manufacture our critical aircraft components in-house.';

/* ═══════════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════════ */

function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`${s.nav} ${scrolled ? s.navScrolled : ''}`}>
      <button className={s.hamburger} aria-label="Menu">
        <span /><span /><span />
      </button>

      <a href="/joby" className={s.logo}>
        <span className={s.logoMark}>
          <svg viewBox="0 0 40 28">
            <path d="M20 0C14 0 8.5 3.5 5.5 9C2 15.5 0 20 0 24c0 2.2 1.8 4 4 4s4-1.8 4-4c0-1.5.5-3 1.5-5C12 14 15.5 10 20 10s8 4 11.5 9c1 2 1.5 3.5 1.5 5 0 2.2 1.8 4 4 4s4-1.8 4-4c0-4-2-8.5-5.5-15C32.5 3.5 26 0 20 0z" />
          </svg>
        </span>
        Joby
      </a>

      <a href="#" className={s.navRight}>
        Investors
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 7h8M8 3.5L11 7l-3 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </nav>
  );
}

function SectionIndicator({ number, label, visible }: { number: number; label: string; visible: boolean }) {
  return (
    <div className={`${s.sectionIndicator} ${visible ? s.sectionIndicatorVisible : ''}`}>
      <div className={s.indicatorCircle}>{number}</div>
      <span className={s.indicatorLabel}>{label}</span>
    </div>
  );
}

/* ─── Hero ─── */

function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const fadeOut = Math.max(0, 1 - scrollY / 500);

  return (
    <section className={s.hero}>
      <div className={s.heroGlow} />
      <div className={s.heroGlow2} />

      <div className={s.heroContent} style={{ opacity: fadeOut, transform: `translateY(${scrollY * 0.15}px)` }}>
        <h1 className={s.heroHeadline}>
          Skip traffic.<br />
          Time to fly.
        </h1>
        <p className={s.heroSub}>
          Elevate your commute with our all-electric air taxi, soon to be bookable at the touch of a button.
        </p>
      </div>

      <div className={s.scrollIndicator} style={{ opacity: fadeOut }}>
        <div className={s.scrollLine} />
        <span>Scroll</span>
      </div>
    </section>
  );
}

/* ─── Approach (sticky scroll zoom) ─── */

function ApproachSection() {
  const { wrapperRef, progress } = useStickyScroll();

  const orbScale = 1 + progress * 4;
  const textOpacity = progress > 0.3 && progress < 0.85 ? Math.min(1, (progress - 0.3) * 4) : progress >= 0.85 ? Math.max(0, 1 - (progress - 0.85) * 6) : 0;
  const bgLight = Math.round(progress * 100);
  const bg = `linear-gradient(180deg, hsl(30, 12%, ${5 + bgLight * 0.88}%) 0%, hsl(30, 10%, ${8 + bgLight * 0.85}%) 100%)`;

  return (
    <div className={s.approachWrapper} ref={wrapperRef}>
      <div className={s.approachSticky} style={{ background: bg }}>
        <div
          className={s.approachOrb}
          style={{ transform: `scale(${orbScale})` }}
        />
        <div className={s.approachText} style={{ opacity: textOpacity, color: progress > 0.5 ? '#1a1a2e' : '#ffffff' }}>
          Zero traffic. Zero operating emissions. Just the space and time your day deserves.
        </div>
      </div>
    </div>
  );
}

/* ─── Blue Statement ─── */

function BlueStatement() {
  const { ref, isVisible } = useInView();

  return (
    <section className={s.blueStatement} ref={ref}>
      <h2
        className={s.blueHeadline}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        Nowhere to go<br />but Up
      </h2>
      <div
        className={s.blueImage}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(60px)',
          transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 1s cubic-bezier(0.16,1,0.3,1) 0.2s',
        }}
      />
    </section>
  );
}

/* ─── Experience Highlights ─── */

function ExperienceCard({ item, index }: { item: typeof EXPERIENCES[0]; index: number }) {
  const { ref, isVisible } = useInView();

  return (
    <div
      ref={ref}
      className={`${s.experienceItem} ${isVisible ? s.experienceItemVisible : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={s.experiencePhotos}>
        <div className={s.experiencePhotoLarge}>
          <div className={s.photoPlaceholder} style={{ background: item.photoLarge }} />
        </div>
        <div className={s.experiencePhotoSmall}>
          <div className={s.photoPlaceholder} style={{ background: item.photoSmall }} />
        </div>
      </div>

      <div className={s.experienceContent}>
        <h3 className={s.experienceText}>{item.headline}</h3>
        <p className={s.experienceBody}>{item.body}</p>
        <a href="#" className={s.experienceLink}>
          {item.link}
          <svg viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}

function ExperienceSection() {
  return (
    <section className={s.experience}>
      <span className={s.experienceSide}>Experience Highlights</span>
      {EXPERIENCES.map((item, i) => (
        <ExperienceCard key={i} item={item} index={i} />
      ))}
    </section>
  );
}

/* ─── Technology Hero ─── */

function TechHeroSection() {
  const { ref, isVisible } = useInView();

  return (
    <section className={s.techHero} ref={ref}>
      <span className={s.techHeroLabel}>Technology</span>
      <h2
        className={s.techHeroHeadline}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        Cruise, controlled.
      </h2>
      <div
        className={s.techHeroImage}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.95)',
          transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s, transform 0.9s cubic-bezier(0.16,1,0.3,1) 0.15s',
        }}
      />
    </section>
  );
}

/* ─── Technology Breakdowns ─── */

function TechIndexItem({ item, index }: { item: typeof TECH_INDEX[0]; index: number }) {
  const { ref, isVisible } = useInView();

  return (
    <div
      ref={ref}
      className={`${s.techIndexItem} ${isVisible ? s.techIndexItemVisible : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <span className={s.techIndexNum}>{item.num}</span>
      <h4 className={s.techIndexTitle}>{item.title}</h4>
      <p className={s.techIndexDesc}>{item.desc}</p>
    </div>
  );
}

function TechBreakdowns() {
  return (
    <section className={s.techBreakdowns}>
      <div className={s.techBreakdownHeader}>
        <span className={s.techBreakdownLabel}>Safety</span>
        <div>
          <h3 className={s.techBreakdownTitle}>
            Intuitive piloting with integrated controls
          </h3>
        </div>
        <p className={s.techBreakdownBody}>
          Pilot controls have been revolutionized to be simple and intuitive, allowing fully-qualified pilots to focus on what matters most.
        </p>
      </div>

      <div className={s.techIndex}>
        {TECH_INDEX.map((item, i) => (
          <TechIndexItem key={item.num} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ─── Blue Interactive (Sound) ─── */

function BlueInteractive() {
  const { ref, isVisible } = useInView();

  return (
    <section className={s.blueInteractive} ref={ref}>
      <SectionIndicator number={3} label="Sound" visible={isVisible} />

      <h2 className={s.blueInteractiveHeadline}>
        Designed to be quiet
      </h2>

      <div className={s.propellerContainer}>
        <svg className={s.propellerSvg} viewBox="0 0 400 400">
          {/* Arcs */}
          <ellipse className={s.arc} cx="200" cy="200" rx="160" ry="130" transform="rotate(-15 200 200)" />
          <ellipse className={s.arc} cx="200" cy="200" rx="140" ry="170" transform="rotate(25 200 200)" />

          {/* Blades */}
          <path className={s.blade} d="M200 200 Q180 120 200 40 Q220 120 200 200Z" transform="rotate(0 200 200)" />
          <path className={s.blade} d="M200 200 Q180 120 200 40 Q220 120 200 200Z" transform="rotate(120 200 200)" />
          <path className={s.blade} d="M200 200 Q180 120 200 40 Q220 120 200 200Z" transform="rotate(240 200 200)" />

          {/* Hub */}
          <circle className={s.hub} cx="200" cy="200" r="12" />
        </svg>

        <div className={s.annotationLeft}>
          <span>Propeller Design</span>
          <div className={s.annotationLine} />
          <div className={s.annotationDot} />
        </div>

        <div className={s.annotationRight}>
          <div className={s.annotationDot} />
          <div className={s.annotationLine} />
          <span>Sound Waves</span>
        </div>
      </div>

      <p className={s.blueBody}>
        More than a decade of research ensures the aircraft blends into the background as it moves around cities. Purpose-built blade geometry reduces vortex-interaction noise during transition flight.
      </p>

      <button className={s.pillButton}>Hear for yourself</button>
    </section>
  );
}

/* ─── Engineering ─── */

function PhotoGridItem({ gradient, label, labelRight, index }: { gradient: string; label?: string; labelRight?: boolean; index: number }) {
  const { ref, isVisible } = useInView();

  return (
    <div
      ref={ref}
      className={`${s.photoGridItem} ${isVisible ? s.photoGridItemVisible : ''}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className={s.photoPlaceholder} style={{ background: gradient }} />
      {label && (
        <span className={labelRight ? s.photoLabelRight : s.photoLabel}>{label}</span>
      )}
    </div>
  );
}

function EngineeringSection() {
  return (
    <section className={s.engineering}>
      <SectionIndicator number={4} label="Engineering" visible={true} />

      <h2 className={s.engineeringHeadline}>
        Making Dreams<br />Take Flight
      </h2>

      <div className={s.engineeringBody}>
        <p>
          Critical aircraft components are designed, engineered and manufactured in-house. That means almost every detail, seen and unseen, is built and verified by the team.
        </p>
        <p>
          The manufacturing process is designed to maximize precision and quality control, informed by world-renowned engineering and production expertise.
        </p>
      </div>

      <div className={s.photoGrid}>
        <PhotoGridItem
          gradient="linear-gradient(135deg, #7ab8a0 0%, #4a9880 100%)"
          label="Software Simulation"
          index={0}
        />
        <PhotoGridItem
          gradient="linear-gradient(135deg, #6b6b6b 0%, #3d3d3d 50%, #4a4a4a 100%)"
          labelRight
          label="Marina, CA"
          index={1}
        />
        <PhotoGridItem
          gradient="linear-gradient(135deg, #a0a0a0 0%, #787878 100%)"
          index={2}
        />
      </div>
    </section>
  );
}

/* ─── Process Text Fill ─── */

function ProcessSection() {
  const { wrapperRef, progress } = useStickyScroll();
  const words = PROCESS_TEXT.split(' ');
  const filledCount = Math.floor(progress * words.length * 1.4);

  return (
    <div className={s.processWrapper} ref={wrapperRef}>
      <div className={s.processSticky}>
        <span className={s.processLabel}>Process &amp; Capabilities</span>
        <p className={s.processText}>
          {words.map((word, i) => (
            <span
              key={i}
              className={s.processWord}
              style={{ color: i < filledCount ? '#1a1a2e' : '#c0bdb8' }}
            >
              {word}{' '}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

/* ─── Stats ─── */

function StatItem({ stat }: { stat: typeof STATS[0] }) {
  const { ref, isVisible } = useInView();

  return (
    <div ref={ref} className={`${s.statItem} ${isVisible ? s.statItemVisible : ''}`}>
      <div className={s.statNumber}>{stat.number}</div>
      <div className={s.statLabel}>{stat.label}</div>
    </div>
  );
}

function StatsSection() {
  return (
    <section className={s.stats}>
      <div className={s.statsIndicator}>
        <SectionIndicator number={5} label="Operating permissions" visible={true} />
      </div>
      {STATS.map((stat, i) => (
        <div key={i}>
          <StatItem stat={stat} />
          {i < STATS.length - 1 && <div className={s.statDivider} />}
        </div>
      ))}
    </section>
  );
}

/* ─── News ─── */

function NewsCard({ item, index }: { item: typeof NEWS[0]; index: number }) {
  const { ref, isVisible } = useInView();

  return (
    <a
      ref={ref as React.Ref<HTMLAnchorElement>}
      href="#"
      className={`${s.newsCard} ${isVisible ? s.newsCardVisible : ''}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <div className={s.newsCardImageWrap}>
        <div className={s.newsCardImage} style={{ background: item.gradient }} />
      </div>
      <div className={s.newsCardMeta}>
        <span className={s.newsCardDate}>{item.date}</span>
        <span className={s.newsCardTag}>{item.tag}</span>
      </div>
      <h3 className={s.newsCardTitle}>{item.title}</h3>
    </a>
  );
}

function NewsSection() {
  return (
    <section className={s.news}>
      <div className={s.newsLabel}>Latest News</div>
      <div className={s.newsGrid}>
        {NEWS.map((item, i) => (
          <NewsCard key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

/* ─── Footer ─── */

function FooterSection() {
  const [email, setEmail] = useState('');

  return (
    <footer className={s.footer}>
      <div className={s.footerTop}>
        <div className={s.footerLegal}>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Impact Reporting</a>
          <a href="#">Health Plan</a>
          <a href="#">Transparency</a>
          <a href="#">Safety Policy</a>
          <p className={s.footerCopy}>&copy; 2026 Joby Aero, Inc.</p>
        </div>

        <div className={s.footerColumns}>
          <div className={s.footerColumn}>
            <h4>Discover</h4>
            <a href="#">Experience</a>
            <a href="#">Technology</a>
            <a href="#">Company</a>
            <a href="#">News</a>
            <a href="#">Careers</a>
          </div>
          <div className={s.footerColumn}>
            <h4>Explore</h4>
            <a href="#">For Investors</a>
            <a href="#">Fly Blade</a>
            <a href="#">Joby Shop</a>
          </div>
          <div className={s.footerColumn}>
            <h4>Connect</h4>
            <a href="#">YouTube</a>
            <a href="#">Instagram</a>
            <a href="#">LinkedIn</a>
            <a href="#">X</a>
          </div>
        </div>
      </div>

      <div className={s.footerBottom}>
        <div className={s.footerLogo}>
          <svg viewBox="0 0 40 28">
            <path d="M20 0C14 0 8.5 3.5 5.5 9C2 15.5 0 20 0 24c0 2.2 1.8 4 4 4s4-1.8 4-4c0-1.5.5-3 1.5-5C12 14 15.5 10 20 10s8 4 11.5 9c1 2 1.5 3.5 1.5 5 0 2.2 1.8 4 4 4s4-1.8 4-4c0-4-2-8.5-5.5-15C32.5 3.5 26 0 20 0z" />
          </svg>
        </div>

        <div className={s.footerNewsletter}>
          <h3>Sign up for updates</h3>
          <form className={s.footerForm} onSubmit={e => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter e-mail address"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <button type="submit" aria-label="Subscribe">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </form>
          <p className={s.footerDisclaimer}>
            By entering your email and clicking subscribe, you agree to receive updates from Joby Aviation.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════ */

export default function JobyPage() {
  return (
    <div className={s.page}>
      <Navigation />
      <HeroSection />
      <ApproachSection />
      <BlueStatement />
      <ExperienceSection />
      <TechHeroSection />
      <TechBreakdowns />
      <BlueInteractive />
      <EngineeringSection />
      <ProcessSection />
      <StatsSection />
      <NewsSection />
      <FooterSection />
    </div>
  );
}
