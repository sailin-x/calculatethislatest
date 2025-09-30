export interface './finance/debt-to-income-calculator/debt-to-income-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/debt-to-income-calculator/debt-to-income-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/debt-to-income-calculator/debt-to-income-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/debt-to-income-calculator/debt-to-income-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
