export interface betaCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface betaCalculatorResults {
  result: number;
  analysis?: string;
}

export interface betaCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface betaCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
