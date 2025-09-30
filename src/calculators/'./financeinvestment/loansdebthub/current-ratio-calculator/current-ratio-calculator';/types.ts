export interface './financeinvestment/loansdebthub/current-ratio-calculator/current-ratio-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './financeinvestment/loansdebthub/current-ratio-calculator/current-ratio-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './financeinvestment/loansdebthub/current-ratio-calculator/current-ratio-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './financeinvestment/loansdebthub/current-ratio-calculator/current-ratio-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
