import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ARTICLES } from '@/lib/articles';
import { getArticleContent } from '@/lib/getArticle';
import { SubpageWithContact } from '@/components/CardScroll/SubpageWithContact';
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

  // SEO title tag only. Never used for visible copy or JSON-LD — those stay on
  // article.title so the H1, Article.headline, and breadcrumb remain in sync.
  const seoTitle = article.seoTitle ?? article.title;

  return {
    title: seoTitle,
    description: article.description,
    alternates: {
      canonical: `https://philipkwong.com/writing/${article.slug}`,
    },
    openGraph: {
      title: `${seoTitle} | Philip Kwong`,
      description: article.description,
      url: `https://philipkwong.com/writing/${article.slug}`,
      siteName: 'Philip Kwong',
      type: 'article',
      publishedTime: article.date,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${seoTitle} | Philip Kwong`,
      description: article.description,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const article = ARTICLES.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const content = await getArticleContent(params.slug);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    url: `https://philipkwong.com/writing/${article.slug}`,
    author: { '@id': 'https://philipkwong.com/#person' },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',    item: 'https://philipkwong.com' },
      { '@type': 'ListItem', position: 2, name: 'Writing', item: 'https://philipkwong.com/writing' },
      { '@type': 'ListItem', position: 3, name: article.title, item: `https://philipkwong.com/writing/${article.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SubpageWithContact>
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
    </SubpageWithContact>
    </>
  );
}
