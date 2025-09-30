export interface registerPersonalLoanCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerPersonalLoanCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerPersonalLoanCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerPersonalLoanCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
