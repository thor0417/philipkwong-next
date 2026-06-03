'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Services.module.css';

const SERVICES = [
  'Regulatory Compliance',
  'Technical Standards & Safety',
  'Corporate Strategy',
  'Go-to-Market Development',
  'Documentation & Commercialization',
];

export function Services() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768) return;
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll<HTMLElement>('#services .service-item').forEach((el) => {
      gsap.fromTo(el,
        { x: -10, opacity: 0 },
        {
          x: 0, opacity: 1, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 88%', end: 'top 62%', scrub: 0.8 },
        }
      );
    });
  }, []);

  return (
    <section id="services" className={styles.services} aria-labelledby="services-heading">
      <div className="grid-stage">

        <p className="section-label reveal reveal--fade" style={{ gridColumn: '1 / -1' }}>
          <span className="reveal__inner">03 — WHAT I DO</span>
        </p>
        <h2 id="services-heading" className="sr-only">Services</h2>

        <ol className={styles.list} style={{ gridColumn: '1 / -1' }} role="list">
          {SERVICES.map((title, i) => (
            <li key={title} className={`service-item ${styles.item}`}>
              <span className={styles.number}>{String(i + 1).padStart(2, '0')}</span>
              <span className={`reveal ${styles.title}`}>
                <span className="reveal__inner">{title}</span>
              </span>
            </li>
          ))}
        </ol>

      </div>
    </section>
  );
}
