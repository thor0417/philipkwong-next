import type { MetadataRoute } from 'next';
import { ARTICLES } from '@/lib/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://philipkwong.com';

  const articles = ARTICLES.map(({ slug, date }) => ({
    url: `${base}/writing/${slug}`,
    lastModified: new Date(date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Static dates: the last real content change to each surface route. Using
  // new Date() here would stamp build time and churn lastmod on every deploy.
  // Bump the relevant entry by hand when a route's visible content changes.
  return [
    { url: base,                lastModified: new Date('2026-07-23'), changeFrequency: 'monthly' as const, priority: 1.0 },
    { url: `${base}/about`,     lastModified: new Date('2026-07-23'), changeFrequency: 'yearly'  as const, priority: 0.8 },
    { url: `${base}/work`,      lastModified: new Date('2026-06-16'), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${base}/writing`,   lastModified: new Date('2026-07-15'), changeFrequency: 'monthly' as const, priority: 0.8 },
    ...articles,
  ];
}
