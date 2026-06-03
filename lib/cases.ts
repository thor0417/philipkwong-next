export interface Case {
  client: string;
  subsection: string;
  type: string;
  descriptors: string;
  editorial: string;
}

export const CASES: Record<string, Case> = {
  'bc-pharmacy': {
    client: 'BC Pharmacy Regulation',
    subsection: 'STRATEGY & STANDARDS',
    type: 'STANDARDS',
    descriptors: 'Quality Management System · Regulatory Compliance · Documentation',
    editorial: 'Architected the first end-to-end Quality Management System and Standard Operating Procedures suite for British Columbia community pharmacies under the new Health Professions and Occupations Act framework. The 97-document suite covers governance, CIRCL incident reporting, narcotics and controlled substances, dispensing, staff training, records, privacy, and pharmacy operations. Every procedure is anchored to a specific bylaw section and structured under ISO 9001:2015 as a document architecture overlay, built to address three regulatory deadlines: HPOA and PODSA Bylaws (April 1, 2026), CIRCL (June 1, 2026), and SOR/2025-242 (October 1, 2026).',
  },
  'ul-canada': {
    client: 'UL Canada',
    subsection: 'STRATEGY & STANDARDS',
    type: 'STANDARDS',
    descriptors: 'Corporate Strategy Development',
    editorial: 'Corporate strategy development for the Canadian national standards body.',
  },
  'ul-canada-tg': {
    client: 'UL Canada TG 4400-2',
    subsection: 'STRATEGY & STANDARDS',
    type: 'STANDARDS',
    descriptors: 'Chair',
    editorial: 'Chaired the technical guide committee responsible for ULC TG-44002, the first Canadian safety guide covering cannabis oil extraction processes including hydrocarbon, alcohol, CO2, post-processing refinement, and distillation. The guide established best practices that became the foundation for extraction facility compliance across Canada.',
  },
  'iso-iwa': {
    client: 'ISO IWA 37-1',
    subsection: 'STRATEGY & STANDARDS',
    type: 'STANDARDS',
    descriptors: 'Vice Convener',
    editorial: "Vice Convener of Working Group 1 within ISO's first international workshop on cannabis safety, security, and sustainability. The workshop drew over 200 participants from 22 countries. The resulting three-part IWA 37 series became the global blueprint for countries building legal cannabis market infrastructure.",
  },
  'ul-ulc': {
    client: 'UL/ULC/ANSI/CAN/1389',
    subsection: 'STRATEGY & STANDARDS',
    type: 'STANDARDS',
    descriptors: 'STP Member',
    editorial: 'STP member on the standards technical panel that developed the first bi-national safety standard for plant oil extraction equipment across the US and Canada. The standard addressed fire, explosion, and injury risks that had sent workers to hospital and created regulatory uncertainty across North America. Referenced in NFPA 1 and the International Fire Code.',
  },
  'grant-leisure': {
    client: 'Grant Leisure International',
    subsection: 'ENGAGEMENTS',
    type: 'OPERATIONAL',
    descriptors: 'Brand Identity · Visual Systems · Digital Presence',
    editorial: 'Comprehensive brand and digital rebuild for a global leisure consultancy. Visual identity, asset architecture, and digital presence redesigned and delivered across the full engagement.',
  },
  'aurora': {
    client: 'Aurora Cannabis',
    subsection: 'ENGAGEMENTS',
    type: 'OPERATIONAL',
    descriptors: 'SOP · Product Development · Regulatory Compliance · Operational Planning',
    editorial: "Embedded across product development and compliance for one of Canada's largest licensed producers. SOP development, extraction facility design, health and safety frameworks, and staff training programs across a three-year engagement.",
  },
  'organigram': {
    client: 'Organigram',
    subsection: 'ENGAGEMENTS',
    type: 'OPERATIONAL',
    descriptors: 'Regulatory Compliance · Operational Planning · Facility Development',
    editorial: 'Extraction facility design, equipment sourcing, and health and safety compliance for a publicly traded national licensed producer.',
  },
  'valens': {
    client: 'The Valens Company',
    subsection: 'ENGAGEMENTS',
    type: 'OPERATIONAL',
    descriptors: 'Operational Planning · Facility Development',
    editorial: 'Equipment sourcing, extraction floorplan design, installation, and operational training for a cannabis manufacturing company operating across Canada.',
  },
  'adastra': {
    client: 'Adastra Labs',
    subsection: 'ENGAGEMENTS',
    type: 'OPERATIONAL',
    descriptors: 'Regulatory Compliance · Operational Planning · Strategy Development',
    editorial: 'Feasibility strategy, facility design, rezoning assistance, and compliance architecture for an extraction-focused licensed producer in British Columbia.',
  },
  'ets': {
    client: 'ExtractionTek Stainless',
    subsection: 'ENGAGEMENTS',
    type: 'OPERATIONAL',
    descriptors: 'Market Entry · Regulatory Affairs · Government Relations',
    editorial: 'Built the Canadian market entry for a Colorado-based industrial equipment manufacturer. Regulatory affairs, government relations, and full Canadian sales division established.',
  },
  'veritas': {
    client: 'Veritas Pharma',
    subsection: 'ENGAGEMENTS',
    type: 'OPERATIONAL',
    descriptors: 'Strategy · Go-to-Market Development · Project Management',
    editorial: "Consulting engagement supporting Cannevert Therapeutics Ltd., the UBC-based cannabis research subsidiary of publicly traded Veritas Pharma Inc. Cannevert operates as an academic incubator staffed by emeritus professors of pharmacology and anaesthesiology from the University of British Columbia. Work focused on extraction strategy, operational setup, and project management in support of Cannevert's clinical research program.",
  },
  'embark': {
    client: 'Embark Health',
    subsection: 'ENGAGEMENTS',
    type: 'OPERATIONAL',
    descriptors: 'Regulatory Compliance · Operational Planning · Strategy Development',
    editorial: 'Municipal compliance, rezoning, building and fire code, and facility design for an extraction producer serving Canadian and global medical and recreational markets.',
  },
};

