export interface interest_only_mortgageCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface interest_only_mortgageCalculatorResults {
  result: number;
  analysis?: string;
}

export interface interest_only_mortgageCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface interest_only_mortgageCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
