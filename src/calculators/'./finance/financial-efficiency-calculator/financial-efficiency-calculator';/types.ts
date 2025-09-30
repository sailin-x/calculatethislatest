export interface './finance/financial-efficiency-calculator/financial-efficiency-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/financial-efficiency-calculator/financial-efficiency-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/financial-efficiency-calculator/financial-efficiency-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/financial-efficiency-calculator/financial-efficiency-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
