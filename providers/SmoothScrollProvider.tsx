'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let _lenis: Lenis | null = null;
export function getLenis() { return _lenis; }

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const lenis = new Lenis({
      smoothWheel: true,
      duration: isMobile ? 0.9 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2.5,
    });

    lenisRef.current = lenis;
    _lenis = lenis;

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value?: number) {
        if (value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      },
    });

    const onScroll = () => ScrollTrigger.update();
    lenis.on('scroll', onScroll);

    const rafHandler = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(rafHandler);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(rafHandler);
      lenis.destroy();
      lenisRef.current = null;
      _lenis = null;
    };
  }, []);

  return <>{children}</>;
}
