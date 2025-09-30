export interface './finance/post-money-valuation-calculator/post-money-valuation-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/post-money-valuation-calculator/post-money-valuation-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/post-money-valuation-calculator/post-money-valuation-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/post-money-valuation-calculator/post-money-valuation-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
