export interface expected_shortfall_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface expected_shortfall_calculatorResults {
  result: number;
  analysis?: string;
}

export interface expected_shortfall_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface expected_shortfall_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
