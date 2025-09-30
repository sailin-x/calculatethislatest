export interface registerCarLoanCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerCarLoanCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerCarLoanCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerCarLoanCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
