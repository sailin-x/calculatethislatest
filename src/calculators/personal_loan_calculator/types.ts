export interface personal_loan_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface personal_loan_calculatorResults {
  result: number;
  analysis?: string;
}

export interface personal_loan_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface personal_loan_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
