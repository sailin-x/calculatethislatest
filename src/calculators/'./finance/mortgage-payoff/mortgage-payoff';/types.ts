export interface './finance/mortgage-payoff/mortgage-payoff';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/mortgage-payoff/mortgage-payoff';Results {
  result: number;
  analysis?: string;
}

export interface './finance/mortgage-payoff/mortgage-payoff';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/mortgage-payoff/mortgage-payoff';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
