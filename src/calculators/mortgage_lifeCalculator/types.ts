export interface mortgage_lifeCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface mortgage_lifeCalculatorResults {
  result: number;
  analysis?: string;
}

export interface mortgage_lifeCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface mortgage_lifeCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
