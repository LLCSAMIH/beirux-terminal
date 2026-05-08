'use client';

import { useEffect, useState } from 'react';
import { useStickyScroll } from '@/hooks/useStickyScroll';
import styles from './HeroSection.module.scss';

const SLIDES = [
  'Full-stack digital products, from first pixel to production deploy.',
  'Automation that runs your business while you sleep.',
  'AI agents that replace busywork with real leverage.',
];

export default function HeroSection() {
  const { wrapperRef, progress } = useStickyScroll();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const slideIndex = Math.min(
      SLIDES.length - 1,
      Math.floor(progress * SLIDES.length * 1.2)
    );
    setActiveSlide(slideIndex);
  }, [progress]);

  const titleOpacity = progress < 0.12 ? 1 : Math.max(0, 1 - (progress - 0.12) * 6);
  const subtitleOpacity = progress < 0.08 ? 1 : Math.max(0, 1 - (progress - 0.08) * 7);
  const gridOpacity = 0.15 + progress * 0.4;
  const gridScale = 1 + progress * 0.3;

  return (
    <section className={styles.section}>
      <div className={styles.stickyWrapper} ref={wrapperRef}>
        <div className={styles.stickyElement}>
          <div className={styles.bgLayer}>
            <div className={styles.gradientOrb1} style={{ transform: `translate(${progress * -80}px, ${progress * 60}px) scale(${gridScale})` }} />
            <div className={styles.gradientOrb2} style={{ transform: `translate(${progress * 60}px, ${progress * -40}px) scale(${1 + progress * 0.2})` }} />
            <div className={styles.gridOverlay} style={{ opacity: gridOpacity }} />
            <div className={styles.noise} />
          </div>

          <div className={styles.content}>
            <div className={styles.tagline} style={{ opacity: subtitleOpacity }}>
              <span className={styles.taglineDot} />
              Digital agency for operators
            </div>

            <h1 className={styles.title} style={{ opacity: titleOpacity }}>
              <span className={styles.titleLine}>We build.</span>
              <span className={styles.titleLine}>We ship.</span>
              <span className={styles.titleLine}>
                We show the <span className={styles.titleAccent}>work</span>.
              </span>
            </h1>

            <div className={styles.subtitle} style={{ opacity: subtitleOpacity }}>
              <p>Websites, automation, and AI systems for businesses that move fast.</p>
            </div>
          </div>

          <div className={styles.textSlides}>
            {SLIDES.map((slide, i) => (
              <p
                key={i}
                className={`${styles.slide} ${i === activeSlide ? styles.slideActive : ''}`}
              >
                {slide}
              </p>
            ))}
          </div>

          <div className={styles.scrollIndicator} style={{ opacity: Math.max(0, 1 - progress * 5) }}>
            <div className={styles.scrollLine} />
            <span>Scroll</span>
          </div>
        </div>
      </div>
    </section>
  );
}
