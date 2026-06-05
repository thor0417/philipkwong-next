'use client';

import { useEffect, useRef, useCallback, useState } from 'react';
import { gsap } from 'gsap';
import { Article } from '@/lib/articles';
import { getLenis } from '@/providers/SmoothScrollProvider';
import styles from './ArticleOverlay.module.css';

interface ArticleOverlayProps {
  article: Article | null;
  onClose: () => void;
}

export function ArticleOverlay({ article, onClose }: ArticleOverlayProps) {
  const overlayRef  = useRef<HTMLDivElement>(null);
  const topBarRef   = useRef<HTMLDivElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const activeTlRef = useRef<gsap.core.Timeline | null>(null);
  const isOpenRef   = useRef(false);
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading]         = useState(false);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  /* Fetch article content when slug changes */
  useEffect(() => {
    if (!article) return;
    setLoading(true);
    setHtmlContent('');
    fetch(`/api/article/${article.slug}`)
      .then((r) => r.json())
      .then((d: { content: string }) => {
        setHtmlContent(d.content);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [article?.slug]); // eslint-disable-line react-hooks/exhaustive-deps

  const openOverlay = useCallback(() => {
    const overlay = overlayRef.current;
    if (!overlay || isOpenRef.current) return;
    isOpenRef.current = true;

    getLenis()?.stop();

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
            getLenis()?.start();
            onClose();
          },
        },
        '-=0.05'
      );
  }, [isMobile, onClose]);

  useEffect(() => {
    if (article) openOverlay();
    else closeOverlay();
  }, [article, openOverlay, closeOverlay]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpenRef.current) closeOverlay();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [closeOverlay]);

  /* Prevent Lenis from intercepting wheel events over the content div.
     Lenis calls e.preventDefault() before checking isStopped, so stop()
     alone is not enough — stopping propagation here keeps events native. */
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const stopWheel = (e: WheelEvent) => e.stopPropagation();
    content.addEventListener('wheel', stopWheel);
    return () => content.removeEventListener('wheel', stopWheel);
  }, []);

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

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      id="article-overlay"
      aria-hidden="true"
      role="dialog"
      aria-modal="true"
      aria-label={article?.title ?? 'Article'}
      onClick={(e) => { if (e.target === overlayRef.current) closeOverlay(); }}
    >
      <div ref={topBarRef} className={styles.topBar}>
        <span className={styles.category}>{article?.category ?? ''}</span>
        <button className={styles.closeBtn} onClick={closeOverlay} aria-label="Close article">
          [ CLOSE ]
        </button>
      </div>

      <div ref={contentRef} className={styles.content}>
        <h2 className={styles.title}>{article?.title ?? ''}</h2>
        <div className={styles.rule} aria-hidden="true" />
        {loading && <p className={styles.loadingMsg}>Loading...</p>}
        {!loading && htmlContent && (
          <div
            className={styles.body}
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        )}
      </div>
    </div>
  );
}
