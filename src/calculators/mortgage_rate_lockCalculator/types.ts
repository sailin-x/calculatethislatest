export interface mortgage_rate_lockCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface mortgage_rate_lockCalculatorResults {
  result: number;
  analysis?: string;
}

export interface mortgage_rate_lockCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface mortgage_rate_lockCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
