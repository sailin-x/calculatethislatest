export interface grantor_retained_annuity_trust_grat_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface grantor_retained_annuity_trust_grat_calculatorResults {
  result: number;
  analysis?: string;
}

export interface grantor_retained_annuity_trust_grat_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface grantor_retained_annuity_trust_grat_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
