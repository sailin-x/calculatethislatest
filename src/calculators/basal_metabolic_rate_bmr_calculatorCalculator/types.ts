export interface basal_metabolic_rate_bmr_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface basal_metabolic_rate_bmr_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface basal_metabolic_rate_bmr_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface basal_metabolic_rate_bmr_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
