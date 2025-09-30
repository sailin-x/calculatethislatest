export interface './finance/general/buy-sell-agreement-insurance-calculator/buy-sell-agreement-insurance-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/buy-sell-agreement-insurance-calculator/buy-sell-agreement-insurance-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/buy-sell-agreement-insurance-calculator/buy-sell-agreement-insurance-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/buy-sell-agreement-insurance-calculator/buy-sell-agreement-insurance-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
