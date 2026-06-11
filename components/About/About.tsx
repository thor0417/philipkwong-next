'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView, animate } from 'framer-motion';
import styles from './About.module.css';

export function About() {
  const eightRef = useRef<HTMLSpanElement>(null);
  const isInView  = useInView(eightRef, { once: true });
  const [count, setCount]  = useState(8);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, 8, {
      duration: 1.2,
      ease: 'easeOut',
      onUpdate: (v) => setCount(Math.round(v)),
    });
    return controls.stop;
  }, [isInView]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768) return;
    gsap.registerPlugin(ScrollTrigger);

    const label = document.querySelector('#about .section-label');
    if (label) {
      gsap.fromTo(label,
        { opacity: 0 },
        { opacity: 1, ease: 'none', scrollTrigger: { trigger: label, start: 'top 90%', end: 'top 65%', scrub: 0.8 } }
      );
    }
  }, []);

  return (
    <section id="about" className={styles.about} aria-labelledby="about-heading">
      <div className="grid-stage">

        <h2 id="about-heading" className="sr-only">About</h2>

        <div className={styles.body} style={{ gridColumn: '1 / -1' }}>
          <p>
            I work with founders, operators, and leadership teams on the problems that require both strategic clarity and operational follow-through.{' '}
            <span className={styles.displayWord}>Active.</span>{' '}
            <span className={styles.displayWord}>
              <span ref={eightRef} suppressHydrationWarning>{count} years.</span>
            </span>{' '}
            The work spans market entry, regulatory compliance, corporate strategy, and the systems that make execution stick.{' '}
            <span className={styles.displayWord}>Vancouver and Bangkok.</span>{' '}
            The work goes where it needs to.
          </p>
        </div>

      </div>
    </section>
  );
}
