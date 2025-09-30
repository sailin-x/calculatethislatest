export interface './finance/market-cap-calculator/market-cap-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/market-cap-calculator/market-cap-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/market-cap-calculator/market-cap-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/market-cap-calculator/market-cap-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
