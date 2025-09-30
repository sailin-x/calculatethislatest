export interface './math/algebra';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './math/algebra';Results {
  result: number;
  analysis?: string;
}

export interface './math/algebra';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './math/algebra';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
