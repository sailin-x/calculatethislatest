export interface './finance/financial-integration-calculator/financial-integration-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/financial-integration-calculator/financial-integration-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/financial-integration-calculator/financial-integration-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/financial-integration-calculator/financial-integration-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
