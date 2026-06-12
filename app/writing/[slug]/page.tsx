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
      <div className={styles.article}>
        <aside className={styles.meta}>
          <p className="section-label">{article.date}</p>
          <h1 className={styles.metaTitle}>{article.title}</h1>
          <span className="t-registry" style={{ display: 'block', marginBottom: '1rem' }}>
            <strong>[READ:]</strong> {article.readTime} MIN
          </span>
          <Link href="/writing" className={styles.back}>
            [ BACK TO WRITING ]
          </Link>
        </aside>
        <div
          className={styles.body}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </main>
  );
}
