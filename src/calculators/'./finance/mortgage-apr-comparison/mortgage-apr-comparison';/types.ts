export interface './finance/mortgage-apr-comparison/mortgage-apr-comparison';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/mortgage-apr-comparison/mortgage-apr-comparison';Results {
  result: number;
  analysis?: string;
}

export interface './finance/mortgage-apr-comparison/mortgage-apr-comparison';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/mortgage-apr-comparison/mortgage-apr-comparison';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
