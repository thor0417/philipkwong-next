import type { Metadata } from 'next';
import { HomeClient } from '@/components/Home/HomeClient';

export const metadata: Metadata = {
  // Absolute: the root layout's title.template applies only to child segments,
  // not to this page, so the suffix must be written out in full here.
  title: { absolute: 'Regulatory Compliance Consultant Vancouver Bangkok | Philip Kwong' },
  description:
    'Regulatory compliance consultant working between Vancouver and Bangkok. ISO standards development, QMS architecture, and emerging regulated industries.',
  alternates: {
    canonical: 'https://philipkwong.com',
  },
  openGraph: {
    title: 'Regulatory Compliance Consultant Vancouver Bangkok | Philip Kwong',
    description:
      'Regulatory compliance consultant working between Vancouver and Bangkok. ISO standards development, QMS architecture, and emerging regulated industries.',
    url: 'https://philipkwong.com',
    siteName: 'Philip Kwong',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Regulatory Compliance Consultant Vancouver Bangkok | Philip Kwong',
    description:
      'Regulatory compliance consultant working between Vancouver and Bangkok. ISO standards development, QMS architecture, and emerging regulated industries.',
  },
};

export default function HomePage() {
  return <HomeClient />;
}
