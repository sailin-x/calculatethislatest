export interface './finance/price-per-square-foot/price_per_square_foot';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/price-per-square-foot/price_per_square_foot';Results {
  result: number;
  analysis?: string;
}

export interface './finance/price-per-square-foot/price_per_square_foot';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/price-per-square-foot/price_per_square_foot';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
