'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ARTICLES, Article } from '@/lib/articles';
import styles from './WritingPage.module.css';

/* Series render order: Compliance Architecture first (older body of work,
   chronologically anchored April–May), then Competence Illusion. */
const SERIES: { key: string; name: string; dark: boolean }[] = [
  { key: 'compliance-architecture', name: 'THE COMPLIANCE ARCHITECTURE SERIES', dark: false },
  { key: 'competence-illusion',     name: 'THE COMPETENCE ILLUSION SERIES',     dark: true  },
];

const byDateDesc = (a: Article, b: Article) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

const seriesArticles = (key: string) =>
  ARTICLES.filter((a) => a.series === key).sort(byDateDesc);

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

      {/* Series sections — Compliance Architecture (light), then Competence Illusion (dark) */}
      {SERIES.map((series) => {
        const articles = seriesArticles(series.key);
        if (!articles.length) return null;

        return (
          <section
            key={series.key}
            className={`${styles.seriesSection} ${series.dark ? styles.seriesDark : ''}`}
            {...(series.dark ? { 'data-nav-dark': true } : {})}
          >
            <header className={styles.seriesHeader}>
              <span className={styles.seriesName}>{series.name}</span>
            </header>

            <ul className={styles.articleList}>
              {articles.map((article) => (
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
          </section>
        );
      })}

    </main>
  );
}
