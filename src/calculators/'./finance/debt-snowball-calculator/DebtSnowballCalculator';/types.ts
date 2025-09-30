export interface './finance/debt-snowball-calculator/DebtSnowballCalculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/debt-snowball-calculator/DebtSnowballCalculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/debt-snowball-calculator/DebtSnowballCalculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/debt-snowball-calculator/DebtSnowballCalculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
