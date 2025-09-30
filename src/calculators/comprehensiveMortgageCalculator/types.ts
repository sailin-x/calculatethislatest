export interface comprehensiveMortgageCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface comprehensiveMortgageCalculatorResults {
  result: number;
  analysis?: string;
}

export interface comprehensiveMortgageCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface comprehensiveMortgageCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
