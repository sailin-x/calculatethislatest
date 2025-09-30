export interface './finance/liquidation-price-calculator/liquidation-price-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/liquidation-price-calculator/liquidation-price-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/liquidation-price-calculator/liquidation-price-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/liquidation-price-calculator/liquidation-price-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
