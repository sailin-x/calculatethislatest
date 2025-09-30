export interface reverse_mortgageCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface reverse_mortgageCalculatorResults {
  result: number;
  analysis?: string;
}

export interface reverse_mortgageCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface reverse_mortgageCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
