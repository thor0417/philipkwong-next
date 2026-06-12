import type { Metadata } from 'next';
import { HomeClient } from '@/components/Home/HomeClient';

export const metadata: Metadata = {
  description:
    'Regulatory compliance and corporate strategy consultant with eight years in technical standards development, quality management systems, and market entry across Canadian and international jurisdictions. Vancouver and Bangkok.',
  alternates: {
    canonical: 'https://philipkwong.com',
  },
  openGraph: {
    title: 'Philip Kwong — Regulatory Compliance and Corporate Strategy Consultant',
    description:
      'Regulatory compliance and corporate strategy consultant with eight years in technical standards development, quality management systems, and market entry across Canadian and international jurisdictions. Vancouver and Bangkok.',
    url: 'https://philipkwong.com',
    siteName: 'Philip Kwong',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Philip Kwong — Regulatory Compliance and Corporate Strategy Consultant',
    description:
      'Regulatory compliance and corporate strategy consultant. Eight years in technical standards, QMS architecture, and market entry. Vancouver and Bangkok.',
  },
};

export default function HomePage() {
  return <HomeClient />;
}
