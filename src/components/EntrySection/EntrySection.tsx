'use client';

import AnimatedText from '@/components/AnimatedText/AnimatedText';
import { useInView } from '@/hooks/useInView';
import styles from './EntrySection.module.scss';

interface EntrySectionProps {
  label?: string;
  heading: string;
  description?: string;
  linkText?: string;
  linkHref?: string;
  gradient: string;
  id?: string;
  reversed?: boolean;
}

export default function EntrySection({ label, heading, description, linkText, linkHref = '#', gradient, id, reversed }: EntrySectionProps) {
  const { ref, isVisible } = useInView();

  return (
    <section className={styles.section} id={id}>
      <div
        ref={ref}
        className={`${styles.inner} ${isVisible ? styles.visible : ''} ${reversed ? styles.reversed : ''}`}
      >
        <div className={styles.visual}>
          <div className={styles.visualCard} style={{ background: gradient }}>
            <div className={styles.visualGrid} />
            <div className={styles.visualGlow} />
          </div>
        </div>
        <div className={styles.content}>
          {label && <div className={styles.label}>{label}</div>}
          <AnimatedText tag="h3" className={styles.heading}>
            {heading}
          </AnimatedText>
          {description && (
            <AnimatedText delay={80} className={styles.description}>
              {description}
            </AnimatedText>
          )}
          {linkText && (
            <AnimatedText delay={160}>
              <a href={linkHref} className={styles.link}>
                {linkText}
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12M12 5l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </AnimatedText>
          )}
        </div>
      </div>
    </section>
  );
}
