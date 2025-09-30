export interface './finance/financial-success-calculator/financial-success-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/financial-success-calculator/financial-success-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/financial-success-calculator/financial-success-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/financial-success-calculator/financial-success-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
