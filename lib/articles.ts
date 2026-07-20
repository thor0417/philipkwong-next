export interface Article {
  slug: string;
  /** Visible copy. Renders as the article H1, writing index entry, and overlay
   *  heading, and populates Article.headline and BreadcrumbList.name. */
  title: string;
  /** SEO title tag only — consumed by generateMetadata, never by schema or
   *  visible copy. Omit when `title` already leads with the target keyword. */
  seoTitle?: string;
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
    seoTitle: 'Compliance Foundation Problem in AI-Assisted Work',
    description: 'The compliance foundation problem: AI produces the outputs of expertise but not the foundation that makes those outputs reliable and defensible.',
    date: '2026-07-14',
    readTime: 6,
    category: 'TECHNOLOGY',
    series: 'competence-illusion',
  },
  {
    slug: 'the-due-diligence-failure',
    title: 'The Due Diligence Failure',
    seoTitle: 'Due Diligence Compliance Failure in Vetting',
    description: 'Due diligence compliance failure: vetting frameworks assumed expert output required expert competence. That assumption no longer holds in practice.',
    date: '2026-07-03',
    readTime: 7,
    category: 'TECHNOLOGY',
    series: 'competence-illusion',
  },
  {
    slug: 'the-liability-transfer',
    title: 'The Liability Transfer',
    seoTitle: 'Compliance Liability Transfer in AI-Assisted Work',
    description: 'Compliance liability transfer does not happen. When AI-assisted work fails, accountability stays with the person and organization that delivered it.',
    date: '2026-06-29',
    readTime: 6,
    category: 'TECHNOLOGY',
    series: 'competence-illusion',
  },
  {
    slug: 'the-verification-problem',
    title: 'The Verification Problem',
    seoTitle: 'Third Party Verification in Compliance Work',
    description: 'Third party verification in compliance: AI has decoupled producing expert output from the expertise required to verify it in high-stakes work.',
    date: '2026-06-22',
    readTime: 6,
    category: 'TECHNOLOGY',
    series: 'competence-illusion',
  },
  {
    slug: 'the-competence-illusion',
    title: 'The Competence Illusion',
    seoTitle: 'Compliance Competence Illusion in Consultants',
    description: 'The compliance competence illusion: AI made expert output easy to produce, widening the gap between apparent and actual competence in consultants.',
    date: '2026-06-15',
    readTime: 6,
    category: 'TECHNOLOGY',
    series: 'competence-illusion',
  },
  {
    slug: 'ai-in-regulated-business-operations',
    title: 'How AI Changes the Way Regulated Businesses Operate',
    seoTitle: 'AI Governance in Regulated Industry',
    description: 'AI governance in regulated industry: the practical implications for compliance, documentation, and operational decision-making under real scrutiny.',
    date: '2026-06-01',
    readTime: 5,
    category: 'TECHNOLOGY',
    series: 'compliance-architecture',
  },
  {
    slug: 'compliance-program-versus-compliance-architecture',
    title: 'The Difference Between a Compliance Program and a Compliance Architecture',
    seoTitle: 'Compliance Program vs Compliance Architecture',
    description: 'The compliance program architecture difference: a program answers what regulators are asking now, an architecture answers what they ask next.',
    date: '2026-05-22',
    readTime: 6,
    category: 'COMPLIANCE',
    series: 'compliance-architecture',
  },
  {
    slug: 'what-regulated-market-entry-actually-costs',
    title: 'What Regulated Market Entry Actually Costs',
    seoTitle: 'Regulated Market Entry Costs in Canada',
    description: 'Regulated market entry in Canada costs far more than the licensing fee. Timeline compression, operational build, and regulatory iteration drive it.',
    date: '2026-05-15',
    readTime: 7,
    category: 'STRATEGY',
    series: 'compliance-architecture',
  },
  {
    slug: 'why-compliance-work-requires-strategy',
    title: 'Why Compliance Work Requires Strategy, Not Just Process',
    seoTitle: 'Compliance Strategy Consulting for Regulated Firms',
    description: 'Compliance strategy consulting explains the difference between companies that get licensed and companies that scale after licensing is granted.',
    date: '2026-05-01',
    readTime: 5,
    category: 'COMPLIANCE',
    series: 'compliance-architecture',
  },
  {
    slug: 'qms-architecture-for-emerging-regulatory-frameworks',
    title: 'QMS Architecture for Emerging Regulatory Frameworks',
    // No seoTitle — visible title already leads with the target keyword.
    description: 'QMS architecture for emerging regulatory frameworks: how to build quality management systems before the rules are finalized and requirements settle.',
    date: '2026-04-01',
    readTime: 5,
    category: 'STANDARDS',
    series: 'compliance-architecture',
  },
];
