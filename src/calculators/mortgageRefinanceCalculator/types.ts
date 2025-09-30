export interface mortgageRefinanceCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface mortgageRefinanceCalculatorResults {
  result: number;
  analysis?: string;
}

export interface mortgageRefinanceCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface mortgageRefinanceCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
