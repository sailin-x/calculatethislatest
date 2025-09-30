export interface './finance/debt-to-income-calculator/debt_to_income_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/debt-to-income-calculator/debt_to_income_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/debt-to-income-calculator/debt_to_income_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/debt-to-income-calculator/debt_to_income_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
