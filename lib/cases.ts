export interface Case {
  client: string;
  subsection: string;
  type: string;
  descriptors: string;
  editorial: string;
  image?: string;
}

export const CASES: Record<string, Case> = {
  'bc-pharmacy': {
    client: 'BC Pharmacy Regulation',
    subsection: 'ENGAGEMENTS',
    type: 'STANDARDS',
    descriptors: 'Quality Management System - Regulatory Compliance - Documentation',
    editorial: 'Architected an end-to-end Quality Management System and Standard Operating Procedures suite for British Columbia community pharmacies under the new Health Professions and Occupations Act framework. The suite covers governance, CIRCL incident reporting, narcotics and controlled substances, dispensing, staff training, records, privacy, and pharmacy operations. Every procedure is anchored to a specific bylaw section and structured under ISO 9001:2015 as a document architecture overlay, built to address three regulatory deadlines: HPOA and PODSA Bylaws (April 1, 2026), CIRCL (June 1, 2026), and SOR/2025-242 (October 1, 2026).',
  },
  'ul-canada': {
    client: 'UL Canada',
    subsection: 'ENGAGEMENTS',
    type: 'STANDARDS',
    descriptors: 'Corporate Strategy Development',
    editorial: 'Architected the commercialization strategy for One UL Cannabis, transforming UL\'s cannabis standards, technical guides, and international regulatory initiatives into a unified market-facing certification and compliance platform. Developed the national and international go-to-market strategy, certification framework, stakeholder engagement model, customer segmentation strategy, and industry value proposition spanning licensed producers, regulators, authorities having jurisdiction, and emerging legal cannabis markets. The initiative positioned UL to become a leading global authority in cannabis safety, certification, and standards-based compliance by leveraging its technical leadership across TG 4400-2, ANSI/CAN/UL/ULC 1389, and the ISO IWA 37 series.',
  },
  'ul-canada-tg': {
    client: 'UL Canada TG 4400-2',
    subsection: 'STRATEGY AND STANDARDS',
    type: 'STANDARDS',
    descriptors: 'Chair',
    editorial: 'Chaired the technical guide committee responsible for ULC TG-4400-2, Canada\'s first comprehensive safety guide for cannabis oil extraction and processing operations. The guide established best practices for hydrocarbon extraction, ethanol extraction, CO2 systems, post-processing, refinement, and distillation, providing regulators, fire officials, engineers, and operators with a unified framework for safe facility design and operation. The publication became a foundational reference for extraction facility compliance across Canada and later contributed to the development of international cannabis standards initiatives.',
  },
  'iso-iwa': {
    client: 'ISO IWA 37-1',
    subsection: 'STRATEGY AND STANDARDS',
    type: 'STANDARDS',
    descriptors: 'Vice Convener',
    editorial: 'Served as Vice Convener of Working Group 1 within ISO\'s first International Workshop Agreement on cannabis safety, security, and sustainability. The initiative brought together more than 200 participants representing 22 countries to establish a globally recognized framework for emerging legal cannabis markets. The resulting IWA 37 series became one of the first international reference documents for governments, regulators, and industry stakeholders developing cannabis regulatory infrastructure worldwide.',
  },
  'ul-ulc': {
    client: 'UL/ULC/ANSI/CAN/1389',
    subsection: 'STRATEGY AND STANDARDS',
    type: 'STANDARDS',
    descriptors: 'STP Member',
    editorial: 'Served on the Standards Technical Panel responsible for developing the first bi-national safety standard governing plant oil extraction equipment across Canada and the United States. The standard addressed critical fire, explosion, and worker safety risks associated with volatile extraction processes while providing manufacturers, regulators, and facility operators with a harmonized compliance framework. The completed standard was subsequently referenced within NFPA 1 and the International Fire Code, influencing extraction facility design and approval processes throughout North America.',
  },
  'grant-leisure': {
    client: 'Grant Leisure International',
    subsection: 'ENGAGEMENTS',
    type: 'OPERATIONAL',
    descriptors: 'Brand Identity - Visual Systems - Digital Presence',
    editorial: 'Led a comprehensive operational and brand transformation for a global leisure consultancy operating across multiple international markets. The engagement included redevelopment of corporate identity, digital infrastructure, operational systems, and business process architecture while serving as Director of Compliance and Business Operations. The project established a scalable operational framework aligned with the organization\'s long-term growth objectives.',
  },
  'aurora': {
    client: 'Aurora Cannabis',
    subsection: 'ENGAGEMENTS',
    type: 'OPERATIONAL',
    descriptors: 'SOP - Product Development - Regulatory Compliance - Operational Planning',
    editorial: 'Supported extraction operations, product development, quality systems, and manufacturing programs at Aurora Sky, one of the world\'s largest and most technologically advanced cannabis production facilities. The engagement included SOP architecture, extraction process development, occupational health and safety frameworks, facility operations support, and workforce training programs. Work contributed to the scale-up of regulated cannabis manufacturing during a pivotal period in the development of Canada\'s legal cannabis industry.',
  },
  'organigram': {
    client: 'Organigram',
    subsection: 'ENGAGEMENTS',
    type: 'OPERATIONAL',
    descriptors: 'Regulatory Compliance - Operational Planning - Facility Development',
    editorial: 'Designed extraction facility infrastructure and compliance programs for one of Canada\'s leading publicly traded licensed producers. Responsibilities included facility planning, equipment sourcing, operational workflow design, and health and safety compliance. The engagement supported the expansion of extraction and derivative product manufacturing capabilities within a federally regulated production environment.',
  },
  'valens': {
    client: 'The Valens Company',
    subsection: 'ENGAGEMENTS',
    type: 'OPERATIONAL',
    descriptors: 'Operational Planning - Facility Development',
    editorial: 'Designed extraction infrastructure, operational workflows, and equipment deployment programs for one of Canada\'s largest cannabis extraction and manufacturing organizations. The engagement included facility planning, equipment sourcing, installation oversight, and operational training to support large-scale production of cannabis oils and derivative products. Work contributed to the development of extraction capabilities that supplied licensed producers and consumer product manufacturers across Canada.',
  },
  'adastra': {
    client: 'Adastra Labs',
    subsection: 'ENGAGEMENTS',
    type: 'OPERATIONAL',
    descriptors: 'Regulatory Compliance - Operational Planning - Strategy Development',
    editorial: 'Developed regulatory strategy, facility design, and compliance architecture for an extraction-focused licensed producer in British Columbia. The engagement included feasibility analysis, municipal approvals, rezoning support, facility planning, and regulatory pathway development. Work established the operational and compliance foundation required to support large-scale cannabis extraction and manufacturing activities.',
  },
  'ets': {
    client: 'ExtractionTek Stainless',
    subsection: 'ENGAGEMENTS',
    type: 'OPERATIONAL',
    descriptors: 'Market Entry - Regulatory Affairs - Government Relations',
    editorial: 'Architected and executed the Canadian market entry strategy for ExtractionTek Stainless, a Colorado-based manufacturer of hydrocarbon extraction systems. Established the company\'s Canadian regulatory affairs function, government relations program, sales infrastructure, and national market development strategy while serving as the primary liaison between industry, regulators, and authorities having jurisdiction. Led engagement with fire officials, engineers, standards organizations, government stakeholders, and regulatory bodies across Canada to support the deployment and acceptance of extraction technologies within the emerging legal cannabis industry. The engagement established ExtractionTek as one of the most recognized and widely adopted extraction equipment manufacturers operating within Canada\'s legal cannabis sector.',
  },
  'veritas': {
    client: 'Veritas Pharma',
    subsection: 'ENGAGEMENTS',
    type: 'OPERATIONAL',
    descriptors: 'Strategy - Go-to-Market Development - Project Management',
    editorial: 'Provided strategic consulting to Cannevert Therapeutics, the University of British Columbia-based cannabis research subsidiary of Veritas Pharma Inc. The engagement supported extraction program development, operational planning, and project management activities within a research environment led by emeritus professors of pharmacology and anaesthesiology. Work contributed to the advancement of cannabinoid research initiatives focused on clinical and therapeutic applications.',
  },
  'embark': {
    client: 'Embark Health',
    subsection: 'ENGAGEMENTS',
    type: 'OPERATIONAL',
    descriptors: 'Regulatory Compliance - Operational Planning - Strategy Development',
    editorial: 'Led regulatory approvals, municipal compliance, and facility development programs for a cannabis extraction and manufacturing operation serving domestic and international markets. The engagement included rezoning, building and fire code compliance, facility design, and regulatory strategy development. Work established the framework required for compliant production within one of Canada\'s most highly regulated manufacturing sectors.',
  },
};

