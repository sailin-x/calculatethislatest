export interface './math/statistics/statistics';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './math/statistics/statistics';Results {
  result: number;
  analysis?: string;
}

export interface './math/statistics/statistics';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './math/statistics/statistics';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
