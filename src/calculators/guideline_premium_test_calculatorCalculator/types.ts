export interface guideline_premium_test_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface guideline_premium_test_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface guideline_premium_test_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface guideline_premium_test_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
