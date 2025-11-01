export interface basal_metabolic_rate_bmr_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface basal_metabolic_rate_bmr_calculatorResults {
  result: number;
  analysis?: string;
}

export interface basal_metabolic_rate_bmr_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface basal_metabolic_rate_bmr_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
