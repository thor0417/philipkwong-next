import type { Metadata } from 'next';
import { WorkPageContent } from '@/components/Work/WorkPageContent';
import { SubpageWithContact } from '@/components/CardScroll/SubpageWithContact';

export const metadata: Metadata = {
  title: 'International Standards Development Consultant ISO',
  description:
    'International standards development consultant. Vice Convener of ISO IWA 37-1, Chair of UL Canada TG 4400-2, and STP member of ANSI/CAN/UL 1389.',
  alternates: {
    canonical: 'https://philipkwong.com/work',
  },
  openGraph: {
    title: 'International Standards Development Consultant ISO | Philip Kwong',
    description:
      'International standards development consultant. Vice Convener of ISO IWA 37-1, Chair of UL Canada TG 4400-2, and STP member of ANSI/CAN/UL 1389.',
    url: 'https://philipkwong.com/work',
    siteName: 'Philip Kwong',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'International Standards Development Consultant ISO | Philip Kwong',
    description:
      'International standards development consultant. Vice Convener of ISO IWA 37-1, Chair of UL Canada TG 4400-2, and STP member of ANSI/CAN/UL 1389.',
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
