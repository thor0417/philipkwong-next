'use client';

import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Contact.module.css';

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.innerWidth < 768) return;
    gsap.registerPlugin(ScrollTrigger);

    const cta = document.querySelector<HTMLElement>('.contact-cta');
    if (cta) {
      gsap.fromTo(cta,
        { y: 8 },
        { y: 0, ease: 'none', scrollTrigger: { trigger: cta, start: 'top 85%', end: 'top 55%', scrub: 0.8 } }
      );
    }
  }, []);

  const handleSubmit = async () => {
    const name    = (document.getElementById('field-name')    as HTMLInputElement)?.value.trim();
    const email   = (document.getElementById('field-email')   as HTMLInputElement)?.value.trim();
    const company = (document.getElementById('field-company') as HTMLInputElement)?.value.trim();
    const message = (document.getElementById('field-message') as HTMLTextAreaElement)?.value.trim();

    if (!name || !email || !message) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    setStatus('sending');

    try {
      const res = await fetch('https://formspree.io/f/xdaypbrk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, company, message }),
      });

      if (res.ok) {
        setStatus('sent');
        (document.getElementById('field-name')    as HTMLInputElement).value    = '';
        (document.getElementById('field-email')   as HTMLInputElement).value    = '';
        (document.getElementById('field-company') as HTMLInputElement).value    = '';
        (document.getElementById('field-message') as HTMLTextAreaElement).value = '';
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const btnLabel = {
    idle:    'Send',
    sending: 'Sending...',
    sent:    'Sent.',
    error:   'Error — try again',
  }[status];

  return (
    <section id="contact" className={styles.contact} data-theme="dark" aria-labelledby="contact-heading">
      <div className="grid-stage">

        <h2
          id="contact-heading"
          className={`contact-cta reveal ${styles.cta}`}
          style={{ gridColumn: '1 / 6' }}
        >
          <span className="reveal__inner">Let&apos;s talk.</span>
        </h2>

        <a
          href="https://calendly.com/hello-philipkwong/introductory-call"
          target="_blank"
          rel="noopener"
          className={`t-registry ${styles.bookLink}`}
        >
          [ <strong>BOOK</strong>: 20 MIN INTRO ]
        </a>

        <div className={styles.form} style={{ gridColumn: '7 / 13' }}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="field-name">Name</label>
            <input
              className={styles.input}
              type="text"
              id="field-name"
              name="name"
              autoComplete="name"
              placeholder="Your name"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="field-email">Email</label>
            <input
              className={styles.input}
              type="email"
              id="field-email"
              name="email"
              autoComplete="email"
              placeholder="Your email"
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="field-company">Company</label>
            <input
              className={styles.input}
              type="text"
              id="field-company"
              name="company"
              autoComplete="organization"
              placeholder="Your company"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="field-message">Message</label>
            <textarea
              className={styles.textarea}
              id="field-message"
              name="message"
              rows={4}
              placeholder="Your message"
            />
          </div>

          <button
            type="button"
            className={styles.submit}
            disabled={status === 'sending'}
            onClick={handleSubmit}
          >
            {btnLabel ?? 'Send'}
          </button>
        </div>

      </div>
    </section>
  );
}
