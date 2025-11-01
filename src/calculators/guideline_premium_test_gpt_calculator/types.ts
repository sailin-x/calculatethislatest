export interface guideline_premium_test_gpt_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface guideline_premium_test_gpt_calculatorResults {
  result: number;
  analysis?: string;
}

export interface guideline_premium_test_gpt_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface guideline_premium_test_gpt_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
