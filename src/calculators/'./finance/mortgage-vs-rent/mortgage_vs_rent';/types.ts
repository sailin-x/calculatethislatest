export interface './finance/mortgage-vs-rent/mortgage_vs_rent';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/mortgage-vs-rent/mortgage_vs_rent';Results {
  result: number;
  analysis?: string;
}

export interface './finance/mortgage-vs-rent/mortgage_vs_rent';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/mortgage-vs-rent/mortgage_vs_rent';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
