export interface capital_gains_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface capital_gains_calculatorResults {
  result: number;
  analysis?: string;
}

export interface capital_gains_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface capital_gains_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
