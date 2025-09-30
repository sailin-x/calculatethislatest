export interface './finance/financial-sustainability-calculator/financial-sustainability-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/financial-sustainability-calculator/financial-sustainability-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/financial-sustainability-calculator/financial-sustainability-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/financial-sustainability-calculator/financial-sustainability-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
