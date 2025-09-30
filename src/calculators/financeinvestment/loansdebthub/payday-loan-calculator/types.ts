export interface payday_loan_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface payday_loan_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface payday_loan_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface payday_loan_calculatorOutputs {
  result: number;
  analysis: payday_loan_calculatorAnalysis;
}
