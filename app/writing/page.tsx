import type { Metadata } from 'next';
import { WritingPage } from '@/components/Writing/WritingPage';
import { SubpageWithContact } from '@/components/CardScroll/SubpageWithContact';

export const metadata: Metadata = {
  title: 'Compliance Strategy Articles',
  description:
    'Compliance strategy articles on regulatory architecture, quality management systems, technical standards development, and regulated market entry.',
  alternates: {
    canonical: 'https://philipkwong.com/writing',
  },
  openGraph: {
    title: 'Compliance Strategy Articles | Philip Kwong',
    description:
      'Compliance strategy articles on regulatory architecture, quality management systems, technical standards development, and regulated market entry.',
    url: 'https://philipkwong.com/writing',
    siteName: 'Philip Kwong',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compliance Strategy Articles | Philip Kwong',
    description:
      'Compliance strategy articles on regulatory architecture, quality management systems, technical standards development, and regulated market entry.',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',    item: 'https://philipkwong.com' },
    { '@type': 'ListItem', position: 2, name: 'Writing', item: 'https://philipkwong.com/writing' },
  ],
};

export default function WritingPageRoute() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SubpageWithContact>
        <WritingPage />
      </SubpageWithContact>
    </>
  );
}
