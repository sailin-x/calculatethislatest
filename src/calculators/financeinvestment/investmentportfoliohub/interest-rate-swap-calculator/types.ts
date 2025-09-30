export interface interest_rate_swap_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface interest_rate_swap_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface interest_rate_swap_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface interest_rate_swap_calculatorOutputs {
  result: number;
  analysis: interest_rate_swap_calculatorAnalysis;
}
