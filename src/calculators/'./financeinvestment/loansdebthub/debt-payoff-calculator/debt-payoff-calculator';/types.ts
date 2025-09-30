export interface './financeinvestment/loansdebthub/debt-payoff-calculator/debt-payoff-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './financeinvestment/loansdebthub/debt-payoff-calculator/debt-payoff-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './financeinvestment/loansdebthub/debt-payoff-calculator/debt-payoff-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './financeinvestment/loansdebthub/debt-payoff-calculator/debt-payoff-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
