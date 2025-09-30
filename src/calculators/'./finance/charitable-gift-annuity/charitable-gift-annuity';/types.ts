export interface './finance/charitable-gift-annuity/charitable-gift-annuity';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/charitable-gift-annuity/charitable-gift-annuity';Results {
  result: number;
  analysis?: string;
}

export interface './finance/charitable-gift-annuity/charitable-gift-annuity';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/charitable-gift-annuity/charitable-gift-annuity';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
