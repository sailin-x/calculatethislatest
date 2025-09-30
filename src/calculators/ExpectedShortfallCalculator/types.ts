export interface ExpectedShortfallCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface ExpectedShortfallCalculatorResults {
  result: number;
  analysis?: string;
}

export interface ExpectedShortfallCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface ExpectedShortfallCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
