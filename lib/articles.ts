export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: number;
  category: string;
}

export const ARTICLES: Article[] = [
  {
    slug: 'ai-in-regulated-business-operations',
    title: 'How AI Changes the Way Regulated Businesses Operate',
    description: 'The practical implications for compliance, documentation, and operational decision-making.',
    date: '2026-06-01',
    readTime: 5,
    category: 'TECHNOLOGY',
  },
  {
    slug: 'why-compliance-work-requires-strategy',
    title: 'Why Compliance Work Requires Strategy, Not Just Process',
    description: 'The difference between companies that get licensed and companies that scale.',
    date: '2026-05-01',
    readTime: 5,
    category: 'COMPLIANCE',
  },
  {
    slug: 'qms-architecture-for-emerging-regulatory-frameworks',
    title: 'QMS Architecture for Emerging Regulatory Frameworks',
    description: 'Building quality management systems before the rules are finalized.',
    date: '2026-04-01',
    readTime: 5,
    category: 'STANDARDS',
  },
];