export const WORK_ENTRIES = {
  strategy: [
    { id: 'ul-canada-tg', client: 'UL Canada TG 4400-2',   scope: 'TECHNICAL GUIDE',  tag: 'CHAIR'         },
    { id: 'iso-iwa',      client: 'ISO IWA 37-1',           scope: 'INTL STANDARD',    tag: 'VICE CONVENER' },
    { id: 'ul-ulc',       client: 'UL/ULC/ANSI/CAN/1389',  scope: 'SAFETY STANDARDS', tag: 'STP MEMBER'    },
  ],
  engagements: [
    { id: 'bc-pharmacy',   client: 'BC Pharmacy Regulation',     scope: 'REGULATORY',    tag: 'COMPLIANCE'   },
    { id: 'ul-canada',     client: 'UL Canada',                  scope: 'ADVISORY',      tag: 'STRATEGY'     },
    { id: 'grant-leisure', client: 'Grant Leisure International', scope: 'DEPLOYMENT',    tag: 'OPERATIONS'   },
    { id: 'aurora',        client: 'Aurora Cannabis',             scope: 'QMS',           tag: 'COMPLIANCE'   },
    { id: 'organigram',    client: 'Organigram',                  scope: 'QMS',           tag: 'COMPLIANCE'   },
    { id: 'valens',        client: 'The Valens Company',          scope: 'FACILITY',      tag: 'OPERATIONS'   },
    { id: 'adastra',       client: 'Adastra Labs',                scope: 'LICENSING',     tag: 'COMPLIANCE'   },
    { id: 'ets',           client: 'ExtractionTek Stainless',     scope: 'NORTH AMERICA', tag: 'MARKET ENTRY' },
    { id: 'veritas',       client: 'Veritas Pharma',              scope: 'CORPORATE',     tag: 'STRATEGY'     },
    { id: 'embark',        client: 'Embark Health',               scope: 'LICENSING',     tag: 'COMPLIANCE'   },
  ],
};
