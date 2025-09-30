export interface './finance/student-loan-forgiveness-calculator/student_loan_forgiveness_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/student-loan-forgiveness-calculator/student_loan_forgiveness_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/student-loan-forgiveness-calculator/student_loan_forgiveness_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/student-loan-forgiveness-calculator/student_loan_forgiveness_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
