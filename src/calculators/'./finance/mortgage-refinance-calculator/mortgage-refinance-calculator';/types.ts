export interface './finance/mortgage-refinance-calculator/mortgage-refinance-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/mortgage-refinance-calculator/mortgage-refinance-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/mortgage-refinance-calculator/mortgage-refinance-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/mortgage-refinance-calculator/mortgage-refinance-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
