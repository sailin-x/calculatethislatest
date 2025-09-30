export interface registerReverseMortgageCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerReverseMortgageCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerReverseMortgageCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerReverseMortgageCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
