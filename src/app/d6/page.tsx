'use client';

import { useInView } from '@/hooks/useInView';
import s from './d6.module.scss';

const SERVICES = [
  'Web Systems',
  'AI Agents',
  'Growth Ops',
  'Automation',
  'Design',
];

const NUMBERS = [
  { value: '12', label: 'Projects Shipped' },
  { value: '4', label: 'Active Agents' },
  { value: '92', label: 'Satisfaction Rate' },
  { value: '0', label: 'Templates Used' },
];

function FadeIn({ children }: { children: React.ReactNode }) {
  const { ref, isVisible } = useInView({ threshold: 0.05 });
  return (
    <div
      ref={ref}
      className={`${s.fadeIn} ${isVisible ? s.fadeInVisible : ''}`}
    >
      {children}
    </div>
  );
}

export default function D6Page() {
  return (
    <div className={s.page}>
      <FadeIn>
        <h1 className={s.name}>BEIRUX</h1>
      </FadeIn>

      <FadeIn>
        <p className={s.description}>Digital agency. Zero templates.</p>
      </FadeIn>

      <FadeIn>
        <hr className={s.rule} />
      </FadeIn>

      {SERVICES.map((name) => (
        <FadeIn key={name}>
          <p className={s.service}>{name}</p>
        </FadeIn>
      ))}

      <FadeIn>
        <hr className={s.rule} />
      </FadeIn>

      {NUMBERS.map((num) => (
        <FadeIn key={num.label}>
          <div className={s.number}>
            <span className={s.numberValue}>{num.value}</span>
            <span className={s.numberLabel}>{num.label}</span>
          </div>
        </FadeIn>
      ))}

      <FadeIn>
        <hr className={s.rule} />
      </FadeIn>

      <FadeIn>
        <a href="mailto:samih@beirux.com" className={s.email}>
          samih@beirux.com
        </a>
      </FadeIn>
    </div>
  );
}
