'use client';

import { Stamp } from '@/components/Stamp/Stamp';
import styles from './DrawIn.module.css';

export function DrawIn() {
  return (
    <section id="draw-in" className={styles.section} data-theme="dark">
      <div className="grid-stage">

        <div className={styles.statement} style={{ gridColumn: '1 / -1' }}>
          <span className="reveal" style={{ '--reveal-delay': '0s' } as React.CSSProperties}>
            <span className="reveal__inner">
              Many organizations get built. Few are built to last.
            </span>
          </span>
          <span
            className={`reveal ${styles.stanza2}`}
            style={{ '--reveal-delay': '0.1s' } as React.CSSProperties}
          >
            <span className="reveal__inner">
              My work sits at the intersection of regulation, operations, standards, and growth,<br />
              creating the systems that turn ambitious ideas into enduring organizations.
            </span>
          </span>
        </div>

        <div className={styles.stampWrap} style={{ gridColumn: '1 / -1' }}>
          <Stamp href="/about" label="ABOUT" theme="dark" aria-label="About Philip Kwong" />
        </div>

      </div>
    </section>
  );
}
