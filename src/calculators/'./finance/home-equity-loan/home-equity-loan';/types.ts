export interface './finance/home-equity-loan/home-equity-loan';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/home-equity-loan/home-equity-loan';Results {
  result: number;
  analysis?: string;
}

export interface './finance/home-equity-loan/home-equity-loan';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/home-equity-loan/home-equity-loan';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
