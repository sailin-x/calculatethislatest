export interface './finance/futures-trading-profitability-calculator/futures-trading-profitability-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/futures-trading-profitability-calculator/futures-trading-profitability-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/futures-trading-profitability-calculator/futures-trading-profitability-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/futures-trading-profitability-calculator/futures-trading-profitability-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
