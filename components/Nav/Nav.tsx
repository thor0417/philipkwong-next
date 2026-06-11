'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getLenis } from '@/providers/SmoothScrollProvider';
import styles from './Nav.module.css';

export function Nav() {
  const pathname = usePathname();
  const isHome    = pathname === '/';
  const isSubpage = !isHome;

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
    isDark    ? styles.isDark    : '',
    isSubpage ? styles.isSubpage : '',
  ].filter(Boolean).join(' ');

  const isAboutActive   = pathname === '/about';
  const isWorkActive    = pathname?.startsWith('/work') ?? false;
  const isWritingActive = pathname?.startsWith('/writing') ?? false;

  return (
    <>
      <nav className={navClass} aria-label="Primary navigation">
        <Link href={isHome ? '#hero' : '/'} className={styles.wordmark}>
          Philip Kwong
        </Link>

        <ul className={styles.links} role="list">
          <li>
            <Link
              href="/about"
              className={styles.link}
              {...(isAboutActive ? { 'aria-current': 'page' as const } : {})}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/work"
              className={styles.link}
              {...(isWorkActive ? { 'aria-current': 'page' as const } : {})}
            >
              Work
            </Link>
          </li>
          <li>
            <Link
              href="/writing"
              className={styles.link}
              {...(isWritingActive ? { 'aria-current': 'page' as const } : {})}
            >
              Writing
            </Link>
          </li>
          <li>
            <Link href={isHome ? '#contact' : '/#contact'} className={styles.link}>
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
            { href: '/about',                    label: 'About'   },
            { href: '/work',                     label: 'Work'    },
            { href: '/writing',                  label: 'Writing' },
            { href: isHome ? '#contact' : '/#contact', label: 'Contact' },
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
