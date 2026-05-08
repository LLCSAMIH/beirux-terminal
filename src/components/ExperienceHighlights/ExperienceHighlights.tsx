'use client';

import AnimatedText from '@/components/AnimatedText/AnimatedText';
import { useInView } from '@/hooks/useInView';
import styles from './ExperienceHighlights.module.scss';

const SERVICES = [
  {
    number: '01',
    title: 'Digital Products',
    description: 'Websites, apps, and platforms built to ship fast and scale. No templates, no compromises, no handoff chaos.',
    gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)',
    icon: '{ }',
  },
  {
    number: '02',
    title: 'AI & Automation',
    description: 'Custom agents, n8n workflows, and systems that replace repetitive work with intelligent automation.',
    gradient: 'linear-gradient(135deg, #a855f7, #7c3aed)',
    icon: '⚡',
  },
  {
    number: '03',
    title: 'Growth Ops',
    description: 'SEO, analytics, lead gen, and the infrastructure to actually measure what works and cut what doesn\'t.',
    gradient: 'linear-gradient(135deg, #06b6d4, #a855f7)',
    icon: '↗',
  },
];

export default function ExperienceHighlights() {
  return (
    <section className={styles.section} id="services">
      <div className={styles.header}>
        <div className={styles.label}>What we do</div>
        <AnimatedText tag="h2" className={styles.heading}>
          Three things. Done right.
        </AnimatedText>
        <AnimatedText tag="p" delay={100} className={styles.subtext}>
          We don&apos;t do everything. We do the things that move the needle.
        </AnimatedText>
      </div>

      <div className={styles.grid}>
        {SERVICES.map((item, i) => (
          <ServiceCard key={item.number} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ item, index }: { item: typeof SERVICES[0]; index: number }) {
  const { ref, isVisible } = useInView();

  return (
    <div
      ref={ref}
      className={`${styles.card} ${isVisible ? styles.cardVisible : ''}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className={styles.cardTop} style={{ background: item.gradient }}>
        <span className={styles.cardNumber}>{item.number}</span>
        <span className={styles.cardIcon}>{item.icon}</span>
      </div>
      <div className={styles.cardContent}>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
      </div>
    </div>
  );
}
