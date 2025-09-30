export interface './finance/financial-wellness-calculator/financial-wellness-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/financial-wellness-calculator/financial-wellness-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/financial-wellness-calculator/financial-wellness-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/financial-wellness-calculator/financial-wellness-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
