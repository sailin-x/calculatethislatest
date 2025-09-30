export interface './finance/corporate-tax-shield-calculator/corporate-tax-shield-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/corporate-tax-shield-calculator/corporate-tax-shield-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/corporate-tax-shield-calculator/corporate-tax-shield-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/corporate-tax-shield-calculator/corporate-tax-shield-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
