export interface './finance/expected-shortfall-calculator/ExpectedShortfallCalculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/expected-shortfall-calculator/ExpectedShortfallCalculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/expected-shortfall-calculator/ExpectedShortfallCalculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/expected-shortfall-calculator/ExpectedShortfallCalculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
