'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WORK_ENTRIES } from '@/lib/cases';
import styles from './Work.module.css';

export type WorkFilter = 'all' | 'standards' | 'engagements';
type Variant = 'home' | 'full';

interface WorkIndexProps {
  onCaseOpen: (id: string) => void;
  variant: Variant;
  filter?: WorkFilter;
}

export function WorkIndex({ onCaseOpen, variant, filter = 'all' }: WorkIndexProps) {
  const indexRef = useRef<HTMLUListElement>(null);

  // Entrance animation — once on scroll enter
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

  // Filter transitions
  useEffect(() => {
    const index = indexRef.current;
    if (!index) return;

    const rows     = index.querySelectorAll<HTMLElement>('li[data-category]');
    const dividers = index.querySelectorAll<HTMLElement>('li[data-divider]');

    rows.forEach(row => {
      gsap.killTweensOf(row);
      const cat     = row.getAttribute('data-category');
      const visible = filter === 'all' || cat === filter;
      if (visible) {
        gsap.set(row, { clearProps: 'display' });
        gsap.to(row, { opacity: 1, duration: 0.25, ease: 'power1.out' });
      } else {
        gsap.to(row, {
          opacity: 0,
          duration: 0.15,
          ease: 'power1.in',
          onComplete: () => gsap.set(row, { display: 'none' }),
        });
      }
    });

    dividers.forEach(div => {
      gsap.killTweensOf(div);
      if (filter === 'all') {
        gsap.set(div, { clearProps: 'display' });
        gsap.to(div, { opacity: 1, duration: 0.25, ease: 'power1.out' });
      } else {
        gsap.to(div, {
          opacity: 0,
          duration: 0.15,
          ease: 'power1.in',
          onComplete: () => gsap.set(div, { display: 'none' }),
        });
      }
    });
  }, [filter]);

  const handleKeyDown = (id: string) => (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onCaseOpen(id);
    }
  };

  const strategyRows = WORK_ENTRIES.strategy.map((e, i) => ({
    ...e,
    num: filter === 'engagements' ? 0 : i + 1,
  }));
  const engagementRows = WORK_ENTRIES.engagements.map((e, i) => ({
    ...e,
    num: filter === 'standards' ? 0
       : filter === 'all' ? WORK_ENTRIES.strategy.length + i + 1
       : i + 1,
  }));

  const rowClass    = variant === 'full'
    ? `${styles.indexRow} ${styles.indexRowFull}`
    : styles.indexRow;
  const clientClass = variant === 'full'
    ? `${styles.indexClient} ${styles.indexClientFull}`
    : styles.indexClient;
  const noClass     = variant === 'full'
    ? `${styles.indexNo} ${styles.indexNoFull}`
    : styles.indexNo;
  const scopeClass  = variant === 'full'
    ? `${styles.indexScope} ${styles.indexScopeFull}`
    : styles.indexScope;

  const renderRow = (
    { id, client, scope, tag, num }: { id: string; client: string; scope: string; tag: string; num: number },
    category: string
  ) => (
    <li
      key={id}
      className={rowClass}
      data-category={category}
      role="button"
      tabIndex={0}
      aria-label={`Open ${client} case study`}
      onClick={() => onCaseOpen(id)}
      onKeyDown={handleKeyDown(id)}
    >
      <span className={noClass}>{String(num).padStart(3, '0')}</span>
      <span className={clientClass}>{client}</span>
      <span className={scopeClass}>{scope}</span>
      <span className={styles.indexRole}>{tag}</span>
      {variant === 'full' && (
        <span className={styles.indexScopeRole} aria-hidden="true">{scope} · {tag}</span>
      )}
    </li>
  );

  const ulClass = [styles.index, variant === 'full' ? styles.indexFull : ''].filter(Boolean).join(' ');

  return (
    <ul
      ref={indexRef}
      className={ulClass}
      role="list"
      style={{ gridColumn: '1 / -1' }}
    >
      {variant === 'full' && (
        <li className={styles.indexHeader} aria-hidden="true">
          <span />
          <span>Client</span>
          <span>Scope</span>
          <span>Role</span>
        </li>
      )}

      <li className={styles.indexDivider} data-divider="standards" aria-hidden="true">
        <span className={styles.indexDividerLabel}>Standards</span>
      </li>

      {strategyRows.map(row => renderRow(row, 'standards'))}

      <li className={styles.indexDivider} data-divider="engagements" aria-hidden="true">
        <span className={styles.indexDividerLabel}>Engagements</span>
      </li>

      {engagementRows.map(row => renderRow(row, 'engagements'))}
    </ul>
  );
}
