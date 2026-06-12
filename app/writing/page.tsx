import type { Metadata } from 'next';
import { WritingPage } from '@/components/Writing/WritingPage';
import { SubpageWithContact } from '@/components/CardScroll/SubpageWithContact';

export const metadata: Metadata = {
  title: 'The Journal',
  description:
    'Articles by Philip Kwong on regulatory compliance, QMS architecture, corporate strategy, and market entry in regulated environments.',
  openGraph: {
    title: 'The Journal — Philip Kwong',
    description:
      'Articles on regulatory compliance, QMS architecture, corporate strategy, and market entry in regulated environments.',
    url: 'https://philipkwong.com/writing',
  },
  alternates: {
    canonical: 'https://philipkwong.com/writing',
  },
};

export default function WritingPageRoute() {
  return (
    <SubpageWithContact>
      <WritingPage />
    </SubpageWithContact>
  );
}
