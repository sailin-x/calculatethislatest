export interface mortgageCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface mortgageCalculatorResults {
  result: number;
  analysis?: string;
}

export interface mortgageCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface mortgageCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
