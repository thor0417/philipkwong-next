'use client';

import { WorkIndex } from './WorkIndex';
import styles from './Work.module.css';

interface WorkProps {
  onCaseOpen: (id: string) => void;
}

export function Work({ onCaseOpen }: WorkProps) {
  return (
    <section id="work" className={styles.work} aria-labelledby="work-heading">
      <div className="grid-stage">

        <p className="section-label reveal reveal--fade" style={{ gridColumn: '1 / -1' }}>
          <span className="reveal__inner">SELECTED WORK</span>
        </p>
        <h2 id="work-heading" className="sr-only">Selected Work</h2>

        <WorkIndex variant="home" filter="all" onCaseOpen={onCaseOpen} />

      </div>
    </section>
  );
}
