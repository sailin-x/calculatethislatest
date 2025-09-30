export interface './finance/mortgage';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/mortgage';Results {
  result: number;
  analysis?: string;
}

export interface './finance/mortgage';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/mortgage';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
