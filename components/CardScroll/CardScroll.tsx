'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function CardScroll() {
  useEffect(() => {
    if (window.innerWidth < 768) return;
    gsap.registerPlugin(ScrollTrigger);

    // Track the reveal of contact from under work
    const contactReveal = ScrollTrigger.create({
      trigger: '#card-work',
      start: 'bottom bottom',
      end: '+=100%',
      scrub: true,
      invalidateOnRefresh: true,
    });

    // CRITICAL: Recalculate all trigger locations once layout is set
    ScrollTrigger.refresh();

    return () => {
      contactReveal.kill();
    };
  }, []);

  return null;
}
