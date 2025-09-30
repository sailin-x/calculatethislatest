export interface './finance/mortgage-refinance/mortgage_refinance';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/mortgage-refinance/mortgage_refinance';Results {
  result: number;
  analysis?: string;
}

export interface './finance/mortgage-refinance/mortgage_refinance';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/mortgage-refinance/mortgage_refinance';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
