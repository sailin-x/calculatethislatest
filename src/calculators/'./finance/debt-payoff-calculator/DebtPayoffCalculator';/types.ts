export interface './finance/debt-payoff-calculator/DebtPayoffCalculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/debt-payoff-calculator/DebtPayoffCalculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/debt-payoff-calculator/DebtPayoffCalculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/debt-payoff-calculator/DebtPayoffCalculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
