'use client';

import { useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { CASES } from '@/lib/cases';
import styles from './CaseOverlay.module.css';

interface CaseOverlayProps {
  caseId: string | null;
  onClose: () => void;
}

export function CaseOverlay({ caseId, onClose }: CaseOverlayProps) {
  const overlayRef  = useRef<HTMLDivElement>(null);
  const topBarRef   = useRef<HTMLDivElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const activeTlRef = useRef<gsap.core.Timeline | null>(null);
  const isOpenRef   = useRef(false);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  const openOverlay = useCallback(() => {
    const overlay = overlayRef.current;
    if (!overlay || isOpenRef.current) return;
    isOpenRef.current = true;

    overlay.setAttribute('aria-hidden', 'false');
    overlay.classList.add(styles.isOpen);
    document.body.style.overflow = 'hidden';

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

  const data = caseId ? CASES[caseId] : null;

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      id="case-overlay"
      aria-hidden="true"
      role="dialog"
      aria-modal="true"
      aria-label="Case study"
      onClick={(e) => { if (e.target === overlayRef.current) closeOverlay(); }}
    >
      <div ref={topBarRef} className={styles.topBar}>
        <span className={styles.subsection}>{data?.subsection ?? ''}</span>
        <button className={styles.closeBtn} onClick={closeOverlay} aria-label="Close case study">
          [ CLOSE ]
        </button>
      </div>

      <div ref={contentRef} className={styles.content} id="case-content">
        <div className={styles.contentLeft}>
          <h2 className={styles.client}>{data?.client ?? ''}</h2>
          <div className={styles.rule} aria-hidden="true" />
          <p className={styles.editorial}>{data?.editorial ?? ''}</p>
          {data?.image && (
            <div className={styles.overlayImage}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.image} alt={data.client} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
