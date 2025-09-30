export interface income_based_repayment_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface income_based_repayment_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface income_based_repayment_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface income_based_repayment_calculatorOutputs {
  result: number;
  analysis: income_based_repayment_calculatorAnalysis;
}
