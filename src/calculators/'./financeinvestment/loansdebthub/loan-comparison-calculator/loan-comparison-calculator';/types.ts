export interface './financeinvestment/loansdebthub/loan-comparison-calculator/loan-comparison-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './financeinvestment/loansdebthub/loan-comparison-calculator/loan-comparison-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './financeinvestment/loansdebthub/loan-comparison-calculator/loan-comparison-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './financeinvestment/loansdebthub/loan-comparison-calculator/loan-comparison-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
