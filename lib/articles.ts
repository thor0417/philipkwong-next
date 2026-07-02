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
    slug: 'the-liability-transfer',
    title: 'The Liability Transfer',
    description: 'When AI-assisted professional work fails, the accountability does not transfer to the AI. It stays with the person who delivered the work and the organization that engaged them.',
    date: '2026-06-29',
    readTime: 6,
    category: 'TECHNOLOGY',
  },
  {
    slug: 'the-verification-problem',
    title: 'The Verification Problem',
    description: 'AI has decoupled the production of expert output from the expertise required to verify it. In high-stakes environments, that gap is the risk.',
    date: '2026-06-22',
    readTime: 6,
    category: 'TECHNOLOGY',
  },
  {
    slug: 'the-competence-illusion',
    title: 'The Competence Illusion',
    description: 'AI has made expertise look easy. In high-stakes environments, the gap between apparent and actual competence is the most expensive problem in business right now.',
    date: '2026-06-15',
    readTime: 6,
    category: 'TECHNOLOGY',
  },
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
