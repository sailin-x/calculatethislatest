export interface credit_default_swap_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface credit_default_swap_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface credit_default_swap_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface credit_default_swap_calculatorOutputs {
  result: number;
  analysis: credit_default_swap_calculatorAnalysis;
}
