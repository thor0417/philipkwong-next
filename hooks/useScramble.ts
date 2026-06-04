'use client';

import { useState, useEffect } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export function useScramble(finalText: string, delay: number = 0): string {
  const [display, setDisplay] = useState(finalText);

  useEffect(() => {
    const CHAR_DELAY = 40;
    const totalDuration = finalText.length * CHAR_DELAY + 120;
    let rafId: number;

    const timeoutId = setTimeout(() => {
      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;

        const result = finalText
          .split('')
          .map((char, i) => {
            if (elapsed >= i * CHAR_DELAY) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('');

        setDisplay(result);

        if (elapsed < totalDuration) {
          rafId = requestAnimationFrame(animate);
        } else {
          setDisplay(finalText);
        }
      };

      rafId = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return display;
}
