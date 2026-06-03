'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Hero.module.css';

const HEADLINE_LINES = [
  { text: 'There Are', multiplier: 1.0, accent: false, delay: '0.1s' },
  { text: 'No',        multiplier: 0.7, accent: true,  delay: '0.25s' },
  { text: 'Shortcuts.', multiplier: 1.2, accent: false, delay: '0.4s' },
];

export function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const lineRefs    = useRef<(HTMLSpanElement | null)[]>([]);
  const clockVanRef = useRef<HTMLTimeElement>(null);
  const clockBkkRef = useRef<HTMLTimeElement>(null);

  /* ── Clock engine ── */
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
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* ── Kinetic headline — desktop only ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.innerWidth < 768) return;

    const mouse = { rx: 0, ry: 0, dirty: false };
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouse.rx = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.ry = (e.clientY / window.innerHeight - 0.5) * 2;
      mouse.dirty = true;
    };

    const onLeave = () => {
      mouse.dirty = false;
      lineRefs.current.forEach((line) => {
        if (!line) return;
        gsap.to(line, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)', overwrite: true });
      });
    };

    const tick = () => {
      if (mouse.dirty) {
        mouse.dirty = false;
        lineRefs.current.forEach((line, i) => {
          if (!line) return;
          const mult = HEADLINE_LINES[i].multiplier;
          gsap.to(line, {
            x: Math.max(-12, Math.min(12, mouse.rx * 12 * mult)),
            y: Math.max(-6,  Math.min(6,  mouse.ry * 6  * mult)),
            duration: 0.5,
            ease: 'power2.out',
            overwrite: true,
          });
        });
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    window.addEventListener('mousemove', onMove);
    section.addEventListener('mouseleave', onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  /* ── Hero parallax — desktop only ── */
  useEffect(() => {
    if (window.innerWidth < 768) return;
    gsap.registerPlugin(ScrollTrigger);

    let maxScroll = ScrollTrigger.maxScroll(window);
    const onResize = () => { maxScroll = ScrollTrigger.maxScroll(window); };
    window.addEventListener('resize', onResize);

    const els = document.querySelectorAll<HTMLElement>('[data-scroll-speed]');
    const triggers: ScrollTrigger[] = [];

    els.forEach((el) => {
      const speed = parseFloat(el.getAttribute('data-scroll-speed') || '1');
      const st = gsap.to(el, {
        y: () => (1 - speed) * maxScroll * 0.12,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      }).scrollTrigger;
      if (st) triggers.push(st);
    });

    return () => {
      window.removeEventListener('resize', onResize);
      triggers.forEach((st) => st.kill());
    };
  }, []);

  /* ── Reveal on mount ── */
  useEffect(() => {
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
    <section id="hero" ref={sectionRef} className={styles.hero} aria-labelledby="hero-heading">
      <div className="grid-stage">

        <p className={`section-label ${styles.sectionLabel}`} style={{ gridColumn: '1 / -1' }}>
          01 — HOME
        </p>

        {/* Clocks */}
        <div className={styles.clockEngine} data-scroll-speed="0.8">
          <div className={styles.clockCluster}>
            <span className={styles.clockCity}>Vancouver</span>
            <time ref={clockVanRef} className={styles.clockTime} dateTime="">00:00</time>
          </div>
          <div className={styles.clockCluster}>
            <span className={styles.clockCity}>Bangkok</span>
            <time ref={clockBkkRef} className={styles.clockTime} dateTime="">00:00</time>
          </div>
        </div>

        {/* Kinetic headline */}
        <h1 id="hero-heading" className={styles.headline} data-scroll-speed="1">
          {HEADLINE_LINES.map(({ text, accent, delay }, i) => (
            <span
              key={i}
              className={styles.lineWrap}
              ref={(el) => { lineRefs.current[i] = el; }}
            >
              <span
                className="reveal"
                style={{ '--reveal-delay': delay } as React.CSSProperties}
              >
                <span className="reveal__inner">
                  {accent ? <span className="t-accent">{text}</span> : text}
                </span>
              </span>
            </span>
          ))}
        </h1>

        {/* Registry tags */}
        <div className={styles.heroMeta} aria-label="Professional credentials" data-scroll-speed="0.6">
          <span className="t-registry"><strong>[ULC:]</strong> CORP. STRATEGY</span>
          <span className="t-registry"><strong>[ISO:]</strong> VICE CONVENER</span>
          <span className="t-registry"><strong>[REG: 08.YRS]</strong> COMPLIANCE</span>
        </div>

      </div>
    </section>
  );
}
