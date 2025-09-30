export interface './finance/cost-of-debt-calculator/CostOfDebtCalculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/cost-of-debt-calculator/CostOfDebtCalculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/cost-of-debt-calculator/CostOfDebtCalculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/cost-of-debt-calculator/CostOfDebtCalculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
