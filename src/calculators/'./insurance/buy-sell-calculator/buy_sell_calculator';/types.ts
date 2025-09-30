export interface './insurance/buy-sell-calculator/buy_sell_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './insurance/buy-sell-calculator/buy_sell_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './insurance/buy-sell-calculator/buy_sell_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './insurance/buy-sell-calculator/buy_sell_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
