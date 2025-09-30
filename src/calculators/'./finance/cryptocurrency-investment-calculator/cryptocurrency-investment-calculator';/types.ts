export interface './finance/cryptocurrency-investment-calculator/cryptocurrency-investment-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/cryptocurrency-investment-calculator/cryptocurrency-investment-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/cryptocurrency-investment-calculator/cryptocurrency-investment-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/cryptocurrency-investment-calculator/cryptocurrency-investment-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
