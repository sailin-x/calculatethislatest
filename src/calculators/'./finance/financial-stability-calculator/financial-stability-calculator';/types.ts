export interface './finance/financial-stability-calculator/financial-stability-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/financial-stability-calculator/financial-stability-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/financial-stability-calculator/financial-stability-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/financial-stability-calculator/financial-stability-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
