export interface basal_metabolic_rate_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface basal_metabolic_rate_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface basal_metabolic_rate_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface basal_metabolic_rate_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
