import { DrugCategory, DrugInfo } from './types';

export const DRUG_DATA: DrugInfo[] = [
  // --- ANTICANCER AGENTS (ONCOLOGY & BMT) ---
  {
    id: 'methotrexate-hd',
    name: 'High-Dose Methotrexate',
    category: DrugCategory.ANTICANCER,
    timing: 'Serial monitoring: 24, 48, and 72 hours post-infusion until level < 0.1 μmol/L.',
    steadyState: 'N/A (Pulse therapy)',
    sampleType: 'Serum / Plasma',
    container: 'SST or Lithium Heparin (Protect from light)',
    therapeuticRange: 'Critical rescue thresholds: >10 μmol/L (24h); >1.0 μmol/L (48h); >0.1 μmol/L (72h).',
    notes: 'Mandatory. Guides Leucovorin rescue. Toxicity risk: Myelosuppression, Nephrotoxicity.',
    recommendationLevel: 'Mandatory'
  },
  {
    id: 'busulfan',
    name: 'Busulfan',
    category: DrugCategory.ANTICANCER,
    timing: 'AUC monitoring: Multiple samples post-dose 1 (e.g., 0, 1, 2, 4, 6h).',
    steadyState: 'N/A (Conditioning)',
    sampleType: 'Plasma',
    container: 'Heparin (Green Top); Place on ice immediately.',
    therapeuticRange: 'Target AUC: ~900-1500 μMol*min (Protocol specific).',
    notes: 'Mandatory. High AUC linked to SOS/VOD; Low AUC linked to graft failure.',
    recommendationLevel: 'Mandatory'
  },
  {
    id: 'melphalan-hd',
    name: 'Melphalan (High-Dose)',
    category: DrugCategory.ANTICANCER,
    timing: 'AUC monitoring: Samples at end of infusion, 15m, 30m, 1h, 2h, 4h.',
    steadyState: 'N/A',
    sampleType: 'Plasma',
    container: 'Heparin (Green Top); MUST be chilled and processed <15 mins.',
    therapeuticRange: 'Target AUC: ~13 mg*h/L.',
    notes: 'Strongly recommended. Drug is highly unstable at room temperature.',
    recommendationLevel: 'Strongly recommended'
  },
  {
    id: 'imatinib',
    name: 'Imatinib (Gleevec)',
    category: DrugCategory.ANTICANCER,
    timing: 'Trough (Cmin): Just before next dose (Steady state).',
    steadyState: '7 days.',
    sampleType: 'Plasma',
    container: 'EDTA (Lavender Top)',
    therapeuticRange: '> 1000 ng/mL (CML); > 1100 ng/mL (GIST).',
    notes: 'Strongly recommended. Levels below target linked to sub-optimal cytogenetic response.',
    recommendationLevel: 'Strongly recommended'
  },
  {
    id: 'sunitinib',
    name: 'Sunitinib',
    category: DrugCategory.ANTICANCER,
    timing: 'Trough (Cmin): Just before next dose.',
    steadyState: '10-14 days.',
    sampleType: 'Plasma',
    container: 'EDTA (Lavender Top)',
    therapeuticRange: '50 - 100 ng/mL (Sum of parent + active metabolite SU12662).',
    notes: 'Strongly recommended. High variability due to CYP3A4.',
    recommendationLevel: 'Strongly recommended'
  },
  {
    id: 'pazopanib',
    name: 'Pazopanib',
    category: DrugCategory.ANTICANCER,
    timing: 'Trough (Cmin): Just before next dose.',
    steadyState: '10-14 days.',
    sampleType: 'Plasma',
    container: 'EDTA (Lavender Top)',
    therapeuticRange: '> 20 mg/L',
    notes: 'Strongly recommended. Low levels correlate with shorter progression-free survival.',
    recommendationLevel: 'Strongly recommended'
  },
  {
    id: 'fludarabine',
    name: 'Fludarabine',
    category: DrugCategory.ANTICANCER,
    timing: 'AUC monitoring of F-ara-A.',
    steadyState: 'N/A',
    sampleType: 'Plasma',
    container: 'EDTA or Heparin',
    therapeuticRange: 'Target AUC: ~20 mg*h/L.',
    notes: 'Strongly recommended in BMT to balance toxicity vs. graft rejection.',
    recommendationLevel: 'Strongly recommended'
  },
  {
    id: 'tamoxifen-endox',
    name: 'Tamoxifen (Endoxifen)',
    category: DrugCategory.ANTICANCER,
    timing: 'Random Trough: Anytime after steady state.',
    steadyState: '1-3 months.',
    sampleType: 'Serum / Plasma',
    container: 'SST or EDTA',
    therapeuticRange: 'Endoxifen (active metabolite) > 5.9 ng/mL.',
    notes: 'Selective. Crucial for CYP2D6 slow metabolizers.',
    recommendationLevel: 'Selective'
  },
  {
    id: 'cytarabine-hd',
    name: 'Cytarabine (High-Dose)',
    category: DrugCategory.ANTICANCER,
    timing: 'Monitoring during 1-3h infusion cycles.',
    steadyState: 'N/A',
    sampleType: 'Plasma',
    container: 'EDTA or Heparin',
    therapeuticRange: 'Intracellular Ara-CTP targets preferred but plasma > 1 μMol/L used.',
    notes: 'Recommended. Risk of cerebellar toxicity at high levels.',
    recommendationLevel: 'Recommended'
  },

  // --- ANTIBIOTICS / ANTIMICROBIALS ---
  {
    id: 'gentamicin',
    name: 'Gentamicin',
    category: DrugCategory.ANTIBIOTIC,
    timing: 'Trough: Before dose. Peak: 30-60 mins post-infusion.',
    steadyState: '2nd or 3rd dose.',
    sampleType: 'Serum / Plasma',
    container: 'SST or Lithium Heparin',
    therapeuticRange: 'Trough: < 2 mg/L; Peak: 5 - 10 mg/L (Traditional).',
    notes: 'Mandatory. Risk of nephrotoxicity and ototoxicity. Once-daily dosing trough should be < 1 mg/L.',
    recommendationLevel: 'Mandatory'
  },
  {
    id: 'amikacin',
    name: 'Amikacin',
    category: DrugCategory.ANTIBIOTIC,
    timing: 'Trough: Before dose. Peak: 30-60 mins post-infusion.',
    steadyState: '2nd or 3rd dose.',
    sampleType: 'Serum / Plasma',
    container: 'SST or Lithium Heparin',
    therapeuticRange: 'Trough: < 8 mg/L; Peak: 20 - 30 mg/L (Multi-dose).',
    notes: 'Mandatory. Peak for once-daily dosing can reach 60+ mg/L.',
    recommendationLevel: 'Mandatory'
  },
  {
    id: 'tobramycin',
    name: 'Tobramycin',
    category: DrugCategory.ANTIBIOTIC,
    timing: 'Trough: Before dose. Peak: 30-60 mins post-infusion.',
    steadyState: '2nd or 3rd dose.',
    sampleType: 'Serum / Plasma',
    container: 'SST or Lithium Heparin',
    therapeuticRange: 'Trough: < 2 mg/L; Peak: 5 - 10 mg/L.',
    notes: 'Mandatory. Often preferred for Pseudomonas infections.',
    recommendationLevel: 'Mandatory'
  },
  {
    id: 'vancomycin-mand',
    name: 'Vancomycin',
    category: DrugCategory.ANTIBIOTIC,
    timing: 'Trough: Just before 4th or 5th dose.',
    steadyState: 'Before 4th dose.',
    sampleType: 'Serum / Plasma',
    container: 'SST or Lithium Heparin',
    therapeuticRange: 'Trough: 10 - 20 mg/L; AUC/MIC Target: 400 - 600.',
    notes: 'Mandatory. Continuous infusion target: 20 - 25 mg/L.',
    recommendationLevel: 'Mandatory'
  },
  {
    id: 'voriconazole',
    name: 'Voriconazole',
    category: DrugCategory.ANTIBIOTIC,
    timing: 'Trough: Just before next dose.',
    steadyState: '3 - 5 days.',
    sampleType: 'Serum / Plasma',
    container: 'SST or Plain Red Top',
    therapeuticRange: '1.0 - 5.0 mg/L (Trough).',
    notes: 'Mandatory. Significant genetic variability (CYP2C19). Neurotoxicity at levels > 5 mg/L.',
    recommendationLevel: 'Mandatory'
  },
  {
    id: 'linezolid',
    name: 'Linezolid',
    category: DrugCategory.ANTIBIOTIC,
    timing: 'Trough: Just before next dose.',
    steadyState: '2 - 3 days.',
    sampleType: 'Serum / Plasma',
    container: 'SST or Plain Red Top',
    therapeuticRange: '2.0 - 7.0 mg/L (Trough).',
    notes: 'Strongly recommended. Levels > 7-10 mg/L linked to thrombocytopenia.',
    recommendationLevel: 'Strongly recommended'
  },
  {
    id: 'colistin',
    name: 'Colistin (CMS)',
    category: DrugCategory.ANTIBIOTIC,
    timing: 'Trough: Just before next dose.',
    steadyState: '2 - 3 days.',
    sampleType: 'Serum / Plasma',
    container: 'Plain Red Top or SST',
    therapeuticRange: 'Average Steady State (Css): ~ 2 mg/L.',
    notes: 'Strongly recommended. Measured as colistin base. High risk of nephrotoxicity.',
    recommendationLevel: 'Strongly recommended'
  },
  {
    id: 'meropenem-icu',
    name: 'Meropenem (ICU)',
    category: DrugCategory.ANTIBIOTIC,
    timing: 'Trough: Just before next dose (or steady state during CI).',
    steadyState: 'After 24h.',
    sampleType: 'Serum / Plasma',
    container: 'SST (Immediate freezing required).',
    therapeuticRange: 'Trough > 2-8 mg/L (Depends on pathogen MIC; often 1-4x MIC).',
    notes: 'Strongly recommended in ICU. Drug is highly unstable at room temperature.',
    recommendationLevel: 'Strongly recommended'
  },
  {
    id: 'posaconazole',
    name: 'Posaconazole',
    category: DrugCategory.ANTIBIOTIC,
    timing: 'Trough: Just before next dose.',
    steadyState: '7 days.',
    sampleType: 'Serum / Plasma',
    container: 'SST or Plain Red Top',
    therapeuticRange: '> 0.7 mg/L (Prophylaxis); > 1.0 mg/L (Treatment).',
    notes: 'Strongly recommended. Absorption of oral suspension is inconsistent.',
    recommendationLevel: 'Strongly recommended'
  },
  {
    id: 'itraconazole',
    name: 'Itraconazole',
    category: DrugCategory.ANTIBIOTIC,
    timing: 'Trough: Just before next dose.',
    steadyState: '7 - 14 days.',
    sampleType: 'Serum / Plasma',
    container: 'SST or Plain Red Top',
    therapeuticRange: '> 0.5 mg/L (HPLC/LC-MS); > 1.0 mg/L (if treatment).',
    notes: 'Strongly recommended. Bioavailability varies greatly with formulation and pH.',
    recommendationLevel: 'Strongly recommended'
  },
  {
    id: 'isoniazid-sr',
    name: 'Isoniazid',
    category: DrugCategory.ANTIBIOTIC,
    timing: 'Peak: 2 hours post-dose.',
    steadyState: '1 - 2 days.',
    sampleType: 'Serum / Plasma',
    container: 'SST or Plain Red Top',
    therapeuticRange: '3 - 6 mg/L (Peak).',
    notes: 'Strongly recommended. Slow acetylators at higher risk of toxicity.',
    recommendationLevel: 'Strongly recommended'
  },
  {
    id: 'rifampicin-sr',
    name: 'Rifampicin',
    category: DrugCategory.ANTIBIOTIC,
    timing: 'Peak: 2 hours post-dose.',
    steadyState: '2 days.',
    sampleType: 'Serum / Plasma',
    container: 'SST (Protect from light).',
    therapeuticRange: '8 - 24 mg/L (Peak).',
    notes: 'Strongly recommended. Potent inducer of many metabolic enzymes.',
    recommendationLevel: 'Strongly recommended'
  },
  {
    id: 'amphotericin-b',
    name: 'Amphotericin B',
    category: DrugCategory.ANTIBIOTIC,
    timing: 'Monitoring is rarely performed clinically.',
    steadyState: 'N/A',
    sampleType: 'Serum / Plasma',
    container: 'SST or Plain Red Top',
    therapeuticRange: '0.5 - 2.0 mg/L (Typical exposure).',
    notes: 'Selective. Monitoring usually for lipid formulations in special cases.',
    recommendationLevel: 'Selective'
  },

  // --- CARDIOVASCULAR ---
  {
    id: 'lidocaine-iv',
    name: 'Lidocaine (IV)',
    category: DrugCategory.CARDIOVASCULAR,
    timing: '6-12 hours after start of constant rate infusion.',
    steadyState: '8-12 hours.',
    sampleType: 'Serum / Plasma',
    container: 'Plain Red Top (Avoid SST if possible).',
    therapeuticRange: '1.5 - 5.0 mcg/mL',
    toxicLevel: '>6.0 mcg/mL',
    notes: 'Mandatory. Toxicity includes CNS effects (seizures) and cardiovascular depression.',
    recommendationLevel: 'Mandatory'
  },
  {
    id: 'procainamide',
    name: 'Procainamide / NAPA',
    category: DrugCategory.CARDIOVASCULAR,
    timing: 'Trough: Just before next dose.',
    steadyState: 'Procainamide: 24h; NAPA: 48-72h.',
    sampleType: 'Serum / Plasma',
    container: 'Plain Red Top or SST',
    therapeuticRange: 'Procainamide: 4-10 mcg/mL; NAPA: 10-20 mcg/mL; Sum: 10-30 mcg/mL.',
    notes: 'Mandatory. Monitor both parent drug and its active metabolite NAPA.',
    recommendationLevel: 'Mandatory'
  },
  {
    id: 'quinidine',
    name: 'Quinidine',
    category: DrugCategory.CARDIOVASCULAR,
    timing: 'Trough (before dose) or Peak (2h post oral dose).',
    steadyState: '24-48 hours.',
    sampleType: 'Serum / Plasma',
    container: 'Plain Red Top or SST',
    therapeuticRange: '2.0 - 5.0 mcg/mL',
    notes: 'Mandatory. High inter-individual variability.',
    recommendationLevel: 'Mandatory'
  },

  // --- PSYCHOTROPICS ---
  {
    id: 'lithium',
    name: 'Lithium',
    category: DrugCategory.PSYCHOTROPIC,
    timing: 'Standardized Trough: Exactly 12 hours post-dose.',
    steadyState: '4-5 days.',
    sampleType: 'Serum',
    container: 'Plain Red Top (STRICTLY AVOID Lithium Heparin).',
    therapeuticRange: '0.6 - 1.2 mmol/L (Maintenance); 0.8 - 1.5 mmol/L (Acute Mania).',
    toxicLevel: '>1.5 mmol/L',
    notes: 'Mandatory. Narrow therapeutic index; Renal function must be monitored.',
    recommendationLevel: 'Mandatory'
  },

  // --- IMMUNOSUPPRESSANTS (GENERAL) ---
  {
    id: 'tacrolimus-gen',
    name: 'Tacrolimus',
    category: DrugCategory.IMMUNOSUPPRESSANT,
    timing: 'Trough: Immediately before next dose.',
    steadyState: '2-3 days.',
    sampleType: 'Whole Blood',
    container: 'EDTA (Lavender Top)',
    therapeuticRange: '5 - 15 ng/mL (Varies by organ type and time post-transplant).',
    notes: 'Mandatory. Primary tool for transplant success.',
    recommendationLevel: 'Mandatory'
  },

  // --- TOXICOLOGY & ADDICTION ---
  {
    id: 'paracetamol',
    name: 'Paracetamol',
    category: DrugCategory.TOXICOLOGY,
    timing: 'Acute: Exactly 4 hours post-ingestion (for Nomogram).',
    steadyState: 'N/A',
    sampleType: 'Serum / Plasma',
    container: 'SST or Plain Red',
    therapeuticRange: '10 - 25 mcg/mL (Analgesic)',
    toxicLevel: '>150 mcg/mL at 4h (Treatment line).',
    notes: 'Levels before 4h post-ingestion are uninterpretable for toxicity.',
  }
];