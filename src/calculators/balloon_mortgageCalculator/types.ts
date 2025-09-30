export interface balloon_mortgageCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface balloon_mortgageCalculatorResults {
  result: number;
  analysis?: string;
}

export interface balloon_mortgageCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface balloon_mortgageCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
