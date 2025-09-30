export interface registerStudentLoanRefinancingCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerStudentLoanRefinancingCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerStudentLoanRefinancingCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerStudentLoanRefinancingCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
