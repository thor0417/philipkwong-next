import type { Metadata } from 'next';
import { WorkPageContent } from '@/components/Work/WorkPageContent';
import { SubpageWithContact } from '@/components/CardScroll/SubpageWithContact';

export const metadata: Metadata = {
  title: 'Selected Work',
  description:
    'Standards leadership as Vice Convener of ISO IWA 37-1, Chair of UL Canada TG 4400-2, and STP Member of UL/ULC/ANSI/CAN/1389. Consulting engagements across cannabis, pharmaceutical, and technology sectors in Canada and internationally.',
  alternates: {
    canonical: 'https://philipkwong.com/work',
  },
  openGraph: {
    title: 'Selected Work — Philip Kwong',
    description:
      'Standards leadership and consulting engagements across regulatory compliance and corporate strategy. ISO IWA 37-1, UL Canada TG 4400-2, Aurora Cannabis, ExtractionTek Stainless, and more.',
    url: 'https://philipkwong.com/work',
    siteName: 'Philip Kwong',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Selected Work — Philip Kwong',
    description:
      'Standards leadership and consulting engagements: ISO IWA 37-1 Vice Convener, UL Canada TG 4400-2 Chair, and 10 consulting engagements across regulated industries.',
  },
};

export default function WorkPage() {
  return (
    <SubpageWithContact>
      <WorkPageContent />
    </SubpageWithContact>
  );
}
