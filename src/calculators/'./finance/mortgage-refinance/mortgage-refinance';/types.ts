export interface './finance/mortgage-refinance/mortgage-refinance';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/mortgage-refinance/mortgage-refinance';Results {
  result: number;
  analysis?: string;
}

export interface './finance/mortgage-refinance/mortgage-refinance';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/mortgage-refinance/mortgage-refinance';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
