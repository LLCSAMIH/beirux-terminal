'use client';

import AnimatedText from '@/components/AnimatedText/AnimatedText';
import { useInView } from '@/hooks/useInView';
import styles from './NewsSection.module.scss';

const NEWS_ITEMS = [
  { date: 'May 5, 2026', title: 'Electric Air Taxi Completes Landmark Cross-City Flight Test', category: 'Milestones' },
  { date: 'Apr 28, 2026', title: 'New Partnership Expands Urban Air Mobility Network to 12 Cities', category: 'Partnerships' },
  { date: 'Apr 15, 2026', title: 'Annual Sustainability Report Shows 40% Reduction in Carbon Footprint', category: 'Sustainability' },
];

export default function NewsSection() {
  return (
    <section className={styles.section} id="news">
      <div className={styles.header}>
        <AnimatedText tag="h2" className={styles.heading}>
          News from above
        </AnimatedText>
        <a href="#" className={styles.viewAll}>
          View all news
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      <div className={styles.grid}>
        {NEWS_ITEMS.map((item, i) => (
          <NewsCard key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}

function NewsCard({ item, index }: { item: typeof NEWS_ITEMS[0]; index: number }) {
  const { ref, isVisible } = useInView();

  return (
    <a
      ref={ref as React.Ref<HTMLAnchorElement>}
      href="#"
      className={`${styles.card} ${isVisible ? styles.cardVisible : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={styles.cardImage}>
        <div
          className={styles.cardImagePlaceholder}
          style={{ background: `hsl(${200 + index * 30}, 40%, ${30 + index * 10}%)` }}
        />
      </div>
      <div className={styles.cardMeta}>
        <span className={styles.cardCategory}>{item.category}</span>
        <span className={styles.cardDate}>{item.date}</span>
      </div>
      <h3 className={styles.cardTitle}>{item.title}</h3>
    </a>
  );
}
