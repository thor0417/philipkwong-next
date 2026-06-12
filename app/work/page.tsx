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

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://philipkwong.com' },
    { '@type': 'ListItem', position: 2, name: 'Work', item: 'https://philipkwong.com/work' },
  ],
};

const credentialsSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': 'https://philipkwong.com/#person',
  name: 'Philip Kwong',
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Standards Leadership',
      name: 'Vice Convener, ISO IWA 37-1 Working Group 1',
      description:
        'Vice Convener of Working Group 1 for ISO IWA 37-1, bringing together more than 200 participants representing 22 countries to establish an internationally recognized framework for cannabis safety, security, and sustainability.',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Standards Leadership',
      name: 'Chair, UL Canada TG 4400-2',
      description:
        "Chair of the committee responsible for Canada's first comprehensive safety guide governing cannabis extraction and processing facilities, covering hydrocarbon, ethanol, and CO2 extraction operations.",
    },
    {
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'Standards Membership',
      name: 'Standards Technical Panel Member, UL/ULC/ANSI/CAN/1389',
      description:
        'Member of the Standards Technical Panel responsible for the first harmonized Canada-United States safety standard governing plant oil extraction equipment. The completed standard was referenced within NFPA 1 and the International Fire Code.',
    },
  ],
};

export default function WorkPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(credentialsSchema) }} />
      <SubpageWithContact>
        <WorkPageContent />
      </SubpageWithContact>
    </>
  );
}
