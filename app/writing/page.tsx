import type { Metadata } from 'next';
import { WritingIndex } from '@/components/Writing/WritingIndex';

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Articles by Philip Kwong on regulatory compliance, QMS architecture, corporate strategy, and market entry in regulated environments.',
  openGraph: {
    title: 'Writing — Philip Kwong',
    description:
      'Articles on regulatory compliance, QMS architecture, corporate strategy, and market entry in regulated environments.',
  },
};

export default function WritingPage() {
  return (
    <main>
      <WritingIndex />
    </main>
  );
}
