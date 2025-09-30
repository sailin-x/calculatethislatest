export interface reverseMortgageCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface reverseMortgageCalculatorResults {
  result: number;
  analysis?: string;
}

export interface reverseMortgageCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface reverseMortgageCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
