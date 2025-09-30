export interface './finance/financial-achievement-calculator/financial-achievement-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/financial-achievement-calculator/financial-achievement-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/financial-achievement-calculator/financial-achievement-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/financial-achievement-calculator/financial-achievement-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
