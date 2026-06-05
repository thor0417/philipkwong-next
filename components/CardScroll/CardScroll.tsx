'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function CardScroll() {
  useEffect(() => {
    if (window.innerWidth < 768) return;
    gsap.registerPlugin(ScrollTrigger);

    const triggers: ScrollTrigger[] = [];

    // Hero pins while About slides up over it
    const heroPin = ScrollTrigger.create({
      trigger: '#card-hero',
      start: 'top top',
      endTrigger: '#card-about',
      end: 'top top',
      pin: true,
      pinSpacing: false,
    });
    triggers.push(heroPin);

    // Scale and fade hero as About rises
    const heroFade = gsap.to('#card-hero', {
      scale: 0.95,
      opacity: 0.7,
      ease: 'none',
      scrollTrigger: {
        trigger: '#card-about',
        start: 'top bottom',
        end: 'top top',
        scrub: true,
      },
    });
    triggers.push(heroFade.scrollTrigger!);

    // Work pins while Contact slides up over it
    const workPin = ScrollTrigger.create({
      trigger: '#card-work',
      start: 'top top',
      endTrigger: '#card-contact',
      end: 'top top',
      pin: true,
      pinSpacing: false,
    });
    triggers.push(workPin);

    // Scale and fade work as Contact rises
    const workFade = gsap.to('#card-work', {
      scale: 0.95,
      opacity: 0.7,
      ease: 'none',
      scrollTrigger: {
        trigger: '#card-contact',
        start: 'top bottom',
        end: 'top top',
        scrub: true,
      },
    });
    triggers.push(workFade.scrollTrigger!);

    return () => {
      triggers.forEach(t => t?.kill());
    };
  }, []);

  return null;
}
