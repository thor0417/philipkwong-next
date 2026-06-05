'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getLenis } from '@/providers/SmoothScrollProvider';
import styles from './Nav.module.css';

export function Nav() {
  const pathname = usePathname();
  const isWritingPage = pathname?.startsWith('/writing') ?? false;
  const [isDark, setIsDark] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  /* Dark state — go dark when #card-work has scrolled past the nav (contact underlay exposed).
     Uses Lenis scroll event; falls back to native scroll on the first render cycle
     before Lenis has initialised. Re-runs on pathname changes. */
  useEffect(() => {
    const check = () => {
      const cardWork = document.getElementById('card-work');
      if (!cardWork) { setIsDark(false); return; }
      setIsDark(cardWork.getBoundingClientRect().bottom <= 80);
    };

    const lenis = getLenis();
    if (lenis) {
      lenis.on('scroll', check);
      check();
      return () => lenis.off('scroll', check);
    }

    // Lenis not yet initialised on this render cycle — use native scroll
    window.addEventListener('scroll', check, { passive: true });
    check();
    return () => window.removeEventListener('scroll', check);
  }, [pathname]);

  /* Escape key closes mobile nav */
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOverlayOpen) setIsOverlayOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOverlayOpen]);

  /* Body scroll lock when overlay is open */
  useEffect(() => {
    document.body.style.overflow = isOverlayOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOverlayOpen]);

  const navClass = [
    styles.nav,
    isDark ? styles.isDark : '',
    isWritingPage ? styles.isWritingPage : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      <nav className={navClass} aria-label="Primary navigation">
        <Link href={isWritingPage ? '/' : '#hero'} className={styles.wordmark}>
          Philip Kwong
        </Link>

        <ul className={styles.links} role="list">
          <li>
            <Link href={isWritingPage ? '/#about' : '#about'} className={styles.link}>
              About
            </Link>
          </li>
          <li>
            <Link href={isWritingPage ? '/#services' : '#services'} className={styles.link}>
              Services
            </Link>
          </li>
          <li>
            <Link href={isWritingPage ? '/#work' : '#work'} className={styles.link}>
              Work
            </Link>
          </li>
          <li>
            <Link
              href="/writing"
              className={styles.link}
              {...(isWritingPage ? { 'aria-current': 'page' as const } : {})}
            >
              Writing
            </Link>
          </li>
          <li>
            <Link href={isWritingPage ? '/#contact' : '#contact'} className={styles.link}>
              Contact
            </Link>
          </li>
        </ul>

        <button
          className={styles.trigger}
          aria-expanded={isOverlayOpen}
          aria-controls="nav-overlay"
          aria-label={isOverlayOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setIsOverlayOpen((v) => !v)}
        >
          {isOverlayOpen ? '[ CLOSE ]' : '[ MENU ]'}
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        id="nav-overlay"
        className={[styles.overlay, isOverlayOpen ? styles.overlayOpen : ''].join(' ')}
        aria-hidden={!isOverlayOpen}
        role="dialog"
        aria-label="Site navigation"
      >
        <nav aria-label="Mobile navigation">
          {[
            { href: isWritingPage ? '/#about' : '#about', label: 'About' },
            { href: isWritingPage ? '/#services' : '#services', label: 'Services' },
            { href: isWritingPage ? '/#work' : '#work', label: 'Work' },
            { href: '/writing', label: 'Writing' },
            { href: isWritingPage ? '/#contact' : '#contact', label: 'Contact' },
          ].map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className={styles.overlayLink}
              onClick={() => setIsOverlayOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className={styles.overlayMeta}>
          <span className="t-registry"><strong>[ULC: STRAT]</strong> CORP STRATEGY</span>
          <span className="t-registry"><strong>[ISO: VICE]</strong> CONVENER</span>
          <span className="t-registry"><strong>[REG: 08.YRS]</strong> COMPLIANCE</span>
        </div>
      </div>
    </>
  );
}
