export interface seed_starting_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface seed_starting_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface seed_starting_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface seed_starting_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
