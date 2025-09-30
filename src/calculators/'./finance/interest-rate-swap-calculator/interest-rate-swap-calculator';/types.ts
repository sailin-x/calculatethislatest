export interface './finance/interest-rate-swap-calculator/interest-rate-swap-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/interest-rate-swap-calculator/interest-rate-swap-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/interest-rate-swap-calculator/interest-rate-swap-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/interest-rate-swap-calculator/interest-rate-swap-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
