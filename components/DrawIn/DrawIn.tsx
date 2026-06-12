'use client';

import Link from 'next/link';
import styles from './DrawIn.module.css';

export function DrawIn() {
  return (
    <section id="draw-in" className={styles.section} data-theme="dark">
      <div className="grid-stage">

        <p className={styles.statement} style={{ gridColumn: '1 / 9' }}>
          The company that gets licensed is rarely the company that scales. I build the ones that do both.
        </p>

        <div className={styles.stampWrap} style={{ gridColumn: '9 / 13' }}>
          <Link href="/about" className={styles.stamp} aria-label="About Philip Kwong">
            <span className={styles.stampLabel}>ABOUT</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
