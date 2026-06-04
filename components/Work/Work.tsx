'use client';

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { WORK_ENTRIES } from '@/lib/cases';
import styles from './Work.module.css';

interface WorkProps {
  onCaseOpen: (id: string) => void;
}

interface WorkEntryProps {
  id: string;
  client: string;
  tag: string;
  onCaseOpen: (id: string) => void;
  isMobile: boolean;
}

function WorkEntry({ id, client, tag, onCaseOpen, isMobile }: WorkEntryProps) {
  const [hovered, setHovered] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onCaseOpen(id);
    }
  };

  return (
    <motion.article
      className={`work-entry ${styles.entry}`}
      data-case-id={id}
      role="button"
      tabIndex={0}
      aria-label={`Open ${client} case study`}
      onClick={() => onCaseOpen(id)}
      onKeyDown={handleKeyDown}
      whileHover={!isMobile ? { scale: 1.01 } : undefined}
      onHoverStart={() => { if (!isMobile) setHovered(true); }}
      onHoverEnd={() => setHovered(false)}
    >
      <span className={styles.client}>{client}</span>
      <motion.span
        className={styles.tag}
        animate={{ color: hovered && !isMobile ? '#B34700' : 'rgba(10, 10, 10, 0.4)' }}
        transition={{ duration: 0.2 }}
      >
        {tag}
      </motion.span>
    </motion.article>
  );
}

export function Work({ onCaseOpen }: WorkProps) {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  /* ── GSAP scroll entrances — desktop only ── */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768) return;
    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll<HTMLElement>('.work-entry').forEach((el) => {
      gsap.fromTo(el,
        { opacity: 0, y: 12 },
        {
          opacity: 1, y: 0, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 90%', end: 'top 65%', scrub: 0.8 },
        }
      );
    });
  }, []);

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
            {WORK_ENTRIES.strategy.map(({ id, client, tag }) => (
              <WorkEntry
                key={id}
                id={id}
                client={client}
                tag={tag}
                onCaseOpen={onCaseOpen}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>

        <div className="divider" style={{ gridColumn: '1 / -1' }} role="separator" aria-hidden="true" />

        <div className={styles.subsection} style={{ gridColumn: '1 / -1' }}>
          <p className={`reveal reveal--fade ${styles.categoryLabel}`}>
            <span className="reveal__inner">ENGAGEMENTS</span>
          </p>
          <div className={styles.entriesTrack}>
            {WORK_ENTRIES.engagements.map(({ id, client, tag }) => (
              <WorkEntry
                key={id}
                id={id}
                client={client}
                tag={tag}
                onCaseOpen={onCaseOpen}
                isMobile={isMobile}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
