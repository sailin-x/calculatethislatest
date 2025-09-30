export interface './finance/tax-calculator/tax-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/tax-calculator/tax-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/tax-calculator/tax-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/tax-calculator/tax-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
