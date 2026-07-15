'use client';

import { useEffect, useRef, useState, createContext, useContext } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let _lenis: Lenis | null = null;
export function getLenis() { return _lenis; }

const NavDarkContext = createContext(false);
export function useNavDark() { return useContext(NavDarkContext); }

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [navIsDark, setNavIsDark] = useState(false);
  const pathname = usePathname();

  /* Reset dark state on every route change */
  useEffect(() => {
    setNavIsDark(false);
  }, [pathname]);

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

    const checkNavDark = () => {
      const cardWork = document.getElementById('card-work');
      const contactRevealed = !!(cardWork && cardWork.getBoundingClientRect().bottom <= 80);

      /* Dark subpage sections (e.g. the Competence Illusion series band on the
         writing page) flip the nav dark while they sit under the nav bar. */
      let overDarkSection = false;
      const darkSection = document.querySelector('[data-nav-dark]');
      if (darkSection) {
        const r = darkSection.getBoundingClientRect();
        overDarkSection = r.top <= 80 && r.bottom > 80;
      }

      setNavIsDark(contactRevealed || overDarkSection);
    };

    const onScroll = () => {
      ScrollTrigger.update();
      checkNavDark();
    };
    lenis.on('scroll', onScroll);

    const rafHandler = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(rafHandler);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();
    checkNavDark();

    return () => {
      lenis.off('scroll', onScroll);
      gsap.ticker.remove(rafHandler);
      lenis.destroy();
      lenisRef.current = null;
      _lenis = null;
    };
  }, []);

  return <NavDarkContext.Provider value={navIsDark}>{children}</NavDarkContext.Provider>;
}
