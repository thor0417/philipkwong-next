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

  return [
    { url: base,                lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 1.0 },
    { url: `${base}/about`,     lastModified: new Date(), changeFrequency: 'yearly'  as const, priority: 0.8 },
    { url: `${base}/work`,      lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${base}/writing`,   lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    ...articles,
  ];
}
