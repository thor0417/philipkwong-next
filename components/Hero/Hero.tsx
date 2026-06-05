'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useScramble } from '@/hooks/useScramble';
import styles from './Hero.module.css';

const SPRING_CFG = { stiffness: 150, damping: 15 };
const PROXIMITY  = 300;
const MAX_X      = 24;
const MAX_Y      = 12;

const HEADLINE_LINES = [
  { text: 'There Are',   multiplier: 1.0, accent: false },
  { text: 'No',          multiplier: 0.7, accent: true  },
  { text: 'Shortcuts.',  multiplier: 1.2, accent: false },
];

function ScrambledBracket({ text, delay }: { text: string; delay: number }) {
  const display = useScramble(text, delay);
  return <>{display}</>;
}

export function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const clockVanRef = useRef<HTMLTimeElement>(null);
  const clockBkkRef = useRef<HTMLTimeElement>(null);
  const lineRefs    = useRef<(HTMLElement | null)[]>([]);

  /* ── Per-line motion values ── */
  const mx0 = useMotionValue(0); const my0 = useMotionValue(0);
  const mx1 = useMotionValue(0); const my1 = useMotionValue(0);
  const mx2 = useMotionValue(0); const my2 = useMotionValue(0);
  const sx0 = useSpring(mx0, SPRING_CFG); const sy0 = useSpring(my0, SPRING_CFG);
  const sx1 = useSpring(mx1, SPRING_CFG); const sy1 = useSpring(my1, SPRING_CFG);
  const sx2 = useSpring(mx2, SPRING_CFG); const sy2 = useSpring(my2, SPRING_CFG);

  const springX = [sx0, sx1, sx2];
  const springY = [sy0, sy1, sy2];
  const motionX = [mx0, mx1, mx2];
  const motionY = [my0, my1, my2];

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

  /* ── Magnetic headline — desktop only ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.innerWidth < 768) return;

    const onMove = (e: MouseEvent) => {
      HEADLINE_LINES.forEach((line, i) => {
        const ref = lineRefs.current[i];
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const strength = Math.max(0, 1 - dist / PROXIMITY) * line.multiplier;
        motionX[i].set(dx * strength * (MAX_X / PROXIMITY));
        motionY[i].set(dy * strength * (MAX_Y / PROXIMITY));
      });
    };

    const onLeave = () => {
      motionX.forEach((mv) => mv.set(0));
      motionY.forEach((mv) => mv.set(0));
    };

    window.addEventListener('mousemove', onMove);
    section.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

        {/* Row 1: Clocks — Vancouver left, Bangkok right */}
        <div
          className={styles.clockRow}
          data-scroll-speed="0.8"
          style={{ gridColumn: '1 / -1' }}
        >
          <div className={styles.clockCluster}>
            <span className={styles.clockCity}>Vancouver</span>
            <time ref={clockVanRef} className={styles.clockTime} dateTime="">00:00</time>
          </div>
          <div className={styles.clockCluster}>
            <span className={styles.clockCity}>Bangkok</span>
            <time ref={clockBkkRef} className={styles.clockTime} dateTime="">00:00</time>
          </div>
        </div>

        {/* Row 2: Headline centered */}
        <h1
          id="hero-heading"
          className={styles.headline}
          data-scroll-speed="1"
          style={{ gridColumn: '1 / -1' }}
        >
          {HEADLINE_LINES.map(({ text, accent }, i) => (
            <motion.span
              key={i}
              className={styles.lineWrap}
              style={{ x: springX[i], y: springY[i] }}
              ref={(el) => { lineRefs.current[i] = el; }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                {accent ? <span className="t-accent">{text}</span> : text}
              </motion.span>
            </motion.span>
          ))}
        </h1>

        {/* Row 3: Registry tags horizontal */}
        <div
          className={styles.heroMeta}
          aria-label="Professional credentials"
          style={{ gridColumn: '1 / -1' }}
        >
          <span className="t-registry">
            <strong><ScrambledBracket text="[ULC:]" delay={0} /></strong> CORP. STRATEGY
          </span>
          <span className="t-registry">
            <strong><ScrambledBracket text="[ISO:]" delay={400} /></strong> VICE CONVENER
          </span>
          <span className="t-registry">
            <strong><ScrambledBracket text="[REG: 08.YRS]" delay={800} /></strong> COMPLIANCE
          </span>
        </div>

      </div>
    </section>
  );
}
