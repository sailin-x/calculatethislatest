export interface debt_consolidation_loan_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface debt_consolidation_loan_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface debt_consolidation_loan_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface debt_consolidation_loan_calculatorOutputs {
  result: number;
  analysis: debt_consolidation_loan_calculatorAnalysis;
}
