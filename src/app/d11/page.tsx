'use client';

import { useStickyScroll } from '@/hooks/useStickyScroll';
import s from './d11.module.scss';

type Animation =
  | 'slideLeft'
  | 'scaleUp'
  | 'blurIn'
  | 'rotateIn'
  | 'dropDown'
  | 'slideRight'
  | 'fadeIn'
  | 'slideUp'
  | 'expandX'
  | 'flickerIn'
  | 'typeIn'
  | 'zoomRotate';

interface Frame {
  word: string;
  animation: Animation;
}

const FRAMES: Frame[] = [
  { word: 'We', animation: 'slideLeft' },
  { word: 'Build', animation: 'scaleUp' },
  { word: 'What', animation: 'blurIn' },
  { word: 'Others', animation: 'rotateIn' },
  { word: "Won’t", animation: 'dropDown' },
  { word: 'Touch.', animation: 'fadeIn' },
  { word: '.', animation: 'flickerIn' },
  { word: 'AI Agents.', animation: 'slideRight' },
  { word: 'Websites.', animation: 'slideUp' },
  { word: 'Systems.', animation: 'expandX' },
  { word: 'That Work.', animation: 'zoomRotate' },
  { word: 'samih@beirux.com', animation: 'typeIn' },
];

function getAnimationStyle(animation: Animation, progress: number): React.CSSProperties {
  // progress 0..0.4 = enter, 0.4..0.6 = hold, 0.6..1 = exit
  const enter = Math.min(progress / 0.4, 1);
  const exit = progress > 0.6 ? (progress - 0.6) / 0.4 : 0;
  const visible = enter - exit;

  switch (animation) {
    case 'slideLeft':
      return {
        opacity: visible,
        transform: `translateX(${(1 - enter) * 100 + exit * -100}%)`,
      };
    case 'slideRight':
      return {
        opacity: visible,
        transform: `translateX(${(1 - enter) * -100 + exit * 100}%)`,
      };
    case 'scaleUp':
      return {
        opacity: visible,
        transform: `scale(${enter * (1 - exit)})`,
      };
    case 'blurIn':
      return {
        opacity: visible,
        filter: `blur(${(1 - enter) * 20 + exit * 20}px)`,
      };
    case 'rotateIn':
      return {
        opacity: visible,
        transform: `rotate(${(1 - enter) * -15 + exit * 15}deg)`,
      };
    case 'dropDown':
      return {
        opacity: visible,
        transform: `translateY(${(1 - enter) * -100 + exit * 100}%)`,
      };
    case 'slideUp':
      return {
        opacity: visible,
        transform: `translateY(${(1 - enter) * 100 + exit * -100}%)`,
      };
    case 'fadeIn':
      return {
        opacity: visible,
      };
    case 'expandX':
      return {
        opacity: visible,
        transform: `scaleX(${enter * (1 - exit)})`,
      };
    case 'flickerIn': {
      // Flicker: opacity jumps between 0 and 1 during enter, then fades out
      const flicker = enter < 1 ? (Math.sin(enter * Math.PI * 8) > 0 ? 1 : 0) : 1;
      return {
        opacity: flicker * (1 - exit),
      };
    }
    case 'typeIn': {
      // Clip reveal from left
      const clipEnd = enter * 100;
      return {
        opacity: 1 - exit,
        clipPath: `inset(0 ${100 - clipEnd}% 0 0)`,
      };
    }
    case 'zoomRotate':
      return {
        opacity: visible,
        transform: `scale(${enter * (1 - exit)}) rotate(${(1 - enter) * 180}deg)`,
      };
    default:
      return { opacity: visible };
  }
}

function WordFrame({ frame, index }: { frame: Frame; index: number }) {
  const { wrapperRef, progress } = useStickyScroll();
  const isDark = index % 2 === 0;
  const isEmail = frame.word === 'samih@beirux.com';

  const animStyle = getAnimationStyle(frame.animation, progress);

  return (
    <div
      ref={wrapperRef}
      className={s.wrapper}
    >
      <div className={`${s.frame} ${isDark ? s.dark : s.light}`}>
        {isEmail ? (
          <a
            href="mailto:samih@beirux.com"
            className={s.word}
            style={animStyle}
          >
            {frame.word}
          </a>
        ) : (
          <span
            className={`${s.word} ${frame.word === '.' ? s.dot : ''}`}
            style={animStyle}
          >
            {frame.word}
          </span>
        )}
      </div>
    </div>
  );
}

export default function D11Page() {
  return (
    <main className={s.page}>
      {FRAMES.map((frame, i) => (
        <WordFrame key={frame.word} frame={frame} index={i} />
      ))}
    </main>
  );
}
