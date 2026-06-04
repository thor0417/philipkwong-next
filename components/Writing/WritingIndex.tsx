'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ARTICLES } from '@/lib/articles';
import styles from './WritingIndex.module.css';

export function WritingIndex() {
  const [featured, ...rest] = ARTICLES;

  return (
    <section id="writing" className={styles.writing} aria-labelledby="writing-heading">
      <div className="grid-stage">

        <p className="section-label" style={{ gridColumn: '1 / -1' }}>05 — WRITING</p>

        <h1 id="writing-heading" className={styles.hero} style={{ gridColumn: '1 / -1' }}>
          Writing
        </h1>

        {/* Featured article */}
        <motion.div
          className={styles.featured}
          style={{ gridColumn: '1 / -1' }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link href={`/writing/${featured.slug}`} className={styles.featuredLink} aria-label={featured.title}>
            <h2 className={styles.featuredTitle}>{featured.title}</h2>
            <p className={styles.featuredDesc}>{featured.description}</p>
            <div className={styles.featuredMeta}>
              <span className={styles.metaDate}>{featured.date}</span>
              <span className="t-registry" style={{ display: 'inline-block', marginBottom: 0 }}>
                <strong>[READ:]</strong> {featured.readTime} MIN
              </span>
            </div>
          </Link>
        </motion.div>

        <div className={styles.rule} style={{ gridColumn: '1 / -1' }} aria-hidden="true" />

        {/* Grid cards */}
        <div className={styles.grid} style={{ gridColumn: '1 / -1' }}>
          {rest.map(({ slug, title, description, date, readTime }, i) => (
            <motion.div
              key={slug}
              className={styles.card}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link href={`/writing/${slug}`} className={styles.cardLink} aria-label={title}>
                <h2 className={styles.cardTitle}>{title}</h2>
                <p className={styles.cardDesc}>{description}</p>
                <div className={styles.cardMeta}>
                  <span className={styles.metaDate}>{date}</span>
                  <span className="t-registry" style={{ display: 'inline-block', marginBottom: 0 }}>
                    <strong>[READ:]</strong> {readTime} MIN
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
