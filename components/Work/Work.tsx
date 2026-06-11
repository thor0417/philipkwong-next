'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WORK_ENTRIES } from '@/lib/cases';
import styles from './Work.module.css';

interface WorkProps {
  onCaseOpen: (id: string) => void;
}

export function Work({ onCaseOpen }: WorkProps) {
  const indexRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.innerWidth < 768
    ) return;

    gsap.registerPlugin(ScrollTrigger);

    const index = indexRef.current;
    if (!index) return;

    gsap.fromTo(
      index,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: index,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  const handleKeyDown = (id: string) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onCaseOpen(id);
    }
  };

  let n = 0;
  const strategyRows  = WORK_ENTRIES.strategy.map(e    => ({ ...e, num: ++n }));
  const engagementRows = WORK_ENTRIES.engagements.map(e => ({ ...e, num: ++n }));

  return (
    <section id="work" className={styles.work} aria-labelledby="work-heading">
      <div className="grid-stage">

        <p className="section-label reveal reveal--fade" style={{ gridColumn: '1 / -1' }}>
          <span className="reveal__inner">SELECTED WORK</span>
        </p>
        <h2 id="work-heading" className="sr-only">Selected Work</h2>

        <ul
          ref={indexRef}
          className={styles.index}
          role="list"
          style={{ gridColumn: '1 / -1' }}
        >
          <li className={styles.indexDivider} aria-hidden="true">
            <span className={styles.indexDividerLabel}>Strategy &amp; Standards</span>
          </li>

          {strategyRows.map(({ id, client, scope, tag, num }) => (
            <li
              key={id}
              className={styles.indexRow}
              role="button"
              tabIndex={0}
              aria-label={`Open ${client} case study`}
              onClick={() => onCaseOpen(id)}
              onKeyDown={handleKeyDown(id)}
            >
              <span className={styles.indexNo}>{String(num).padStart(3, '0')}</span>
              <span className={styles.indexClient}>{client}</span>
              <span className={styles.indexScope}>{scope}</span>
              <span className={styles.indexRole}>{tag}</span>
            </li>
          ))}

          <li className={styles.indexDivider} aria-hidden="true">
            <span className={styles.indexDividerLabel}>Engagements</span>
          </li>

          {engagementRows.map(({ id, client, scope, tag, num }) => (
            <li
              key={id}
              className={styles.indexRow}
              role="button"
              tabIndex={0}
              aria-label={`Open ${client} case study`}
              onClick={() => onCaseOpen(id)}
              onKeyDown={handleKeyDown(id)}
            >
              <span className={styles.indexNo}>{String(num).padStart(3, '0')}</span>
              <span className={styles.indexClient}>{client}</span>
              <span className={styles.indexScope}>{scope}</span>
              <span className={styles.indexRole}>{tag}</span>
            </li>
          ))}
        </ul>

      </div>
    </section>
  );
}
