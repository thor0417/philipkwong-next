import type { Metadata } from 'next';
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider';
import { Nav } from '@/components/Nav/Nav';
import { Cursor } from '@/components/Cursor/Cursor';
import { PageTransition } from '@/components/PageTransition/PageTransition';

export const metadata: Metadata = {
  metadataBase: new URL('https://philipkwong.com'),
  title: {
    default: 'Regulatory Compliance Consultant Vancouver Bangkok | Philip Kwong',
    template: '%s | Philip Kwong',
  },
  description:
    'Regulatory compliance consultant working between Vancouver and Bangkok. Eight years in ISO standards development, QMS architecture, and market entry.',
  keywords: [
    'regulatory compliance',
    'corporate strategy',
    'market entry',
    'QMS',
    'cannabis regulation',
    'ISO standards',
    'Vancouver',
    'Bangkok',
  ],
  openGraph: {
    title: 'Regulatory Compliance Consultant Vancouver Bangkok | Philip Kwong',
    description: 'Regulatory compliance consultant working between Vancouver and Bangkok. Eight years in ISO standards development, QMS architecture, and market entry.',
    url: 'https://philipkwong.com',
    siteName: 'Philip Kwong',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Regulatory Compliance Consultant Vancouver Bangkok | Philip Kwong',
    description: 'Regulatory compliance consultant working between Vancouver and Bangkok. Eight years in ISO standards development, QMS architecture, and market entry.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Critical fonts — preloaded as WOFF2 for fastest delivery */}
        <link rel="preload" href="/fonts/DharmaGothicE_Heavy_R.woff2"  as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/DMMono-Medium.woff2"           as="font" type="font/woff2" crossOrigin="anonymous" />
        {/* Secondary fonts — preloaded */}
        <link rel="preload" href="/fonts/DharmaGothicE_ExBold_R.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/PPNeueYork-NormalRegular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Person',
                '@id': 'https://philipkwong.com/#person',
                name: 'Philip Kwong',
                jobTitle: 'Regulatory Compliance and Corporate Strategy Consultant',
                url: 'https://philipkwong.com',
                email: 'hello@philipkwong.com',
                sameAs: [
                  'https://www.bloomberg.com/profile/person/21197925',
                  'https://orcid.org/0000-0001-8920-5667',
                  'https://www.theglobeandmail.com/cannabis/article-the-oil-barons-of-cannabis-inside-the-illicit-but-lucrative-world-of/',
                  'https://www.healtheuropa.com/cannabis-extraction-2/91341/',
                  'https://engage.gov.bc.ca/app/uploads/sites/121/2018/08/Part-2-BC-Cannabis-Stakeholder-Submissions.pdf',
                  'https://www.vice.com/en/article/the-canadian-government-just-greenlit-dabs-sort-of/',
                  'https://www.marketscreener.com/insider/PHILIP-KWONG-A2F82H/network/',
                  'https://www.globenewswire.com/news-release/2018/09/05/1566021/0/en/Veritas-Welcomes-Exclusive-Marketing-Agreement-Between-3-Carbon-Extractions-and-ExtractionTek-Solutions.html',
                  'https://www.straight.com/life/1145391/industry-expert-local-extraction-whiz-philip-kwong-dishes-his-favourite-vancouver',
                  'https://www.cannacommerce.ca/about',
                  'https://www.asianamericansforcannabis.org/news/2020/3/6/aace-interview-philip-kwong',
                ],
                knowsAbout: [
                  'Regulatory compliance',
                  'Technical standards development',
                  'Quality management systems',
                  'Market entry strategy',
                  'Commercialization',
                ],
                workLocation: [
                  {
                    '@type': 'Place',
                    name: 'Vancouver',
                    // addressCountry belongs on PostalAddress, not directly on Place.
                    address: { '@type': 'PostalAddress', addressLocality: 'Vancouver', addressCountry: 'CA' },
                  },
                  {
                    '@type': 'Place',
                    name: 'Bangkok',
                    address: { '@type': 'PostalAddress', addressLocality: 'Bangkok', addressCountry: 'TH' },
                  },
                ],
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Philip Kwong',
                url: 'https://philipkwong.com',
              },
            ]),
          }}
        />
      </head>
      <body>
        <SmoothScrollProvider>
          <Nav />
          <PageTransition>{children}</PageTransition>
          <Cursor />
        </SmoothScrollProvider>
        <Analytics />
      </body>
    </html>
  );
}
