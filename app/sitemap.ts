import type { MetadataRoute } from 'next';
import { ARTICLES } from '@/lib/articles';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://philipkwong.com';

  const articles = ARTICLES.map(({ slug }) => ({
    url: `${base}/writing/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    { url: base,                  lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/writing`,     lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    ...articles,
  ];
}
