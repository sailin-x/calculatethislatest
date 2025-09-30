export interface './lifestyle/lapse-rate-sensitivity-analysis/lapse-rate-sensitivity-analysis';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './lifestyle/lapse-rate-sensitivity-analysis/lapse-rate-sensitivity-analysis';Results {
  result: number;
  analysis?: string;
}

export interface './lifestyle/lapse-rate-sensitivity-analysis/lapse-rate-sensitivity-analysis';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './lifestyle/lapse-rate-sensitivity-analysis/lapse-rate-sensitivity-analysis';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
