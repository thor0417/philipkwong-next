'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WORK_ENTRIES } from '@/lib/cases';
import { Stamp } from '@/components/Stamp/Stamp';
import styles from './WorkTeaser.module.css';

interface WorkTeaserProps {
  onCaseOpen: (id: string) => void;
}

/* Four featured entries in display order */
const TEASER_IDS = ['iso-iwa', 'ul-canada-tg', 'aurora', 'grant-leisure'] as const;

const TOTAL_ENTRIES =
  WORK_ENTRIES.strategy.length + WORK_ENTRIES.engagements.length;

export function WorkTeaser({ onCaseOpen }: WorkTeaserProps) {
  const listRef = useRef<HTMLUListElement>(null);

  /* Entrance animation — once on scroll enter */
  useEffect(() => {
    if (
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      window.innerWidth < 768
    ) return;

    gsap.registerPlugin(ScrollTrigger);
    const list = listRef.current;
    if (!list) return;

    const rows = list.querySelectorAll<HTMLElement>('li[data-row]');
    gsap.fromTo(
      rows,
      { opacity: 0, y: 10 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: list,
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

  return (
    <div className={styles.teaserWrap} style={{ gridColumn: '1 / -1' }}>
      <ul ref={listRef} className={styles.list} role="list">
        {TEASER_IDS.map((id, i) => {
          const entry =
            WORK_ENTRIES.strategy.find(e => e.id === id) ??
            WORK_ENTRIES.engagements.find(e => e.id === id);
          if (!entry) return null;

          return (
            <li
              key={id}
              className={styles.row}
              data-row={id}
              role="button"
              tabIndex={0}
              aria-label={`Open ${entry.client} case study`}
              onClick={() => onCaseOpen(id)}
              onKeyDown={handleKeyDown(id)}
            >
              <span className={styles.num}>{String(i + 1).padStart(3, '0')}</span>
              <span className={styles.client}>{entry.client}</span>
              <span className={styles.scope}>{entry.scope}</span>
              <span className={styles.role}>{entry.tag}</span>
            </li>
          );
        })}
      </ul>

      <div className={styles.recordWrap}>
        <Stamp href="/work" label="FULL RECORD" theme="light" aria-label={`View all ${TOTAL_ENTRIES} work entries`} />
      </div>
    </div>
  );
}
