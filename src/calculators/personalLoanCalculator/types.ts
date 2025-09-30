export interface personalLoanCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface personalLoanCalculatorResults {
  result: number;
  analysis?: string;
}

export interface personalLoanCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface personalLoanCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
