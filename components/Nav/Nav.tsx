'use client';

import { useState, useEffect, useLayoutEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getLenis, useNavDark } from '@/providers/SmoothScrollProvider';
import styles from './Nav.module.css';

export function Nav() {
  const pathname = usePathname();
  const isHome    = pathname === '/';
  const isSubpage = !isHome;

  const isDark = useNavDark();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

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

  /* data-nav-open attribute — hides hero registry tags before opacity transition starts.
     useLayoutEffect fires before browser paint so the attribute is set on the same frame
     as .overlayOpen class, preventing the tags from showing through the transparent overlay. */
  useLayoutEffect(() => {
    if (isOverlayOpen) {
      document.documentElement.setAttribute('data-nav-open', 'true');
    } else {
      document.documentElement.removeAttribute('data-nav-open');
    }
    return () => { document.documentElement.removeAttribute('data-nav-open'); };
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
      <nav id="site-nav" className={navClass} aria-label="Primary navigation">
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
            <a
              href="#"
              className={styles.link}
              onClick={(e) => {
                e.preventDefault();
                if (document.documentElement.hasAttribute('data-panel-open')) {
                  document.dispatchEvent(new CustomEvent('nav-contact-click'));
                } else {
                  getLenis()?.scrollTo(document.body.scrollHeight);
                }
              }}
            >
              Contact
            </a>
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
            { href: '/about',    label: 'About'   },
            { href: '/work',     label: 'Work'    },
            { href: '/writing',  label: 'Writing' },
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
          <a
            href="#"
            className={styles.overlayLink}
            onClick={(e) => {
              e.preventDefault();
              setIsOverlayOpen(false);
              if (document.documentElement.hasAttribute('data-panel-open')) {
                document.dispatchEvent(new CustomEvent('nav-contact-click'));
              } else {
                getLenis()?.scrollTo(document.body.scrollHeight);
              }
            }}
          >
            Contact
          </a>
        </nav>

        <div className={styles.overlayMeta}>
          <span className="t-registry"><strong>[OPS: SYS]</strong> OPERATIONS</span>
          <span className="t-registry"><strong>[STD: INTL]</strong> STANDARDS</span>
          <span className="t-registry"><strong>[REG: 08.YRS]</strong> COMPLIANCE</span>
        </div>
      </div>
    </>
  );
}
