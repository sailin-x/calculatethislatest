export interface './finance/rent-vs-buy/rent_vs_buy';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/rent-vs-buy/rent_vs_buy';Results {
  result: number;
  analysis?: string;
}

export interface './finance/rent-vs-buy/rent_vs_buy';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/rent-vs-buy/rent_vs_buy';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
