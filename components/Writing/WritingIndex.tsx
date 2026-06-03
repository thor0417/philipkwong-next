import Link from 'next/link';
import { ARTICLES } from '@/lib/articles';
import styles from './WritingIndex.module.css';

export function WritingIndex() {
  return (
    <section id="writing" className={styles.writing} aria-labelledby="writing-heading">
      <div className="grid-stage">

        <p className="section-label" style={{ gridColumn: '1 / -1' }}>05 — WRITING</p>

        <h1 id="writing-heading" className={styles.hero} style={{ gridColumn: '1 / -1' }}>
          Writing
        </h1>

        <div className={styles.list} style={{ gridColumn: '1 / -1' }}>
          {ARTICLES.map(({ slug, title, description, date, readTime }) => (
            <Link
              key={slug}
              href={`/writing/${slug}`}
              className={styles.entry}
              aria-label={title}
            >
              <div className={styles.entryLeft}>
                <h2 className={styles.entryTitle}>{title}</h2>
                <p className={styles.entryDesc}>{description}</p>
              </div>
              <div className={styles.entryRight}>
                <span className={styles.entryDate}>{date}</span>
                <span className="t-registry">
                  <strong>[READ:]</strong> {readTime} MIN
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
