export interface './finance/mortgage-life/mortgage_life';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/mortgage-life/mortgage_life';Results {
  result: number;
  analysis?: string;
}

export interface './finance/mortgage-life/mortgage_life';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/mortgage-life/mortgage_life';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
