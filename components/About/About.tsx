'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './About.module.css';

export function About() {
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

        <p className="section-label reveal reveal--fade" style={{ gridColumn: '1 / -1' }}>
          <span className="reveal__inner">02 — ABOUT</span>
        </p>
        <h2 id="about-heading" className="sr-only">About</h2>

        <div className={styles.body} style={{ gridColumn: '1 / 7' }}>
          <p>I work with founders, operators, and leadership teams on the problems that require both strategic clarity and operational follow-through.</p>
          <p>The work spans market entry, regulatory compliance, corporate strategy, and the systems that make execution stick. Vancouver and Bangkok are the base. The work goes where it needs to.</p>
        </div>

        <div className={styles.gutter} style={{ gridColumn: '7 / 8' }} aria-hidden="true" />

        <div className={styles.locations} style={{ gridColumn: '9 / 13' }}>
          {[
            { key: 'STATUS:', value: 'ACTIVE' },
            { key: 'YEARS:',  value: '08' },
            { key: 'BASE:',   value: 'VANCOUVER, CA' },
            { key: 'OPS:',    value: 'BANGKOK, TH' },
          ].map(({ key, value }) => (
            <div key={key} className={styles.dataRow}>
              <span className="t-registry">
                <strong>[{key}]</strong> {value}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
