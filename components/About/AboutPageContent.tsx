'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { WORK_ENTRIES } from '@/lib/cases';
import styles from './AboutPageContent.module.css';

const STANDARDS_COUNT  = String(WORK_ENTRIES.strategy.length).padStart(2, '0');
const ENGAGEMENTS_COUNT = String(WORK_ENTRIES.engagements.length).padStart(2, '0');

const CAPABILITIES = [
  {
    num: '01',
    title: 'QMS Architecture',
    description:
      'End-to-end quality management system design for regulated environments. Documentation hierarchy, SOP development, and audit-ready compliance frameworks.',
  },
  {
    num: '02',
    title: 'Regulatory Strategy',
    description:
      'Compliance pathway development and market entry strategy across cannabis, health professions, and emerging regulatory frameworks in Canada and Southeast Asia.',
  },
  {
    num: '03',
    title: 'Technical Standards',
    description:
      'Leadership and participation across national and international standards bodies — ISO IWA, ULC, ANSI/CAN, and NFPA reference systems.',
  },
  {
    num: '04',
    title: 'Operational Systems',
    description:
      'Facility planning, production workflow architecture, and operational program development for licensed manufacturers operating at scale.',
  },
  {
    num: '05',
    title: 'Corporate Transformation',
    description:
      'Organizational restructure, go-to-market strategy, and commercialization planning for regulated businesses at inflection points.',
  },
  {
    num: '06',
    title: 'Stakeholder Engagement',
    description:
      'Government relations, regulatory liaison, executive engagement, and cross-jurisdictional stakeholder coordination.',
  },
] as const;

export function AboutPageContent() {
  const capsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];

    /* Reveal system — mirrors Hero's global querySelectorAll */
    const reveals = document.querySelectorAll<HTMLElement>('.reveal');
    reveals.forEach(el => {
      const t = ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        onEnter: () => el.classList.add('is-visible'),
        once: true,
      });
      triggers.push(t);
    });

    /* Capabilities grid — staggered fade entrance */
    const grid = capsRef.current;
    if (grid) {
      const cells = grid.querySelectorAll<HTMLElement>('[data-cap]');
      gsap.fromTo(
        cells,
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: grid,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach(t => t.kill());
    };
  }, []);

  return (
    <main>

      {/* ── A1: Title ─────────────────────────────────────────── */}
      <section className={styles.titleSection}>
        <div className="grid-stage">
          <p className={`section-label ${styles.sectionLabelMuted}`}>
            ABOUT
          </p>
          <h1 className={styles.heading}>
            The Operator.
          </h1>
        </div>
      </section>

      {/* ── A2: Thesis ────────────────────────────────────────── */}
      <section className={styles.thesisSection}>
        <div className="grid-stage">
          <div className={styles.thesis}>
            <span
              className="reveal"
              style={{ '--reveal-delay': '0s' } as React.CSSProperties}
            >
              <span className="reveal__inner">
                Regulatory compliance is not a cost of doing business.
                It is the architecture of every business that scales.
              </span>
            </span>
            <span
              className="reveal"
              style={{ '--reveal-delay': '0.12s' } as React.CSSProperties}
            >
              <span className="reveal__inner">
                I have spent eight years at the exact table where those two worlds meet:
                technical standards, licensed operations, and corporate strategy.
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* ── A3: Photo ─────────────────────────────────────────── */}
      <section className={styles.photoSection}>
        <div className={styles.photoWrap}>
          <Image
            src="/sagard-panel.png.png"
            alt="Philip Kwong speaking on a panel"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
            priority
            sizes="100vw"
          />
        </div>
      </section>

      {/* ── A4: Dossier ───────────────────────────────────────── */}
      <section className={styles.dossierSection}>
        <div className="grid-stage">

          {/* Data rail — left */}
          <div className={styles.dataRail}>
            {[
              ['STATUS:',       'Active'],
              ['YEARS:',        '08 Yrs'],
              ['BASE:',         'Vancouver'],
              ['OPS:',          'Bangkok + SG'],
              ['STANDARDS:',    STANDARDS_COUNT],
              ['ENGAGEMENTS:',  ENGAGEMENTS_COUNT],
            ].map(([key, val]) => (
              <div key={key} className={styles.dataRow}>
                <span className="t-registry">
                  <strong>[{key}]</strong> {val}
                </span>
              </div>
            ))}
          </div>

          {/* Bio — right */}
          <div className={styles.bio}>
            <p>
              Philip Kwong is a regulatory compliance and corporate strategy consultant
              with eight years of practice across cannabis, health professions, and
              emerging regulatory frameworks in Canada and Southeast Asia.
            </p>
            <p>
              His work sits at the intersection of technical standards, quality systems,
              and organizational strategy — supporting licensed producers, standards
              bodies, and regulated businesses at market-entry, scale-up, and
              transformation stages.
            </p>
            <p>
              He has served as Vice Convener of ISO IWA 37-1, Chair of ULC TG 4400-2,
              and STP member for UL/ULC/ANSI/CAN/1389. He operates between Vancouver
              and Bangkok.
            </p>
          </div>

        </div>
      </section>

      {/* ── A5: Capabilities ──────────────────────────────────── */}
      <section className={styles.capsSection}>
        <div className="grid-stage">
          <p className={`section-label ${styles.sectionLabelMuted} ${styles.capsLabel}`}>
            WHAT I DO
          </p>
          <div ref={capsRef} className={styles.capsGrid}>
            {CAPABILITIES.map(cap => (
              <div key={cap.num} className={styles.capCell} data-cap={cap.num}>
                <span className={styles.capNum}>{cap.num}</span>
                <h3 className={styles.capTitle}>{cap.title}</h3>
                <p className={styles.capDesc}>{cap.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
