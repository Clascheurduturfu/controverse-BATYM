import { useEffect, useRef, useState } from 'react';

export const useWheelNavigation = (nextRoute: string, onNavigate: (route: string) => void) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const hasNavigatedRef = useRef(false);
  const accumulatedRef = useRef(0);
  const WHEEL_THRESHOLD = 600;

  useEffect(() => {
    hasNavigatedRef.current = false;
    accumulatedRef.current = 0;
    setScrollProgress(0);
  }, [nextRoute]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (hasNavigatedRef.current) return;

      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5;

      if (!atBottom) {
        accumulatedRef.current = 0;
        setScrollProgress(0);
        return;
      }

      if (e.deltaY > 0) {
        accumulatedRef.current += e.deltaY;
        const progress = Math.min(accumulatedRef.current / WHEEL_THRESHOLD, 1);
        setScrollProgress(progress);

        if (progress >= 1) {
          hasNavigatedRef.current = true;
          onNavigate(nextRoute);
        }
      } else {
        accumulatedRef.current = Math.max(0, accumulatedRef.current + e.deltaY);
        setScrollProgress(accumulatedRef.current / WHEEL_THRESHOLD);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [nextRoute, onNavigate]);

  return { scrollProgress };
};
