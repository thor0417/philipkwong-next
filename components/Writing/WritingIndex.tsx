'use client';

import { useState } from 'react';
import { ARTICLES, Article } from '@/lib/articles';
import { ArticleOverlay } from './ArticleOverlay';
import styles from './WritingIndex.module.css';

export function WritingIndex() {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const categories = Array.from(new Set(ARTICLES.map((a) => a.category)));

  return (
    <section id="writing" className={styles.writing} aria-labelledby="writing-heading">
      <div className="grid-stage">

        <p className="section-label" style={{ gridColumn: '1 / -1' }}>
          05 — WRITING
        </p>
        <h1 id="writing-heading" className="sr-only">Writing</h1>

        {categories.map((cat) => (
          <div key={cat} className={styles.categoryBlock} style={{ gridColumn: '1 / -1' }}>
            <p className={styles.categoryLabel}>{cat}</p>
            {ARTICLES.filter((a) => a.category === cat).map((article) => (
              <button
                key={article.slug}
                className={styles.entry}
                onClick={() => setActiveArticle(article)}
                aria-label={`Read ${article.title}`}
              >
                <span className={styles.entryTitle}>{article.title}</span>
                <span className={styles.entryTag}>
                  <span className="t-registry" style={{ display: 'inline', marginBottom: 0 }}>
                    <strong>[READ:]</strong> {article.readTime} MIN
                  </span>
                </span>
              </button>
            ))}
          </div>
        ))}

      </div>

      <ArticleOverlay
        article={activeArticle}
        onClose={() => setActiveArticle(null)}
      />
    </section>
  );
}
