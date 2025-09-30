export interface guideline_premium_test_gpt_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface guideline_premium_test_gpt_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface guideline_premium_test_gpt_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface guideline_premium_test_gpt_calculatorOutputs {
  result: number;
  analysis: guideline_premium_test_gpt_calculatorAnalysis;
}
