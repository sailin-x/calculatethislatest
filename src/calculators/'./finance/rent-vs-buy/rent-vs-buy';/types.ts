export interface './finance/rent-vs-buy/rent-vs-buy';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/rent-vs-buy/rent-vs-buy';Results {
  result: number;
  analysis?: string;
}

export interface './finance/rent-vs-buy/rent-vs-buy';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/rent-vs-buy/rent-vs-buy';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
