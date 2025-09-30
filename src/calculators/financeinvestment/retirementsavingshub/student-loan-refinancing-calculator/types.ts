export interface student_loan_refinancing_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface student_loan_refinancing_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface student_loan_refinancing_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface student_loan_refinancing_calculatorOutputs {
  result: number;
  analysis: student_loan_refinancing_calculatorAnalysis;
}
