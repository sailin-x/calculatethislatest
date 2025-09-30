export interface registerComprehensiveMortgageCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerComprehensiveMortgageCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerComprehensiveMortgageCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerComprehensiveMortgageCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
