'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import styles from './Cursor.module.css';

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const isPointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!isPointer) return;

    dot.style.display = 'block';

    const onMove = (e: MouseEvent) => {
      gsap.set(dot, { x: e.clientX, y: e.clientY });
    };

    const onEnterInteractive = () => {
      gsap.to(dot, { width: 32, height: 32, marginLeft: -16, marginTop: -16, duration: 0.25, ease: 'power2.out' });
    };

    const onLeaveInteractive = () => {
      gsap.to(dot, { width: 10, height: 10, marginLeft: -5, marginTop: -5, duration: 0.25, ease: 'power2.out' });
    };

    const onEnterWorkEntry = () => {
      gsap.set(dot, { borderColor: '#B34700' });
    };

    const onLeaveWorkEntry = () => {
      gsap.set(dot, { borderColor: '#0A0A0A' });
    };

    document.addEventListener('mousemove', onMove);

    const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnterInteractive);
      el.addEventListener('mouseleave', onLeaveInteractive);
    });

    const workEntries = document.querySelectorAll('.work-entry');
    workEntries.forEach((el) => {
      el.addEventListener('mouseenter', onEnterWorkEntry);
      el.addEventListener('mouseleave', onLeaveWorkEntry);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
      });
      workEntries.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterWorkEntry);
        el.removeEventListener('mouseleave', onLeaveWorkEntry);
      });
    };
  }, []);

  return <div ref={dotRef} className={styles.cursor} aria-hidden="true" />;
}
