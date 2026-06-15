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
    default: 'Philip Kwong — Strategy and Compliance Consultant',
    template: '%s — Philip Kwong',
  },
  description:
    'Regulatory compliance and corporate strategy consultant with eight years in technical standards development, quality management systems, and market entry across Canadian and international jurisdictions. Vancouver and Bangkok.',
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
    title: 'Philip Kwong — Strategy and Compliance Consultant',
    description: 'Strategy and regulatory compliance consultant operating between Vancouver and Bangkok.',
    url: 'https://philipkwong.com',
    siteName: 'Philip Kwong',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Philip Kwong — Regulatory Compliance and Corporate Strategy Consultant',
    description: 'Regulatory compliance and corporate strategy consultant. Eight years in technical standards, QMS architecture, and market entry. Vancouver and Bangkok.',
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
                  'LINKEDIN_URL_PLACEHOLDER',
                ],
                knowsAbout: [
                  'Regulatory compliance',
                  'Technical standards development',
                  'Quality management systems',
                  'Market entry strategy',
                  'Commercialization',
                ],
                workLocation: [
                  { '@type': 'Place', name: 'Vancouver', addressCountry: 'CA' },
                  { '@type': 'Place', name: 'Bangkok', addressCountry: 'TH' },
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
