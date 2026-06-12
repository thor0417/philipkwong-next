export interface Case {
  client: string;
  subsection: string;
  type: string;
  descriptors: string;
  significance: string;
  chips: string[];
  writeup: string;
  image?: string;
}

export interface WorkEntry {
  id: string;
  client: string;
  scope: string;
  tag: string;
  teaserLabel?: string;
}

export const CASES: Record<string, Case> = {
  'iso-iwa': {
    client: 'ISO IWA 37-1',
    subsection: 'STRATEGY AND STANDARDS',
    type: 'STANDARDS',
    descriptors: 'Vice Convener',
    significance: "One of the world's first international frameworks addressing cannabis safety, security, and sustainability.",
    chips: ['INTERNATIONAL WORKSHOP AGREEMENT', '22 COUNTRIES', '200+ PARTICIPANTS'],
    writeup: 'Served as Vice Convener of Working Group 1, bringing together more than 200 participants representing 22 countries to establish a globally recognized foundation for emerging legal cannabis markets. The resulting ISO IWA 37 series became an early reference for governments, regulators, and industry stakeholders developing cannabis regulatory infrastructure worldwide.',
  },
  'ul-canada-tg': {
    client: 'UL Canada TG 4400-2',
    subsection: 'STRATEGY AND STANDARDS',
    type: 'STANDARDS',
    descriptors: 'Chair',
    significance: "Canada's first comprehensive safety guide for cannabis extraction and processing facilities.",
    chips: ["CANADA'S FIRST", 'EXTRACTION SAFETY', 'NATIONAL REFERENCE'],
    writeup: 'Chaired the committee responsible for developing best practices for hydrocarbon, ethanol, and CO₂ extraction operations, facility design, and process safety. The guide became a foundational reference for regulators, engineers, fire officials, and operators across Canada.',
  },
  'ul-ulc': {
    client: 'UL/ULC/ANSI/CAN/1389',
    subsection: 'STRATEGY AND STANDARDS',
    type: 'STANDARDS',
    descriptors: 'STP Member',
    significance: 'The first harmonized Canada–United States safety standard governing plant oil extraction equipment.',
    chips: ['BI-NATIONAL STANDARD', 'FIRE & EXPLOSION SAFETY', 'NFPA REFERENCED'],
    writeup: 'Served on the Standards Technical Panel responsible for addressing fire, explosion, and worker safety risks associated with volatile extraction technologies. The completed standard was later referenced within NFPA 1 and the International Fire Code, influencing facility design and approval processes throughout North America.',
  },
  'ul-canada': {
    client: 'UL Canada',
    subsection: 'ENGAGEMENTS',
    type: 'STANDARDS',
    descriptors: 'Corporate Strategy Development',
    significance: "A unified certification and compliance platform built from UL's cannabis standards and regulatory initiatives.",
    chips: ['COMMERCIALIZATION', 'CERTIFICATION PLATFORM', 'DOMESTIC & INTL'],
    writeup: 'Architected the commercialization strategy behind One UL Cannabis. Developed the market strategy, stakeholder engagement model, certification framework, and industry positioning across domestic and international markets. The initiative established a scalable pathway for UL\'s continued leadership in cannabis safety, certification, and standards development.',
  },
  'bc-pharmacy': {
    client: 'BC Pharmacy Regulation',
    subsection: 'ENGAGEMENTS',
    type: 'STANDARDS',
    descriptors: 'Quality Management System - Regulatory Compliance - Documentation',
    significance: 'A province-wide quality management framework for British Columbia pharmacies entering a new regulatory era.',
    chips: ['PROVINCE-WIDE', 'PHARMACY REGULATION', 'ISO 9001 FRAMEWORK'],
    writeup: 'Architected governance, incident reporting, narcotics management, privacy, training, and operational controls aligned with ISO 9001 principles and directly mapped to provincial bylaws. The framework was designed to support implementation of multiple regulatory milestones under the Health Professions and Occupations Act and associated pharmacy legislation.',
  },
  'grant-leisure': {
    client: 'Grant Leisure International',
    subsection: 'ENGAGEMENTS',
    type: 'OPERATIONAL',
    descriptors: 'Brand Identity - Visual Systems - Digital Presence',
    significance: 'A digital and operational transformation for an international leisure consultancy operating across multiple jurisdictions.',
    chips: ['INTERNATIONAL', 'DIGITAL REBRAND', 'DIRECTOR APPOINTMENT'],
    writeup: 'Led the digital rebrand transformation, including redevelopment of corporate identity, digital infrastructure, and operational systems, and accepted the position of Director of Compliance and Business Operations. The result was a scalable operational platform designed to support long-term growth and international expansion.',
  },
  'ets': {
    client: 'ExtractionTek Stainless',
    subsection: 'ENGAGEMENTS',
    type: 'OPERATIONAL',
    descriptors: 'Market Entry - Regulatory Affairs - Government Relations',
    significance: 'The Canadian market entry of a Colorado-based hydrocarbon extraction manufacturer entering the legal cannabis sector.',
    chips: ['MARKET ENTRY', 'GOVERNMENT RELATIONS', 'NATIONAL ADOPTION'],
    writeup: 'Established regulatory affairs, government relations, sales infrastructure, and stakeholder engagement programs while working closely with regulators, engineers, fire officials, and authorities having jurisdiction. The engagement positioned ExtractionTek Stainless as one of the most widely recognized extraction equipment manufacturers operating in Canada.',
  },
  'organigram': {
    client: 'Organigram',
    subsection: 'ENGAGEMENTS',
    type: 'OPERATIONAL',
    descriptors: 'Regulatory Compliance - Operational Planning - Facility Development',
    significance: "Extraction facility infrastructure and operational compliance for one of Canada's leading publicly traded producers.",
    chips: ['PUBLIC PRODUCER', 'FACILITY INFRASTRUCTURE', 'FEDERALLY REGULATED'],
    writeup: 'Supported facility planning, workflow development, equipment sourcing, and regulatory compliance within a federally regulated production environment. The engagement supported the expansion of extraction and derivative manufacturing capabilities during a period of rapid industry growth.',
  },
  'embark': {
    client: 'Embark Health',
    subsection: 'ENGAGEMENTS',
    type: 'OPERATIONAL',
    descriptors: 'Regulatory Compliance - Operational Planning - Strategy Development',
    significance: 'Regulatory approvals and facility development for a cannabis operation serving domestic and international markets.',
    chips: ['FACILITY DEVELOPMENT', 'MUNICIPAL COMPLIANCE', 'FIRE CODE'],
    writeup: 'Led rezoning, permitting, fire code compliance, facility planning, and regulatory strategy development. The project established the foundation required for compliant operation within one of Canada\'s most highly regulated manufacturing sectors.',
  },
  'adastra': {
    client: 'Adastra Labs',
    subsection: 'ENGAGEMENTS',
    type: 'OPERATIONAL',
    descriptors: 'Regulatory Compliance - Operational Planning - Strategy Development',
    significance: 'Regulatory strategy and compliance architecture for an extraction-focused licensed producer in British Columbia.',
    chips: ['REGULATORY PATHWAY', 'MUNICIPAL APPROVALS', 'CONCEPT TO BUILD'],
    writeup: 'Led feasibility analysis, municipal approvals, rezoning support, facility planning, and regulatory pathway development from concept through implementation. The engagement established the operational and regulatory foundation required to support large-scale extraction and manufacturing activities.',
  },
  'aurora': {
    client: 'Aurora Cannabis',
    subsection: 'ENGAGEMENTS',
    type: 'OPERATIONAL',
    descriptors: 'SOP - Product Development - Regulatory Compliance - Operational Planning',
    significance: 'Aurora Sky: over 800,000 square feet, designed to produce more than 100,000 kilograms of cannabis annually.',
    chips: ['800,000 SQ FT', '100,000 KG/YEAR', 'INDUSTRIAL SCALE'],
    writeup: 'Supported extraction operations, product development, quality systems, manufacturing programs, workforce training, and facility operations during the scale-up of regulated cannabis production at industrial scale. The work contributed to the development of operational systems within a facility that helped define the early evolution of Canada\'s legal cannabis industry.',
  },
  'valens': {
    client: 'The Valens Company',
    subsection: 'ENGAGEMENTS',
    type: 'OPERATIONAL',
    descriptors: 'Operational Planning - Facility Development',
    significance: "Extraction infrastructure for one of Canada's largest cannabis extraction and manufacturing organizations.",
    chips: ['LARGE-SCALE EXTRACTION', 'EQUIPMENT DEPLOYMENT', 'NATIONAL SUPPLY'],
    writeup: 'Developed facility planning, equipment sourcing, installation oversight, and operational training to support large-scale production of cannabis oils and derivative products. The work contributed to extraction capabilities supplying licensed producers and consumer product manufacturers across Canada.',
  },
  'veritas': {
    client: 'Veritas Pharma',
    subsection: 'ENGAGEMENTS',
    type: 'OPERATIONAL',
    descriptors: 'Strategy - Go-to-Market Development - Project Management',
    significance: 'Cannabinoid research and development through Cannevert Therapeutics, a University of British Columbia research subsidiary.',
    chips: ['UBC RESEARCH', 'CLINICAL FOCUS', 'R&D PROGRAM'],
    writeup: 'Contributed to extraction program development, operational planning, and project management activities supporting ongoing cannabinoid research programs. The work helped advance research exploring the clinical and therapeutic potential of cannabis-derived compounds.',
  },
};

