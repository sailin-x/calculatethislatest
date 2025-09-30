export interface './legal/guideline-premium-test-calculator/guideline-premium-test-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/guideline-premium-test-calculator/guideline-premium-test-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/guideline-premium-test-calculator/guideline-premium-test-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/guideline-premium-test-calculator/guideline-premium-test-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
