export interface './finance/debt-avalanche-calculator/DebtAvalancheCalculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/debt-avalanche-calculator/DebtAvalancheCalculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/debt-avalanche-calculator/DebtAvalancheCalculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/debt-avalanche-calculator/DebtAvalancheCalculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
