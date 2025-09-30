export interface './finance/financial-compliance-calculator/financial-compliance-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/financial-compliance-calculator/financial-compliance-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/financial-compliance-calculator/financial-compliance-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/financial-compliance-calculator/financial-compliance-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
