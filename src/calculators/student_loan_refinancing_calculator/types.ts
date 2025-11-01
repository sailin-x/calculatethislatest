export interface student_loan_refinancing_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface student_loan_refinancing_calculatorResults {
  result: number;
  analysis?: string;
}

export interface student_loan_refinancing_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface student_loan_refinancing_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
