export interface './finance/mortgage-apr-comparison/mortgage_apr_comparison';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/mortgage-apr-comparison/mortgage_apr_comparison';Results {
  result: number;
  analysis?: string;
}

export interface './finance/mortgage-apr-comparison/mortgage_apr_comparison';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/mortgage-apr-comparison/mortgage_apr_comparison';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
