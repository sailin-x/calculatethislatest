export interface StudentLoanRefinancingCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface StudentLoanRefinancingCalculatorResults {
  result: number;
  analysis?: string;
}

export interface StudentLoanRefinancingCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface StudentLoanRefinancingCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
