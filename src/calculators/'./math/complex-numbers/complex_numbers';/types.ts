export interface './math/complex-numbers/complex_numbers';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './math/complex-numbers/complex_numbers';Results {
  result: number;
  analysis?: string;
}

export interface './math/complex-numbers/complex_numbers';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './math/complex-numbers/complex_numbers';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
