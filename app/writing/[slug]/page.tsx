import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ARTICLES } from '@/lib/articles';
import { getArticleContent } from '@/lib/getArticle';
import styles from './Article.module.css';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return ARTICLES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = ARTICLES.find((a) => a.slug === params.slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: `${article.title} — Philip Kwong`,
      description: article.description,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = ARTICLES.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const content = await getArticleContent(params.slug);

  return (
    <main className={styles.main}>
      <article className={styles.article}>
        <header className={styles.header}>
          <p className="section-label">{article.date} · {article.readTime} MIN READ</p>
          <h1 className={styles.title}>{article.title}</h1>
          <p className={styles.description}>{article.description}</p>
          <div className={styles.rule} aria-hidden="true" />
        </header>

        <div
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: content }}
        />

        <footer className={styles.footer}>
          <Link href="/writing" className={styles.back}>
            ← Writing
          </Link>
        </footer>
      </article>
    </main>
  );
}
