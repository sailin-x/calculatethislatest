export interface loan_comparison_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface loan_comparison_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface loan_comparison_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface loan_comparison_calculatorOutputs {
  result: number;
  analysis: loan_comparison_calculatorAnalysis;
}
