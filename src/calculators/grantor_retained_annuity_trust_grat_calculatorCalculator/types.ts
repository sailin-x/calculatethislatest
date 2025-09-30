export interface grantor_retained_annuity_trust_grat_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface grantor_retained_annuity_trust_grat_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface grantor_retained_annuity_trust_grat_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface grantor_retained_annuity_trust_grat_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
