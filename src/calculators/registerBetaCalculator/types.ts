export interface registerBetaCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerBetaCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerBetaCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerBetaCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
