export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: number;
}

export const ARTICLES: Article[] = [
  {
    slug: 'market-entry-in-regulated-environments',
    title: 'Market Entry in Regulated Southeast Asian Markets',
    description: 'What founders get wrong when expanding into Thailand, Vietnam, and the Philippines.',
    date: '2026',
    readTime: 5,
  },
  {
    slug: 'why-compliance-work-requires-strategy',
    title: 'Why Compliance Work Requires Strategy, Not Just Process',
    description: 'The difference between companies that get licensed and companies that scale.',
    date: '2026',
    readTime: 5,
  },
  {
    slug: 'qms-architecture-for-emerging-regulatory-frameworks',
    title: 'QMS Architecture for Emerging Regulatory Frameworks',
    description: 'Building quality management systems before the rules are finalized.',
    date: '2026',
    readTime: 5,
  },
];
