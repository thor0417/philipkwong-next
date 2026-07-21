import type { Metadata } from 'next';
import { AboutPageContent } from '@/components/About/AboutPageContent';
import { SubpageWithContact } from '@/components/CardScroll/SubpageWithContact';

export const metadata: Metadata = {
  title: 'Compliance Strategy Consultant ISO Standards',
  description:
    'Compliance strategy consultant with eight years in ISO standards development, provincial regulatory frameworks, QMS architecture, and commercialization.',
  alternates: {
    canonical: 'https://philipkwong.com/about',
  },
  openGraph: {
    title: 'Compliance Strategy Consultant ISO Standards | Philip Kwong',
    description:
      'Compliance strategy consultant with eight years in ISO standards development, provincial regulatory frameworks, QMS architecture, and commercialization.',
    url: 'https://philipkwong.com/about',
    siteName: 'Philip Kwong',
    type: 'profile',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compliance Strategy Consultant ISO Standards | Philip Kwong',
    description:
      'Compliance strategy consultant with eight years in ISO standards development, provincial regulatory frameworks, QMS architecture, and commercialization.',
  },
};

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Philip Kwong Consulting',
  url: 'https://philipkwong.com',
  // ProfessionalService is an Organization: it has a founder, not a provider.
  founder: { '@id': 'https://philipkwong.com/#person' },
  areaServed: ['Canada', 'International'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Consulting Services',
    itemListElement: [
      {
        '@type': 'Offer',
        name: 'Compliance',
        description:
          'Regulatory architecture, compliance frameworks, licensing pathways, quality management systems, and organizational governance.',
      },
      {
        '@type': 'Offer',
        name: 'Strategy',
        description:
          'Commercialization, market entry, stakeholder engagement, positioning, and long-term growth planning for regulated businesses.',
      },
      {
        '@type': 'Offer',
        name: 'Operations',
        description:
          'Project management, workflow architecture, documentation systems, training programs, and the business operations that scale infrastructure.',
      },
      {
        '@type': 'Offer',
        name: 'Growth',
        description:
          'Organizational transformation, go-to-market development, and the systems that turn ambitious ideas into enduring organizations.',
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <SubpageWithContact>
        <AboutPageContent />
      </SubpageWithContact>
    </>
  );
}
