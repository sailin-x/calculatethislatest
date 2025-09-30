export interface student_loan_forgiveness_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface student_loan_forgiveness_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface student_loan_forgiveness_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface student_loan_forgiveness_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
