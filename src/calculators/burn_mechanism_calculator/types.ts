export interface burn_mechanism_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface burn_mechanism_calculatorResults {
  result: number;
  analysis?: string;
}

export interface burn_mechanism_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface burn_mechanism_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
