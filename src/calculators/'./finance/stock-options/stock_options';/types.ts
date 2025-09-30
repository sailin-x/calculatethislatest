export interface './finance/stock-options/stock_options';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/stock-options/stock_options';Results {
  result: number;
  analysis?: string;
}

export interface './finance/stock-options/stock_options';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/stock-options/stock_options';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
