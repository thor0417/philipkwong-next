'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './AboutPageContent.module.css';

const SERVICES = [
  {
    num: '01',
    title: 'Compliance',
    description:
      'Regulatory architecture, compliance frameworks, licensing pathways, quality management systems, and organizational governance.',
  },
  {
    num: '02',
    title: 'Strategy',
    description:
      'Commercialization, market entry, stakeholder engagement, positioning, and long-term growth planning for regulated businesses.',
  },
  {
    num: '03',
    title: 'Operations',
    description:
      'Project management, workflow architecture, documentation systems, training programs, and the business operations that scale infrastructure.',
  },
  {
    num: '04',
    title: 'Growth',
    description:
      'Organizational transformation, go-to-market development, and the systems that turn ambitious ideas into enduring organizations.',
  },
] as const;

export function AboutPageContent() {
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const triggers: ReturnType<typeof ScrollTrigger.create>[] = [];

    /* Reveal system */
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

    /* Services row — staggered fade entrance */
    const grid = servicesRef.current;
    if (grid) {
      const cells = grid.querySelectorAll<HTMLElement>('[data-service]');
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
          <p className="section-label" style={{ gridColumn: '1 / -1' }}>ABOUT</p>
          <h1 className={styles.heading} style={{ gridColumn: '1 / -1' }}>The Operator.</h1>
        </div>
      </section>

      {/* ── A2: Opening statement ─────────────────────────────── */}
      <section className={styles.thesisSection}>
        <div className="grid-stage">
          <div className={styles.thesis}>
            <span
              className="reveal"
              style={{ '--reveal-delay': '0s' } as React.CSSProperties}
            >
              <span className="reveal__inner">
                Over the last decade, I have worked across international standards development,
                provincial regulatory frameworks, operational architecture, quality systems,
                commercialization strategy, and market-entry programs.
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

      {/* ── A4: Bio ───────────────────────────────────────────── */}
      <section className={styles.dossierSection}>
        <div className="grid-stage">
          <div className={styles.bio}>
            <p>
              My work has supported organizations operating in some of the most
              highly regulated environments in North America.
            </p>
            <p>
              From ISO working groups and national standards committees to licensed
              manufacturers, healthcare organizations, and emerging industries, the common
              challenge remains the same:
            </p>
            <p className={styles.pullquote}>
              translating complexity into execution.
            </p>
          </div>
        </div>
      </section>

      {/* ── A5: Services ──────────────────────────────────────── */}
      <section className={styles.servicesSection}>
        <div className="grid-stage">
          <p className="section-label" style={{ gridColumn: '1 / -1' }}>WHAT I DO</p>
          <div ref={servicesRef} className={styles.servicesRow} style={{ gridColumn: '1 / -1' }}>
            {SERVICES.map(svc => (
              <div key={svc.num} className={styles.serviceCell} data-service={svc.num}>
                <span className={styles.serviceNum}>{svc.num}</span>
                <h3 className={styles.serviceTitle}>{svc.title}</h3>
                <p className={styles.serviceDesc}>{svc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
