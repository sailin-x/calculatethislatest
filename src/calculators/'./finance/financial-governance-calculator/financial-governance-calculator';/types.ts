export interface './finance/financial-governance-calculator/financial-governance-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/financial-governance-calculator/financial-governance-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/financial-governance-calculator/financial-governance-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/financial-governance-calculator/financial-governance-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
