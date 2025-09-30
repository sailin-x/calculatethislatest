export interface './math/statistics';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './math/statistics';Results {
  result: number;
  analysis?: string;
}

export interface './math/statistics';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './math/statistics';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
