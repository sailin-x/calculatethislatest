export interface alpha_betaCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface alpha_betaCalculatorResults {
  result: number;
  analysis?: string;
}

export interface alpha_betaCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface alpha_betaCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
