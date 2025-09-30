export interface './finance/credit-default-swap-calculator/CreditDefaultSwapCalculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/credit-default-swap-calculator/CreditDefaultSwapCalculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/credit-default-swap-calculator/CreditDefaultSwapCalculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/credit-default-swap-calculator/CreditDefaultSwapCalculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
