export interface total_return_swap_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface total_return_swap_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface total_return_swap_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface total_return_swap_calculatorOutputs {
  result: number;
  analysis: total_return_swap_calculatorAnalysis;
}
