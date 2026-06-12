'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ARTICLES } from '@/lib/articles';
import styles from './WritingPage.module.css';

/* Sort descending by date, newest first */
const sorted = [...ARTICLES].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

const lead   = sorted[0];
const ledger = sorted.slice(1);

export function WritingPage() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const rows = document.querySelectorAll<HTMLElement>('[data-ledger-row]');
    if (!rows.length) return;

    gsap.fromTo(
      rows,
      { opacity: 0, y: 8 },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: rows[0],
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, []);

  return (
    <main>

      {/* ── B1: Title ─────────────────────────────────────────── */}
      <section className={styles.titleSection}>
        <div className="grid-stage">
          <p className={`section-label ${styles.sectionLabelMuted}`}>WRITING</p>
          <h1 className={styles.heading}>The Journal.</h1>
        </div>
      </section>

      {/* ── B2: Lead feature ──────────────────────────────────── */}
      <Link href={`/writing/${lead.slug}`} className={styles.leadLink}>
        <div className="grid-stage">
          <div className={styles.leadMeta}>
            <span className={styles.leadCategory}>{lead.category}</span>
            <span className={styles.leadRead}>[READ: {lead.readTime} MIN]</span>
          </div>
          <h2 className={styles.leadTitle}>{lead.title}</h2>
          <p className={styles.leadDesc}>{lead.description}</p>
        </div>
      </Link>

      {/* ── B3: Ledger ────────────────────────────────────────── */}
      <ul className={styles.ledger}>
        {ledger.map((article, i) => (
          <li key={article.slug} data-ledger-row={article.slug}>
            <Link href={`/writing/${article.slug}`} className={styles.ledgerRow}>
              <div className="grid-stage">
                <span className={styles.ghostNum} aria-hidden="true">
                  {String(i + 2).padStart(2, '0')}
                </span>
                <span className={styles.ledgerTitle}>{article.title}</span>
                <span className={styles.ledgerMeta}>
                  <span className={styles.ledgerCategory}>{article.category}</span>
                  <span className={styles.ledgerRead}>[READ: {article.readTime} MIN]</span>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

    </main>
  );
}
