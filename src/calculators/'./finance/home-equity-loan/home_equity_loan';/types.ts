export interface './finance/home-equity-loan/home_equity_loan';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/home-equity-loan/home_equity_loan';Results {
  result: number;
  analysis?: string;
}

export interface './finance/home-equity-loan/home_equity_loan';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/home-equity-loan/home_equity_loan';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
