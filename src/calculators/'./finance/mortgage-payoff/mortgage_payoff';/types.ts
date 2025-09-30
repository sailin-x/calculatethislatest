export interface './finance/mortgage-payoff/mortgage_payoff';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/mortgage-payoff/mortgage_payoff';Results {
  result: number;
  analysis?: string;
}

export interface './finance/mortgage-payoff/mortgage_payoff';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/mortgage-payoff/mortgage_payoff';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
