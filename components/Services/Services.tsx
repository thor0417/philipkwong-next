'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './Services.module.css';

const SERVICES = [
  'Regulatory Compliance',
  'Technical Standards & Safety',
  'Corporate Strategy',
  'Go-to-Market Development',
  'Documentation & Commercialization',
];

export function Services() {
  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const shouldAnimate = !prefersReduced && !isMobile;

  return (
    <section id="services" className={styles.services} aria-labelledby="services-heading">
      <div className="grid-stage">

        <p className="section-label reveal reveal--fade" style={{ gridColumn: '1 / -1' }}>
          <span className="reveal__inner">03 — WHAT I DO</span>
        </p>
        <h2 id="services-heading" className="sr-only">Services</h2>

        <ol className={styles.list} style={{ gridColumn: '1 / -1' }} role="list">
          {SERVICES.map((title, i) => (
            <motion.li
              key={title}
              className={`service-item ${styles.item}`}
              initial={shouldAnimate ? { clipPath: 'inset(100% 0 0 0)' } : undefined}
              whileInView={shouldAnimate ? { clipPath: 'inset(0% 0 0 0)' } : undefined}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <span className={styles.number}>{String(i + 1).padStart(2, '0')}</span>
              <span className={styles.title}>{title}</span>
            </motion.li>
          ))}
        </ol>

      </div>
    </section>
  );
}
