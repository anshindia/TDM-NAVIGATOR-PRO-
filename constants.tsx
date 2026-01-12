import { DrugCategory, DrugInfo } from './types';

export const DRUG_DATA: DrugInfo[] = [
  // --- IMMUNOSUPPRESSANTS ---
  { 
    id: 'cyclosporine', 
    name: 'Cyclosporine (Neoral/Sandimmune)', 
    category: DrugCategory.IMMUNOSUPPRESSANT, 
    timing: 'Trough (C0) or 2-hour post-dose (C2).', 
    steadyState: '2 - 3 days.', 
    sampleType: 'Whole Blood', 
    container: 'EDTA (Lavender Top)', 
    therapeuticRange: 'C0: 100 - 400 ng/mL; C2: 800 - 1200 ng/mL.', 
    indication: 'Organ transplant (Kidney, Liver, Heart), Graft vs Host Disease (GvHD).',
    dosing: '3 - 5 mg/kg/day divided BID.',
    notes: 'Bile-dependent absorption. Significant CYP3A4 interactions. Toxicity: Nephrotoxicity, hypertension, hirsutism.',
    recommendationLevel: 'Mandatory' 
  },
  { 
    id: 'everolimus', 
    name: 'Everolimus (Zortress)', 
    category: DrugCategory.IMMUNOSUPPRESSANT, 
    timing: 'Trough: Immediately before next dose.', 
    steadyState: '4 - 6 days.', 
    sampleType: 'Whole Blood', 
    container: 'EDTA (Lavender Top)', 
    therapeuticRange: '3 - 8 ng/mL.', 
    indication: 'Kidney/Liver transplant, certain oncology indications.',
    dosing: '0.75 mg BID initially.',
    notes: 'Often used with reduced-dose CNIs to mitigate nephrotoxicity. Monitor lipids and proteinuria.',
    recommendationLevel: 'Strongly recommended' 
  },
  { 
    id: 'mycophenolic-acid', 
    name: 'Mycophenolic Acid (Cellcept)', 
    category: DrugCategory.IMMUNOSUPPRESSANT, 
    timing: 'Trough (C0) or AUC (0-12h) monitoring.', 
    steadyState: '3 days.', 
    sampleType: 'Plasma', 
    container: 'EDTA (Lavender Top)', 
    therapeuticRange: 'C0: 1.0 - 3.5 μg/mL; AUC: 30 - 60 mg*h/L.', 
    indication: 'Transplant rejection prophylaxis, Lupus Nephritis.',
    dosing: '1000 mg BID (CellCept) or 720 mg BID (Myfortic).',
    notes: 'Enterohepatic recirculation causes a secondary peak at 6-12h. GI side effects are dose-limiting.',
    recommendationLevel: 'Recommended' 
  },
  { 
    id: 'sirolimus', 
    name: 'Sirolimus (Rapamune)', 
    category: DrugCategory.IMMUNOSUPPRESSANT, 
    timing: 'Trough: Immediately before next dose.', 
    steadyState: '5 - 7 days.', 
    sampleType: 'Whole Blood', 
    container: 'EDTA (Lavender Top)', 
    therapeuticRange: '4 - 12 ng/mL (with CNIs).', 
    indication: 'Renal transplant, Lymphangioleiomyomatosis (LAM).',
    dosing: '2 mg daily (standard maintenance).',
    notes: 'Long half-life (~60h). Can impair wound healing post-surgery. Toxicity: Hyperlipidemia, thrombocytopenia.',
    recommendationLevel: 'Strongly recommended' 
  },
  { 
    id: 'tacrolimus', 
    name: 'Tacrolimus (Prograf)', 
    category: DrugCategory.IMMUNOSUPPRESSANT, 
    timing: 'Trough: Immediately before next dose (C0).', 
    steadyState: '2 - 3 days.', 
    sampleType: 'Whole Blood', 
    container: 'EDTA (Lavender Top)', 
    therapeuticRange: '5 - 15 ng/mL (Target varies by organ).', 
    indication: 'Solid organ transplant (Primary therapy).',
    dosing: '0.05 - 0.15 mg/kg/day divided BID.',
    notes: 'CYP3A5 genotype significantly impacts dose requirements (Fast vs Slow metabolizers). Toxicity: Neurotoxicity (tremor), Nephrotoxicity, New-Onset Diabetes (NODAT).',
    recommendationLevel: 'Mandatory' 
  },

  // --- ANTICANCER AGENTS ---
  { 
    id: 'busulfan', 
    name: 'Busulfan', 
    category: DrugCategory.ANTICANCER, 
    timing: 'AUC monitoring: Multiple samples post-dose 1.', 
    steadyState: 'N/A', 
    sampleType: 'Plasma', 
    container: 'Lithium Heparin (Green) on ICE', 
    therapeuticRange: 'AUC Target: ~900-1500 μMol*min.', 
    indication: 'Conditioning regimen prior to hematopoietic stem cell transplant (HSCT).',
    dosing: '0.8 mg/kg q6h or 3.2 mg/kg daily (IV).',
    notes: 'Narrow window: Low AUC leads to graft failure; High AUC leads to Sinusoidal Obstruction Syndrome (SOS).',
    recommendationLevel: 'Mandatory' 
  },
  { 
    id: 'methotrexate-hd', 
    name: 'Methotrexate (High Dose)', 
    category: DrugCategory.ANTICANCER, 
    timing: 'Serial: 24h, 48h, 72h post-infusion.', 
    steadyState: 'N/A', 
    sampleType: 'Serum / Plasma', 
    container: 'Plain Red (Protect from light)', 
    therapeuticRange: 'Toxic: >10 μM (24h); >1.0 μM (48h).', 
    indication: 'Osteosarcoma, CNS Lymphoma, Leukemia.',
    dosing: '1 - 12 g/m² IV infusion.',
    notes: 'Mandatory hydration and urinary alkalinization (pH > 7). Leucovorin rescue guided by MTX levels.',
    recommendationLevel: 'Mandatory' 
  },
  { 
    id: 'imatinib', 
    name: 'Imatinib (Gleevec)', 
    category: DrugCategory.ANTICANCER, 
    timing: 'Trough.', 
    steadyState: '7 days.', 
    sampleType: 'Serum / Plasma', 
    container: 'Plain Red', 
    therapeuticRange: '> 1000 ng/mL.', 
    indication: 'CML, GIST.',
    dosing: '400 - 600 mg daily.',
    notes: 'Cmin < 1000 ng/mL associated with poor cytogenetic response in CML.',
    recommendationLevel: 'Recommended' 
  },

  // --- CARDIOVASCULAR ---
  { 
    id: 'digoxin', 
    name: 'Digoxin', 
    category: DrugCategory.CARDIOVASCULAR, 
    timing: 'Min 6-8h post-dose (12-24h preferred).', 
    steadyState: '7 - 10 days.', 
    sampleType: 'Serum / Plasma', 
    container: 'SST or Plain Red', 
    therapeuticRange: '0.5 - 2.0 ng/mL.', 
    indication: 'Heart Failure, Atrial Fibrillation.',
    dosing: '0.125 - 0.25 mg daily.',
    notes: 'Toxicity risk increases with hypokalemia, hypomagnesemia, and hypercalcemia. Symptoms: Nausea, yellow-green vision (xanthopsia), arrhythmias.',
    recommendationLevel: 'Mandatory' 
  },
  { 
    id: 'amiodarone', 
    name: 'Amiodarone', 
    category: DrugCategory.CARDIOVASCULAR, 
    timing: 'Trough.', 
    steadyState: 'Weeks to Months.', 
    sampleType: 'Serum / Plasma', 
    container: 'Plain Red', 
    therapeuticRange: '1.0 - 2.5 μg/mL.', 
    indication: 'Ventricular arrhythmias, Atrial Fibrillation (Refractory).',
    dosing: '200 - 400 mg daily (Maintenance).',
    notes: 'Extremely long half-life (up to 100 days). Monitor Thyroid (TFTs) and Liver (LFTs) and Pulmonary function.',
    recommendationLevel: 'Strongly recommended' 
  },
  { 
    id: 'apixaban-doac', 
    name: 'Apixaban', 
    category: DrugCategory.CARDIOVASCULAR, 
    timing: 'Peak (2-4h) or Trough.', 
    steadyState: '3 days.', 
    sampleType: 'Plasma', 
    container: 'Citrate (Blue)', 
    therapeuticRange: 'TDM for Specific Scenarios.', 
    indication: 'Afib, DVT/PE prophylaxis.',
    dosing: '5 mg BID (Standard) or 2.5 mg BID (Dose-reduction criteria).',
    notes: 'Standard monitoring not required, but Anti-Xa assays useful in renal failure, extreme weight (<50kg or >120kg), or bleeding.',
    recommendationLevel: 'Recommended' 
  },

  // --- RESPIRATORY ---
  { 
    id: 'theophylline', 
    name: 'Theophylline', 
    category: DrugCategory.RESPIRATORY, 
    timing: 'Peak: 1-2h (Liq), 4-12h (SR).', 
    steadyState: '2 days.', 
    sampleType: 'Serum / Plasma', 
    container: 'SST or Plain Red', 
    therapeuticRange: '5 - 15 μg/mL.', 
    indication: 'Asthma, COPD (maintenance).',
    dosing: '300 - 600 mg daily (divided).',
    notes: 'Clearance increased by smoking; decreased by heart failure or cimetidine. Narrow therapeutic index.',
    recommendationLevel: 'Mandatory' 
  },
  { 
    id: 'caffeine-neo', 
    name: 'Caffeine (Neonatal)', 
    category: DrugCategory.RESPIRATORY, 
    timing: 'Trough: Just before dose.', 
    steadyState: '3 - 5 days.', 
    sampleType: 'Serum / Plasma', 
    container: 'SST or Plain Red', 
    therapeuticRange: '5 - 20 μg/mL.', 
    indication: 'Apnea of Prematurity.',
    dosing: '20 mg/kg (Load), then 5-10 mg/kg daily (Maintenance).',
    notes: 'Wide margin of safety compared to theophylline in neonates.',
    recommendationLevel: 'Mandatory' 
  },

  // --- ANTI-EPILEPTICS ---
  { 
    id: 'carbamazepine', 
    name: 'Carbamazepine (Tegretol)', 
    category: DrugCategory.ANTIEPILEPTIC, 
    timing: 'Trough.', 
    steadyState: '2-4 weeks.', 
    sampleType: 'Serum', 
    container: 'SST', 
    therapeuticRange: '4 - 12 μg/mL.', 
    indication: 'Focal seizures, Trigeminal neuralgia.',
    dosing: '400 - 1200 mg daily (divided).',
    notes: 'Auto-inducer of its own metabolism. Monitor CBC for aplastic anemia risk and Na+ for SIADH.',
    recommendationLevel: 'Mandatory' 
  },
  { 
    id: 'phenytoin', 
    name: 'Phenytoin (Dilantin)', 
    category: DrugCategory.ANTIEPILEPTIC, 
    timing: 'Trough.', 
    steadyState: '5-10 days.', 
    sampleType: 'Serum', 
    container: 'SST', 
    therapeuticRange: '10 - 20 μg/mL (Total).', 
    indication: 'Status epilepticus, Tonic-clonic seizures.',
    dosing: '300 - 400 mg daily.',
    notes: 'Non-linear (Michaelis-Menten) kinetics: Small dose increases can lead to massive level jumps. Adjust for low albumin.',
    recommendationLevel: 'Mandatory' 
  },

  // --- ANTIBIOTICS ---
  { 
    id: 'vancomycin', 
    name: 'Vancomycin', 
    category: DrugCategory.ANTIBIOTIC, 
    timing: 'Trough.', 
    steadyState: 'Before 4th dose.', 
    sampleType: 'Serum', 
    container: 'SST', 
    therapeuticRange: '10 - 20 μg/mL (Trough); AUC/MIC 400-600.', 
    indication: 'MRSA, serious Gram-positive infections.',
    dosing: '15 - 20 mg/kg q8-12h.',
    notes: 'Current guidelines emphasize AUC-based monitoring over simple troughs to minimize nephrotoxicity.',
    recommendationLevel: 'Mandatory' 
  },

  // --- PSYCHOTROPICS ---
  { 
    id: 'lithium', 
    name: 'Lithium', 
    category: DrugCategory.PSYCHOTROPIC, 
    timing: '12h post-dose.', 
    steadyState: '4-5 days.', 
    sampleType: 'Serum', 
    container: 'Plain Red', 
    therapeuticRange: '0.6 - 1.2 mmol/L.', 
    indication: 'Bipolar Disorder (Manic/Maintenance).',
    dosing: '600 - 1200 mg daily (divided).',
    notes: 'TDM is critical. Levels > 1.5 mmol/L are toxic. Affected by sodium intake, NSAIDs, and diuretics.',
    recommendationLevel: 'Mandatory' 
  }
];