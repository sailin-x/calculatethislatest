export interface registerStudentLoanRepaymentCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerStudentLoanRepaymentCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerStudentLoanRepaymentCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerStudentLoanRepaymentCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
