export interface personalInjuryCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface personalInjuryCalculatorResults {
  result: number;
  analysis?: string;
}

export interface personalInjuryCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface personalInjuryCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
