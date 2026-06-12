import type { Metadata } from 'next';
import './globals.css';
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
        <link rel="preload" href="/fonts/DharmaGothicE_Heavy_R.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/DharmaGothicE_ExBold_R.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/DMMono-Medium.ttf" as="font" type="font/truetype" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/PPNeueMontreal-Regular.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Philip Kwong',
              jobTitle: 'Strategy and Compliance Consultant',
              url: 'https://philipkwong.com',
              knowsAbout: [
                'Regulatory Compliance',
                'Corporate Strategy',
                'Market Entry',
                'Quality Management Systems',
                'Technical Standards',
                'Cannabis Regulation',
                'ISO Standards Development',
                'Pharmaceutical Regulation',
                'Health Professions Regulation',
                'Extraction Technology Compliance',
                'QMS Architecture',
                'Go-to-Market Strategy',
              ],
              workLocation: [
                { '@type': 'Place', name: 'Vancouver, Canada' },
                { '@type': 'Place', name: 'Bangkok, Thailand' },
              ],
            }),
          }}
        />
      </head>
      <body>
        <SmoothScrollProvider>
          <Nav />
          <PageTransition>{children}</PageTransition>
          <Cursor />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
