export interface title_loan_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface title_loan_calculatorResults {
  result: number;
  analysis?: string;
}

export interface title_loan_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface title_loan_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
