export interface fixed_index_annuity_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface fixed_index_annuity_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface fixed_index_annuity_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface fixed_index_annuity_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