export const WORK_ENTRIES: { strategy: WorkEntry[]; engagements: WorkEntry[] } = {
  strategy: [
    { id: 'iso-iwa',      client: 'ISO IWA 37-1',          scope: 'WORKSHOP AGREEMENT', tag: 'VICE CONVENER', teaserLabel: 'VICE CONVENER' },
    { id: 'ul-canada-tg', client: 'UL Canada TG 4400-2',   scope: 'TECHNICAL GUIDE',    tag: 'CHAIR',         teaserLabel: 'CHAIR'         },
    { id: 'ul-ulc',       client: 'UL/ULC/ANSI/CAN/1389',  scope: 'SAFETY STANDARD',    tag: 'STP MEMBER'                                  },
  ],
  engagements: [
    { id: 'ul-canada',     client: 'UL Canada',                  scope: 'COMMERCIALIZATION',       tag: 'STRATEGY'                                          },
    { id: 'bc-pharmacy',   client: 'BC Pharmacy Regulation',      scope: 'QMS ARCHITECTURE',        tag: 'COMPLIANCE'                                        },
    { id: 'grant-leisure', client: 'Grant Leisure International',  scope: 'TRANSFORMATION',          tag: 'DIGITAL PRESENCE', teaserLabel: 'TRANSFORMATION'   },
    { id: 'aurora',        client: 'Aurora Cannabis',              scope: 'PRODUCTION SYSTEMS',      tag: 'COMPLIANCE',       teaserLabel: 'PRODUCTION SYSTEMS'},
    { id: 'ets',           client: 'ExtractionTek Stainless',      scope: 'MARKET ENTRY',            tag: 'REGULATORY AFFAIRS'                                },
    { id: 'valens',        client: 'The Valens Company',           scope: 'OPERATIONAL WORKFLOW',    tag: 'OPERATIONS'                                        },
    { id: 'organigram',    client: 'Organigram',                   scope: 'FACILITY INFRASTRUCTURE', tag: 'COMPLIANCE'                                        },
    { id: 'veritas',       client: 'Veritas Pharma',               scope: 'RESEARCH PROGRAM',        tag: 'STRATEGY'                                          },
    { id: 'embark',        client: 'Embark Health',                scope: 'FACILITY APPROVALS',      tag: 'COMPLIANCE'                                        },
    { id: 'adastra',       client: 'Adastra Labs',                 scope: 'REGULATORY PATHWAY',      tag: 'COMPLIANCE'                                        },
  ],
};
