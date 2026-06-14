'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ARTICLES } from '@/lib/articles';
import styles from './WritingPage.module.css';

const sortedArticles = [...ARTICLES].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export function WritingPage() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const rows = document.querySelectorAll<HTMLElement>('[data-article-row]');
    if (!rows.length) return;

    gsap.fromTo(
      rows,
      { opacity: 0, y: 8 },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.07,
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

      {/* B1: Title */}
      <section className={styles.titleSection}>
        <div className="grid-stage">
          <p className="section-label" style={{ gridColumn: '1 / -1' }}>WRITING</p>
          <h1 className={styles.heading} style={{ gridColumn: '1 / -1' }}>The Journal.</h1>
        </div>
      </section>

      {/* Article list — flat, date descending */}
      <div className={styles.categoryList}>
        <ul className={styles.articleList}>
          {sortedArticles.map((article) => (
            <li key={article.slug} data-article-row={article.slug}>
              <Link
                href={`/writing/${article.slug}`}
                className={styles.articleRow}
              >
                <span className={styles.articleTitle}>{article.title}</span>
                <span className={styles.articleRead}>[READ: {article.readTime} MIN]</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

    </main>
  );
}
