export interface './math/complex-numbers';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './math/complex-numbers';Results {
  result: number;
  analysis?: string;
}

export interface './math/complex-numbers';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './math/complex-numbers';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
