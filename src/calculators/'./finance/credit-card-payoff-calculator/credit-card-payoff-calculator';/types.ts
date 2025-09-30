export interface './finance/credit-card-payoff-calculator/credit-card-payoff-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/credit-card-payoff-calculator/credit-card-payoff-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/credit-card-payoff-calculator/credit-card-payoff-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/credit-card-payoff-calculator/credit-card-payoff-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
