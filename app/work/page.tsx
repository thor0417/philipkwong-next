import type { Metadata } from 'next';
import { WorkPageContent } from '@/components/Work/WorkPageContent';

export const metadata: Metadata = {
  title: 'Selected Work',
  description:
    'Philip Kwong\'s record across standards leadership and consulting engagements — including ISO IWA 37-1, UL Canada TG 4400-2, and regulatory strategy for companies across the cannabis, pharmaceutical, and technology sectors.',
  openGraph: {
    title: 'Selected Work — Philip Kwong',
    description:
      'Standards leadership and consulting engagements across regulatory compliance and corporate strategy.',
    url: 'https://philipkwong.com/work',
  },
  alternates: {
    canonical: 'https://philipkwong.com/work',
  },
};

export default function WorkPage() {
  return (
    <main>
      <WorkPageContent />
    </main>
  );
}
