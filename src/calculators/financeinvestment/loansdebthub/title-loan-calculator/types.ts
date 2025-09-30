export interface title_loan_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface title_loan_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface title_loan_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface title_loan_calculatorOutputs {
  result: number;
  analysis: title_loan_calculatorAnalysis;
}
