'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ARTICLES, type Article } from '@/lib/articles';
import styles from './WritingPage.module.css';

/* Group by category, preserving array order within each group */
function groupByCategory(articles: Article[]): Map<string, Article[]> {
  const map = new Map<string, Article[]>();
  for (const a of articles) {
    if (!map.has(a.category)) map.set(a.category, []);
    map.get(a.category)!.push(a);
  }
  return map;
}

const grouped = groupByCategory(ARTICLES);

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

      {/* B2 + B3: Category sections */}
      <div className={styles.categoryList}>
        {Array.from(grouped.entries()).map(([category, articles]) => (
          <section key={category} className={styles.categorySection}>

            {/* Category header */}
            <div className={styles.categoryHeader}>
              <span className={styles.categoryName}>{category}</span>
            </div>

            {/* Article rows */}
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
        ))}
      </div>

    </main>
  );
}
