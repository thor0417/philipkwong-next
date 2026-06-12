'use client';

import Link from 'next/link';
import styles from './Stamp.module.css';

interface StampProps {
  href: string;
  label: string;
  theme: 'dark' | 'light';
  'aria-label'?: string;
}

export function Stamp({ href, label, theme, 'aria-label': ariaLabel }: StampProps) {
  return (
    <Link
      href={href}
      className={`${styles.stamp} ${theme === 'dark' ? styles.dark : styles.light}`}
      aria-label={ariaLabel ?? label}
    >
      <span className={styles.label}>{label}</span>
    </Link>
  );
}
