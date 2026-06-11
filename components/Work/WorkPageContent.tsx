'use client';

import { useState } from 'react';
import { CaseOverlay } from './CaseOverlay';
import { WorkIndex, type WorkFilter } from './WorkIndex';
import styles from './WorkPageContent.module.css';

const FILTERS: { key: WorkFilter; label: string }[] = [
  { key: 'all',         label: 'ALL'         },
  { key: 'standards',   label: 'STANDARDS'   },
  { key: 'engagements', label: 'ENGAGEMENTS' },
];

export function WorkPageContent() {
  const [filter, setFilter]             = useState<WorkFilter>('all');
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);

  return (
    <>
      <section className={styles.page}>
        <div className="grid-stage">

          <p className="section-label" style={{ gridColumn: '1 / -1' }}>Selected Work</p>

          <div style={{ gridColumn: '1 / -1' }}>
            <h1 className={styles.heading}>The Record.</h1>

            <div className={styles.meta}>
              <span className={styles.metaTag}><strong>[ENTRIES: 13]</strong></span>
              <span className={styles.metaTag}><strong>[JURISDICTIONS: CA · INTL]</strong></span>
              <span className={styles.metaTag}><strong>[STATUS: ACTIVE]</strong></span>
            </div>

            <div className={styles.filters} role="group" aria-label="Filter work entries">
              {FILTERS.map(({ key, label }) => (
                <button
                  key={key}
                  className={[
                    styles.filterBtn,
                    filter === key ? styles.filterBtnActive : '',
                  ].join(' ')}
                  onClick={() => setFilter(key)}
                  aria-pressed={filter === key}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <WorkIndex
            variant="full"
            filter={filter}
            onCaseOpen={setActiveCaseId}
          />

        </div>
      </section>

      <CaseOverlay caseId={activeCaseId} onClose={() => setActiveCaseId(null)} />
    </>
  );
}
