export interface expected_shortfall_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface expected_shortfall_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface expected_shortfall_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface expected_shortfall_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
