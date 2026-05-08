'use client';

import { useEffect, useRef, useState } from 'react';

export function useStickyScroll() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    function onScroll() {
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      const wrapperHeight = wrapper.offsetHeight;
      const viewportHeight = window.innerHeight;
      const scrollableDistance = wrapperHeight - viewportHeight;

      if (scrollableDistance <= 0) {
        setProgress(0);
        return;
      }

      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / scrollableDistance));
      setProgress(p);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { wrapperRef, progress };
}
