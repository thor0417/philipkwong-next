import styles from './CtaBand.module.css';

export default function CtaBand() {
  return (
    <section className={styles.band} data-theme="dark" aria-label="Engage">
      <div className="grid-stage">
        <span className={`section-label ${styles.label}`}>ENGAGE</span>
        <h2 className={styles.headline}>Start with twenty minutes.</h2>
        <a
          href="https://calendly.com/hello-philipkwong/introductory-call"
          target="_blank"
          rel="noopener"
          className={`t-registry ${styles.link}`}
        >
          [ <strong>BOOK</strong>: 20 MIN INTRO ]
        </a>
      </div>
    </section>
  );
}
