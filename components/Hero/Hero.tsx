'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScramble } from '@/hooks/useScramble';
import styles from './Hero.module.css';

const MONTHS = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

function formatDate(d: Date) {
  return `${String(d.getDate()).padStart(2, '0')} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function ScrambledBracket({ text, delay }: { text: string; delay: number }) {
  const display = useScramble(text, delay);
  return <>{display}</>;
}

/* Masthead scramble: resolves full string, then switches to JSX with orange NO */
function ScrambledMasthead() {
  const FINAL = 'THERE ARE NO SHORTCUTS.';
  const display = useScramble(FINAL, 0);
  const resolved = display === FINAL;

  return resolved
    ? <>THERE ARE <span className="t-accent">NO</span> SHORTCUTS.</>
    : <>{display}</>;
}

export function Hero() {
  const clockVanRef = useRef<HTMLTimeElement>(null);
  const clockBkkRef = useRef<HTMLTimeElement>(null);
  const dateRef     = useRef<HTMLSpanElement>(null);

  /* ── Clock + date engine ── */
  useEffect(() => {
    const fmtVan = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'America/Vancouver', hour: '2-digit', minute: '2-digit',
    });
    const fmtBkk = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Asia/Bangkok', hour: '2-digit', minute: '2-digit',
    });

    const tick = () => {
      const now = new Date();
      if (clockVanRef.current) {
        clockVanRef.current.textContent = fmtVan.format(now);
        clockVanRef.current.setAttribute('datetime', now.toISOString());
      }
      if (clockBkkRef.current) {
        clockBkkRef.current.textContent = fmtBkk.format(now);
        clockBkkRef.current.setAttribute('datetime', now.toISOString());
      }
      if (dateRef.current) {
        dateRef.current.textContent = formatDate(now);
      }
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* ── Reveal on mount ── */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach((el) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 100%',
        once: true,
        onEnter: () => el.classList.add('is-visible'),
      });
    });
  }, []);

  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-heading">

      {/* Data strip — top edge, hairlines above and below */}
      <div className={styles.dataStrip}>
        <div className={styles.dataCellLeft}>
          <span className={styles.clockCity}>Vancouver</span>
          <time ref={clockVanRef} className={styles.clockTime} dateTime="">00:00</time>
        </div>
        <div className={styles.dataCellCenter}>
          <span
            suppressHydrationWarning
            ref={dateRef}
            className={styles.dateDisplay}
          >
            -- --- ----
          </span>
        </div>
        <div className={styles.dataCellRight}>
          <span className={styles.clockCity}>Bangkok</span>
          <time ref={clockBkkRef} className={styles.clockTime} dateTime="">00:00</time>
        </div>
      </div>

      {/* Masthead — one line, full-bleed, decode on load */}
      <div className={styles.mastheadArea}>
        <h1
          id="hero-heading"
          className={styles.masthead}
          aria-label="There are no shortcuts."
        >
          <ScrambledMasthead />
        </h1>
      </div>

      {/* Classification row — hairline above, tags justified L / C / R */}
      <div className={styles.classRow} aria-label="Professional credentials">
        <span className="t-registry">
          <strong><ScrambledBracket text="[ULC:]" delay={1200} /></strong> CORP. STRATEGY
        </span>
        <span className="t-registry">
          <strong><ScrambledBracket text="[ISO:]" delay={1600} /></strong> VICE CONVENER
        </span>
        <span className="t-registry">
          <strong><ScrambledBracket text="[REG: 08.YRS]" delay={2000} /></strong> COMPLIANCE
        </span>
      </div>

    </section>
  );
}
