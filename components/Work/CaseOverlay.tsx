'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { CASES } from '@/lib/cases';
import { getLenis } from '@/providers/SmoothScrollProvider';
import styles from './CaseOverlay.module.css';

interface CaseOverlayProps {
  caseId: string | null;
  onClose: () => void;
}

export function CaseOverlay({ caseId, onClose }: CaseOverlayProps) {
  const overlayRef              = useRef<HTMLDivElement>(null);
  const topBarRef               = useRef<HTMLDivElement>(null);
  const contentRef              = useRef<HTMLDivElement>(null);
  const activeTlRef             = useRef<gsap.core.Timeline | null>(null);
  const isOpenRef               = useRef(false);
  const pendingContactScrollRef = useRef(false);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const openOverlay = useCallback(() => {
    const overlay = overlayRef.current;
    if (!overlay || isOpenRef.current) return;
    isOpenRef.current = true;

    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.add(styles.isOpen);
    document.body.style.overflow = 'hidden';
    document.documentElement.setAttribute('data-panel-open', 'true');
    getLenis()?.stop();

    if (activeTlRef.current) activeTlRef.current.kill();

    gsap.set([topBarRef.current, contentRef.current], { opacity: 0 });
    gsap.set(overlay, { y: '100%' });

    const duration = isMobile ? 0.4 : 0.6;
    activeTlRef.current = gsap.timeline()
      .to(overlay, { y: '0%', duration, ease: 'expo.out' })
      .to(
        [topBarRef.current, contentRef.current],
        { opacity: 1, duration: 0.35, stagger: 0.1, ease: 'power2.out' },
        '-=0.2'
      );
  }, [isMobile]);

  const closeOverlay = useCallback(() => {
    const overlay = overlayRef.current;
    if (!overlay || !isOpenRef.current) return;
    isOpenRef.current = false;

    if (activeTlRef.current) activeTlRef.current.kill();
    const duration = isMobile ? 0.35 : 0.5;

    activeTlRef.current = gsap.timeline()
      .to(
        [contentRef.current, topBarRef.current],
        { opacity: 0, duration: 0.2, stagger: 0.05, ease: 'power2.in' }
      )
      .to(
        overlay,
        {
          y: '100%', duration, ease: 'expo.in',
          onComplete: () => {
            overlay.classList.remove(styles.isOpen);
            overlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            document.documentElement.removeAttribute('data-panel-open');
            getLenis()?.start();
            if (pendingContactScrollRef.current) {
              pendingContactScrollRef.current = false;
              getLenis()?.scrollTo(document.body.scrollHeight);
            }
            onClose();
          },
        },
        '-=0.05'
      );
  }, [isMobile, onClose]);

  useEffect(() => {
    if (caseId) openOverlay();
    else closeOverlay();
  }, [caseId, openOverlay, closeOverlay]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpenRef.current) closeOverlay();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [closeOverlay]);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    let touchStartY = 0;

    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const onTouchMove  = (e: TouchEvent) => {
      if (!isOpenRef.current) return;
      if (e.touches[0].clientY - touchStartY > 80) closeOverlay();
    };

    overlay.addEventListener('touchstart', onTouchStart, { passive: true });
    overlay.addEventListener('touchmove',  onTouchMove,  { passive: true });

    return () => {
      overlay.removeEventListener('touchstart', onTouchStart);
      overlay.removeEventListener('touchmove',  onTouchMove);
    };
  }, [closeOverlay]);

  /* Nav CONTACT click while panel is open — close first, then scroll */
  useEffect(() => {
    const onNavContact = () => {
      if (!isOpenRef.current) return;
      pendingContactScrollRef.current = true;
      closeOverlay();
    };
    document.addEventListener('nav-contact-click', onNavContact);
    return () => document.removeEventListener('nav-contact-click', onNavContact);
  }, [closeOverlay]);

  const data = caseId ? CASES[caseId] : null;

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      id="case-overlay"
      data-theme="dark"
      aria-hidden="true"
      role="dialog"
      aria-modal="true"
      aria-label="Case study"
      onClick={(e) => { if (e.target === overlayRef.current) closeOverlay(); }}
    >
      {/* Drag handle — mobile only, sits in grid row 1 above top bar */}
      <div className={styles.dragHandle} aria-hidden="true" />

      {/* Top bar — grid row 2: subsection label left, close right */}
      <div ref={topBarRef} className={styles.topBar}>
        <span className={styles.subsection}>{data?.subsection ?? ''}</span>
        <button className={styles.closeBtn} onClick={closeOverlay} aria-label="Close case study">
          [ CLOSE ]
        </button>
      </div>

      {/* Content — vertical order per spec */}
      <div ref={contentRef} className={styles.content} id="case-content" data-lenis-prevent>

        {/* 1. Project name */}
        <h2 className={styles.client}>{data?.client ?? ''}</h2>

        {/* 2. Significance */}
        {data?.significance && (
          <p className={styles.significance}>{data.significance}</p>
        )}

        {/* 3. Chips */}
        {data?.chips && data.chips.some(c => c) && (
          <div className={styles.chips} aria-label="Project tags">
            {data.chips.map((chip, i) => (
              chip ? <span key={i} className={styles.chip}>{chip}</span> : null
            ))}
          </div>
        )}

        {/* 4. Role */}
        {data?.descriptors && (
          <div className={styles.roleLine}>
            <span className="t-registry">
              <strong>[ROLE:]</strong> {data.descriptors}
            </span>
          </div>
        )}

        {/* 5. Writeup */}
        {data?.writeup && (
          <p className={styles.writeup}>{data.writeup}</p>
        )}

      </div>
    </div>
  );
}
