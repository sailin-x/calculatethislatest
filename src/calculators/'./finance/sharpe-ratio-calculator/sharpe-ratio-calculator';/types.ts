export interface './finance/sharpe-ratio-calculator/sharpe-ratio-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/sharpe-ratio-calculator/sharpe-ratio-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/sharpe-ratio-calculator/sharpe-ratio-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/sharpe-ratio-calculator/sharpe-ratio-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
