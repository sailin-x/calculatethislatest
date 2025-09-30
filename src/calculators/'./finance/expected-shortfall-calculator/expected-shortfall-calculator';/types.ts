export interface './finance/expected-shortfall-calculator/expected-shortfall-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/expected-shortfall-calculator/expected-shortfall-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/expected-shortfall-calculator/expected-shortfall-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/expected-shortfall-calculator/expected-shortfall-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
