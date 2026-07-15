export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: number;
  category: string;
  series?: string;
}

export const ARTICLES: Article[] = [
  {
    slug: 'the-foundation-problem',
    title: 'The Foundation Problem',
    description: 'AI can produce the outputs of expertise. It cannot build the foundation that makes those outputs reliable. Understanding the difference is what separates organizations that use AI well from those accumulating risk they cannot see.',
    date: '2026-07-14',
    readTime: 6,
    category: 'TECHNOLOGY',
    series: 'competence-illusion',
  },
  {
    slug: 'the-due-diligence-failure',
    title: 'The Due Diligence Failure',
    description: 'The frameworks built to evaluate professional expertise were designed for a world where producing expert-quality output required expert-level competence. That world is gone.',
    date: '2026-07-03',
    readTime: 7,
    category: 'TECHNOLOGY',
    series: 'competence-illusion',
  },
  {
    slug: 'the-liability-transfer',
    title: 'The Liability Transfer',
    description: 'When AI-assisted professional work fails, the accountability does not transfer to the AI. It stays with the person who delivered the work and the organization that engaged them.',
    date: '2026-06-29',
    readTime: 6,
    category: 'TECHNOLOGY',
    series: 'competence-illusion',
  },
  {
    slug: 'the-verification-problem',
    title: 'The Verification Problem',
    description: 'AI has decoupled the production of expert output from the expertise required to verify it. In high-stakes environments, that gap is the risk.',
    date: '2026-06-22',
    readTime: 6,
    category: 'TECHNOLOGY',
    series: 'competence-illusion',
  },
  {
    slug: 'the-competence-illusion',
    title: 'The Competence Illusion',
    description: 'AI has made expertise look easy. In high-stakes environments, the gap between apparent and actual competence is the most expensive problem in business right now.',
    date: '2026-06-15',
    readTime: 6,
    category: 'TECHNOLOGY',
    series: 'competence-illusion',
  },
  {
    slug: 'ai-in-regulated-business-operations',
    title: 'How AI Changes the Way Regulated Businesses Operate',
    description: 'The practical implications for compliance, documentation, and operational decision-making.',
    date: '2026-06-01',
    readTime: 5,
    category: 'TECHNOLOGY',
    series: 'compliance-architecture',
  },
  {
    slug: 'compliance-program-versus-compliance-architecture',
    title: 'The Difference Between a Compliance Program and a Compliance Architecture',
    description: 'A compliance program answers the question regulators are currently asking. A compliance architecture answers the question they will ask next. Organizations that build programs rebuild them. Organizations that build architecture do not.',
    date: '2026-05-22',
    readTime: 6,
    category: 'COMPLIANCE',
    series: 'compliance-architecture',
  },
  {
    slug: 'what-regulated-market-entry-actually-costs',
    title: 'What Regulated Market Entry Actually Costs',
    description: 'The licensing fee is a fraction of what regulated market entry actually costs. The gap between projected and realized cost is structural, driven by timeline compression, operational build requirements, and regulatory iteration cycles.',
    date: '2026-05-15',
    readTime: 7,
    category: 'STRATEGY',
    series: 'compliance-architecture',
  },
  {
    slug: 'why-compliance-work-requires-strategy',
    title: 'Why Compliance Work Requires Strategy, Not Just Process',
    description: 'The difference between companies that get licensed and companies that scale.',
    date: '2026-05-01',
    readTime: 5,
    category: 'COMPLIANCE',
    series: 'compliance-architecture',
  },
  {
    slug: 'qms-architecture-for-emerging-regulatory-frameworks',
    title: 'QMS Architecture for Emerging Regulatory Frameworks',
    description: 'Building quality management systems before the rules are finalized.',
    date: '2026-04-01',
    readTime: 5,
    category: 'STANDARDS',
    series: 'compliance-architecture',
  },
];
