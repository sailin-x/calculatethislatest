export interface loan_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface loan_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface loan_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface loan_calculatorOutputs {
  result: number;
  analysis: loan_calculatorAnalysis;
}
