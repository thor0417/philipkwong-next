'use client';

import { Stamp } from '@/components/Stamp/Stamp';
import styles from './DrawIn.module.css';

export function DrawIn() {
  return (
    <section id="draw-in" className={styles.section} data-theme="dark">
      <div className="grid-stage">

        <p className={styles.statement} style={{ gridColumn: '1 / 9' }}>
          The company that gets licensed is rarely the company that scales. I build the ones that do both.
        </p>

        <div className={styles.stampWrap} style={{ gridColumn: '9 / 13' }}>
          <Stamp href="/about" label="ABOUT" theme="dark" aria-label="About Philip Kwong" />
        </div>

      </div>
    </section>
  );
}
