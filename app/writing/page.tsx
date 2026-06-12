import type { Metadata } from 'next';
import { WritingPage } from '@/components/Writing/WritingPage';
import { SubpageWithContact } from '@/components/CardScroll/SubpageWithContact';

export const metadata: Metadata = {
  title: 'The Journal',
  description:
    'Articles on regulatory compliance, quality management system architecture, technical standards development, and corporate strategy in regulated industries.',
  alternates: {
    canonical: 'https://philipkwong.com/writing',
  },
  openGraph: {
    title: 'The Journal — Philip Kwong',
    description:
      'Articles on regulatory compliance, quality management system architecture, technical standards development, and corporate strategy in regulated industries.',
    url: 'https://philipkwong.com/writing',
    siteName: 'Philip Kwong',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Journal — Philip Kwong',
    description:
      'Articles on regulatory compliance, QMS architecture, technical standards development, and corporate strategy in regulated industries.',
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
