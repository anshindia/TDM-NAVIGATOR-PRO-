export enum DrugCategory {
  IMMUNOSUPPRESSANT = 'Immunosuppressants',
  ANTIEPILEPTIC = 'Anti-Epileptics',
  ANTIBIOTIC = 'Antibiotics / Antimicrobials',
  PSYCHOTROPIC = 'Psychotropics',
  CARDIOVASCULAR = 'Cardiovascular',
  RESPIRATORY = 'Respiratory',
  TOXICOLOGY = 'Toxicology & Addiction',
  IMMUNOMODULATOR = 'Immunomodulators',
  ANTICANCER = 'Anticancer Agents / Oncology',
  BIOLOGIC = 'Biologics & Biosimilars',
  SUBSTANCE_ABUSE = 'Substance Abuse & Performance Enhancers'
}

export interface DrugInfo {
  id: string;
  name: string;
  category: DrugCategory;
  timing: string;
  steadyState: string;
  sampleType: string;
  container: string;
  therapeuticRange: string;
  toxicLevel?: string;
  indication?: string;
  dosing?: string;
  notes?: string;
  references?: string[];
  recommendationLevel?: 'Mandatory' | 'Strongly recommended' | 'Recommended' | 'Selective' | 'Emerging';
}

export interface SearchResult {
  text: string;
  sources: Array<{ web: { title: string; uri: string } }>;
}