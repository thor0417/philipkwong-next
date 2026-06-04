'use client';

import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { WORK_ENTRIES } from '@/lib/cases';
import styles from './Work.module.css';

interface WorkProps {
  onCaseOpen: (id: string) => void;
}

export function Work({ onCaseOpen }: WorkProps) {
  const prefersReduced = useReducedMotion();
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const shouldAnimate = !prefersReduced && !isMobile;

  const handleKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onCaseOpen(id);
    }
  };

  const renderEntries = (entries: typeof WORK_ENTRIES.strategy) =>
    entries.map(({ id, client }, i) => (
      <motion.article
        key={id}
        className={`work-entry ${styles.entry}`}
        data-case-id={id}
        role="button"
        tabIndex={0}
        aria-label={`Open ${client} case study`}
        onClick={() => onCaseOpen(id)}
        onKeyDown={(e) => handleKeyDown(e, id)}
        initial={shouldAnimate ? { opacity: 0, x: -6 } : undefined}
        whileInView={shouldAnimate ? { opacity: 1, x: 0 } : undefined}
        whileHover={!isMobile ? { scale: 1.01 } : undefined}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className={styles.client}>{client}</span>
      </motion.article>
    ));

  return (
    <section id="work" className={styles.work} aria-labelledby="work-heading">
      <div className="grid-stage">

        <p className="section-label reveal reveal--fade" style={{ gridColumn: '1 / -1' }}>
          <span className="reveal__inner">04 — SELECTED WORK</span>
        </p>
        <h2 id="work-heading" className="sr-only">Selected Work</h2>

        <div className={styles.subsection} style={{ gridColumn: '1 / -1' }}>
          <p className={`reveal reveal--fade ${styles.categoryLabel}`}>
            <span className="reveal__inner">STRATEGY &amp; STANDARDS</span>
          </p>
          <div className={styles.entriesTrack}>
            {renderEntries(WORK_ENTRIES.strategy)}
          </div>
        </div>

        <div className="divider" style={{ gridColumn: '1 / -1' }} role="separator" aria-hidden="true" />

        <div className={styles.subsection} style={{ gridColumn: '1 / -1' }}>
          <p className={`reveal reveal--fade ${styles.categoryLabel}`}>
            <span className="reveal__inner">ENGAGEMENTS</span>
          </p>
          <div className={styles.entriesTrack}>
            {renderEntries(WORK_ENTRIES.engagements)}
          </div>
        </div>

      </div>
    </section>
  );
}