export const WORK_ENTRIES = {
  strategy: [
    { id: 'bc-pharmacy',  client: 'BC Pharmacy Regulation',   descriptor: 'Quality Management System · Regulatory Compliance · Documentation' },
    { id: 'ul-canada',    client: 'UL Canada',                 descriptor: 'Corporate Strategy Development' },
    { id: 'ul-canada-tg', client: 'UL Canada TG 4400-2',      descriptor: 'Chair' },
    { id: 'iso-iwa',      client: 'ISO IWA 37-1',              descriptor: 'Vice Convener' },
    { id: 'ul-ulc',       client: 'UL/ULC/ANSI/CAN/1389',     descriptor: 'STP Member' },
  ],
  engagements: [
    { id: 'grant-leisure', client: 'Grant Leisure International',  descriptor: 'Brand Identity · Visual Systems · Digital Presence' },
    { id: 'aurora',        client: 'Aurora Cannabis',              descriptor: 'SOP · Product Development · Regulatory Compliance · Operational Planning' },
    { id: 'organigram',    client: 'Organigram',                   descriptor: 'Regulatory Compliance · Operational Planning · Facility Development' },
    { id: 'valens',        client: 'The Valens Company',           descriptor: 'Operational Planning · Facility Development' },
    { id: 'adastra',       client: 'Adastra Labs',                 descriptor: 'Regulatory Compliance · Operational Planning · Strategy Development' },
    { id: 'ets',           client: 'ExtractionTek Stainless (ETS)', descriptor: 'Market Entry · Regulatory Affairs · Government Relations' },
    { id: 'veritas',       client: 'Veritas Pharma',               descriptor: 'Strategy · Go-to-Market Development · Project Management' },
    { id: 'embark',        client: 'Embark Health',                descriptor: 'Regulatory Compliance · Operational Planning · Strategy Development' },
  ],
};
