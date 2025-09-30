export interface './finance/alpha-beta/alpha-beta';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/alpha-beta/alpha-beta';Results {
  result: number;
  analysis?: string;
}

export interface './finance/alpha-beta/alpha-beta';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/alpha-beta/alpha-beta';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
