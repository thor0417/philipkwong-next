'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WORK_ENTRIES } from '@/lib/cases';
import styles from './Work.module.css';

interface WorkProps {
  onCaseOpen: (id: string) => void;
}

export function Work({ onCaseOpen }: WorkProps) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768) return;
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll<HTMLElement>('#work .work-entry').forEach((el) => {
      gsap.fromTo(el,
        { x: -6, opacity: 0 },
        {
          x: 0, opacity: 1, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 88%', end: 'top 62%', scrub: 0.8 },
        }
      );
    });
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onCaseOpen(id);
    }
  };

  return (
    <section id="work" className={styles.work} aria-labelledby="work-heading">
      <div className="grid-stage">

        <p className="section-label reveal reveal--fade" style={{ gridColumn: '1 / -1' }}>
          <span className="reveal__inner">04 — SELECTED WORK</span>
        </p>
        <h2 id="work-heading" className="sr-only">Selected Work</h2>

        {/* Strategy & Standards */}
        <div className={styles.subsection} style={{ gridColumn: '1 / -1' }}>
          <p className={`reveal reveal--fade ${styles.categoryLabel}`}>
            <span className="reveal__inner">STRATEGY &amp; STANDARDS</span>
          </p>
          <div className={styles.entriesTrack}>
            {WORK_ENTRIES.strategy.map(({ id, client, descriptor }, i) => (
              <article
                key={id}
                className={`work-entry ${styles.entry}`}
                data-case-id={id}
                role="button"
                tabIndex={0}
                aria-label={`Open ${client} case study`}
                onClick={() => onCaseOpen(id)}
                onKeyDown={(e) => handleKeyDown(e, id)}
                style={{ '--reveal-delay': `${i * 0.06}s` } as React.CSSProperties}
              >
                <span className={`reveal ${styles.client}`} style={{ '--reveal-delay': `${i * 0.06}s` } as React.CSSProperties}>
                  <span className="reveal__inner">{client}</span>
                </span>
                <span className={styles.descriptor}>{descriptor}</span>
              </article>
            ))}
          </div>
        </div>

        <div className="divider" style={{ gridColumn: '1 / -1' }} role="separator" aria-hidden="true" />

        {/* Engagements */}
        <div className={styles.subsection} style={{ gridColumn: '1 / -1' }}>
          <p className={`reveal reveal--fade ${styles.categoryLabel}`}>
            <span className="reveal__inner">ENGAGEMENTS</span>
          </p>
          <div className={styles.entriesTrack}>
            {WORK_ENTRIES.engagements.map(({ id, client, descriptor }, i) => (
              <article
                key={id}
                className={`work-entry ${styles.entry}`}
                data-case-id={id}
                role="button"
                tabIndex={0}
                aria-label={`Open ${client} case study`}
                onClick={() => onCaseOpen(id)}
                onKeyDown={(e) => handleKeyDown(e, id)}
                style={{ '--reveal-delay': `${i * 0.06}s` } as React.CSSProperties}
              >
                <span className={`reveal ${styles.client}`} style={{ '--reveal-delay': `${i * 0.06}s` } as React.CSSProperties}>
                  <span className="reveal__inner">{client}</span>
                </span>
                <span className={styles.descriptor}>{descriptor}</span>
              </article>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
