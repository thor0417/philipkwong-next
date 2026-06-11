import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Philip Kwong is a regulatory compliance and corporate strategy consultant operating between Vancouver and Bangkok. Eight years across market entry, QMS architecture, technical standards, and executive engagement.',
  openGraph: {
    title: 'About — Philip Kwong',
    description:
      'Regulatory compliance and corporate strategy consultant operating between Vancouver and Bangkok.',
    url: 'https://philipkwong.com/about',
  },
  alternates: {
    canonical: 'https://philipkwong.com/about',
  },
};

export default function AboutPage() {
  return (
    <main>
      <section className={styles.page}>
        <div className="grid-stage">
          <p className="section-label" style={{ gridColumn: '1 / -1' }}>About</p>
          <h1 className={styles.heading} style={{ gridColumn: '1 / -1' }}>About.</h1>
        </div>
      </section>
    </main>
  );
}
