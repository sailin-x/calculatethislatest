export interface './math/complex-number-calculator/complex-number-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './math/complex-number-calculator/complex-number-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './math/complex-number-calculator/complex-number-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './math/complex-number-calculator/complex-number-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
