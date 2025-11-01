export interface seed_starting_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface seed_starting_calculatorResults {
  result: number;
  analysis?: string;
}

export interface seed_starting_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface seed_starting_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
