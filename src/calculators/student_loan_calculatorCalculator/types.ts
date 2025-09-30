export interface student_loan_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface student_loan_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface student_loan_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface student_loan_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
