export interface './financeinvestment/loansdebthub/car-loan-calculator/car-loan-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './financeinvestment/loansdebthub/car-loan-calculator/car-loan-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './financeinvestment/loansdebthub/car-loan-calculator/car-loan-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './financeinvestment/loansdebthub/car-loan-calculator/car-loan-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
