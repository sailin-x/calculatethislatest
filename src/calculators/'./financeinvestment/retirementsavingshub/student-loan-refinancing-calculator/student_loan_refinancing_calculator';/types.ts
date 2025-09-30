export interface './financeinvestment/retirementsavingshub/student-loan-refinancing-calculator/student_loan_refinancing_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './financeinvestment/retirementsavingshub/student-loan-refinancing-calculator/student_loan_refinancing_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './financeinvestment/retirementsavingshub/student-loan-refinancing-calculator/student_loan_refinancing_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './financeinvestment/retirementsavingshub/student-loan-refinancing-calculator/student_loan_refinancing_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
