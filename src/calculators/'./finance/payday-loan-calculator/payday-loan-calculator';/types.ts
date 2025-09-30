export interface './finance/payday-loan-calculator/payday-loan-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/payday-loan-calculator/payday-loan-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/payday-loan-calculator/payday-loan-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/payday-loan-calculator/payday-loan-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
