'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function CardScroll() {
  useEffect(() => {
    if (window.innerWidth < 768) return;
    gsap.registerPlugin(ScrollTrigger);

    const pairs = [
      { trigger: '#card-about',   card: '#card-hero' },
      { trigger: '#card-contact', card: '#card-work' },
    ];

    const triggers: ScrollTrigger[] = [];

    pairs.forEach(({ trigger, card }) => {
      const tween = gsap.to(card, {
        scale:   0.95,
        opacity: 0.7,
        ease:    'none',
        scrollTrigger: {
          trigger,
          start: 'top bottom',
          end:   'top top',
          scrub: true,
        },
      });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return null;
}
