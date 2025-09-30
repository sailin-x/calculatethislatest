export interface student_loan_forgiveness_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface student_loan_forgiveness_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface student_loan_forgiveness_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface student_loan_forgiveness_calculatorOutputs {
  result: number;
  analysis: student_loan_forgiveness_calculatorAnalysis;
}
