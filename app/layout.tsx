import type { Metadata } from 'next';
import './globals.css';
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider';
import { Nav } from '@/components/Nav/Nav';
import { Cursor } from '@/components/Cursor/Cursor';

export const metadata: Metadata = {
  metadataBase: new URL('https://philipkwong.com'),
  title: {
    default: 'Philip Kwong — Strategy & Compliance Consultant',
    template: '%s — Philip Kwong',
  },
  description:
    'Philip Kwong is a strategy and regulatory compliance consultant operating between Vancouver and Bangkok. Specializing in market entry, QMS architecture, technical standards, and corporate strategy.',
  keywords: [
    'regulatory compliance consultant',
    'corporate strategy consultant',
    'market entry ASEAN',
    'QMS architecture',
    'cannabis regulation',
    'ISO standards',
    'Vancouver consultant',
    'Bangkok consultant',
    'Southeast Asia market entry',
  ],
  openGraph: {
    type: 'website',
    url: 'https://philipkwong.com',
    title: 'Philip Kwong — Strategy & Compliance Consultant',
    description:
      'Philip Kwong is a strategy and regulatory compliance consultant operating between Vancouver and Bangkok.',
    siteName: 'Philip Kwong',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Philip Kwong — Strategy & Compliance Consultant',
    description:
      'Strategy and regulatory compliance consulting between Vancouver and Bangkok.',
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
        {/* Preload critical fonts */}
        <link rel="preload" href="/fonts/DharmaGothicE_Heavy_R.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/DharmaGothicE_ExBold_R.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/DMMono-Medium.ttf" as="font" type="font/truetype" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/PPNeueMontreal-Regular.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        {/* Schema markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Philip Kwong',
              jobTitle: 'Strategy & Compliance Consultant',
              url: 'https://philipkwong.com',
              knowsAbout: [
                'Regulatory Compliance',
                'Corporate Strategy',
                'Market Entry',
                'Quality Management Systems',
                'Technical Standards',
                'Cannabis Regulation',
                'ASEAN Market Entry',
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
          {children}
          <Cursor />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
