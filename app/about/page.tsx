import type { Metadata } from 'next';
import { AboutPageContent } from '@/components/About/AboutPageContent';

export const metadata: Metadata = {
  title: 'The Operator',
  description:
    'Philip Kwong — regulatory compliance and corporate strategy consultant. Eight years at the intersection of technical standards, quality systems, and organizational strategy. Vancouver and Bangkok.',
  openGraph: {
    title: 'The Operator — Philip Kwong',
    description:
      'Regulatory compliance and corporate strategy at the intersection of technical standards, quality systems, and organizational strategy.',
    url: 'https://philipkwong.com/about',
  },
  alternates: {
    canonical: 'https://philipkwong.com/about',
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
