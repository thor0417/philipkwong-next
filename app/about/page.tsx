import type { Metadata } from 'next';
import { AboutPageContent } from '@/components/About/AboutPageContent';
import { SubpageWithContact } from '@/components/CardScroll/SubpageWithContact';

export const metadata: Metadata = {
  title: 'The Operator',
  description:
    'Eight years at the intersection of ISO standards development, provincial regulatory frameworks, QMS architecture, and commercialization strategy. Engagements across cannabis, pharmaceutical, and technology sectors in Canada.',
  alternates: {
    canonical: 'https://philipkwong.com/about',
  },
  openGraph: {
    title: 'The Operator — Philip Kwong',
    description:
      'Eight years at the intersection of ISO standards development, provincial regulatory frameworks, QMS architecture, and commercialization strategy.',
    url: 'https://philipkwong.com/about',
    siteName: 'Philip Kwong',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Operator — Philip Kwong',
    description:
      'Eight years at the intersection of ISO standards development, provincial regulatory frameworks, QMS architecture, and commercialization strategy.',
  },
};

export default function AboutPage() {
  return (
    <SubpageWithContact>
      <AboutPageContent />
    </SubpageWithContact>
  );
}
