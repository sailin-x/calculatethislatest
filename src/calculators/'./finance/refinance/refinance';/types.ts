export interface './finance/refinance/refinance';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/refinance/refinance';Results {
  result: number;
  analysis?: string;
}

export interface './finance/refinance/refinance';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/refinance/refinance';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
