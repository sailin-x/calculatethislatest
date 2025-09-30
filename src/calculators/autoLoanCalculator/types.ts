export interface autoLoanCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface autoLoanCalculatorResults {
  result: number;
  analysis?: string;
}

export interface autoLoanCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface autoLoanCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
