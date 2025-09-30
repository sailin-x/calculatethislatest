export interface './finance/mortgage-rate-lock/mortgage_rate_lock';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/mortgage-rate-lock/mortgage_rate_lock';Results {
  result: number;
  analysis?: string;
}

export interface './finance/mortgage-rate-lock/mortgage_rate_lock';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/mortgage-rate-lock/mortgage_rate_lock';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
