export interface student_loan_repayment_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface student_loan_repayment_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface student_loan_repayment_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface student_loan_repayment_calculatorOutputs {
  result: number;
  analysis: student_loan_repayment_calculatorAnalysis;
}
