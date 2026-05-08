'use client';

import AnimatedText from '@/components/AnimatedText/AnimatedText';
import { useInView } from '@/hooks/useInView';
import styles from './PartnersSection.module.scss';

const PARTNER_CATEGORIES = [
  {
    title: 'Aviation',
    partners: ['Toyota', 'Toray', 'Sumitomo'],
  },
  {
    title: 'Technology',
    partners: ['NVIDIA', 'JetBlue', 'Uber'],
  },
  {
    title: 'Infrastructure',
    partners: ['Reef', 'Signature', 'Atlantic'],
  },
  {
    title: 'Government',
    partners: ['US Air Force', 'NASA', 'FAA'],
  },
];

export default function PartnersSection() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <AnimatedText tag="h2" className={styles.heading}>
          With partners like this,{'\n'}there&apos;s nowhere to go but up.
        </AnimatedText>
      </div>

      <div className={styles.categories}>
        {PARTNER_CATEGORIES.map((cat, ci) => (
          <PartnerCategory key={cat.title} category={cat} index={ci} />
        ))}
      </div>
    </section>
  );
}

function PartnerCategory({ category, index }: { category: typeof PARTNER_CATEGORIES[0]; index: number }) {
  const { ref, isVisible } = useInView();

  return (
    <div
      ref={ref}
      className={`${styles.category} ${isVisible ? styles.categoryVisible : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <h3 className={styles.categoryTitle}>{category.title}</h3>
      <div className={styles.logoGrid}>
        {category.partners.map((partner) => (
          <div key={partner} className={styles.logo}>
            <span>{partner}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
