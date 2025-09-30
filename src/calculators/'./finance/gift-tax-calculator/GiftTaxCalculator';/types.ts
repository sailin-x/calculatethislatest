export interface './finance/gift-tax-calculator/GiftTaxCalculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/gift-tax-calculator/GiftTaxCalculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/gift-tax-calculator/GiftTaxCalculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/gift-tax-calculator/GiftTaxCalculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
