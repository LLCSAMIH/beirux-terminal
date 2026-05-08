'use client';

import { useInView } from '@/hooks/useInView';
import styles from './AnimatedText.module.scss';

interface AnimatedTextProps {
  children: React.ReactNode;
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  delay?: number;
  className?: string;
}

export default function AnimatedText({
  children,
  tag: Tag = 'p',
  delay = 0,
  className = '',
}: AnimatedTextProps) {
  const { ref, isVisible } = useInView();

  return (
    <div ref={ref}>
      <Tag
        className={`${styles.text} ${isVisible ? styles.visible : ''} ${className}`}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </Tag>
    </div>
  );
}
