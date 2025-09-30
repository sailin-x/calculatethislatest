export interface registerExpectedShortfallCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerExpectedShortfallCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerExpectedShortfallCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerExpectedShortfallCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
