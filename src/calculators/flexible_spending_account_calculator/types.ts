export interface flexible_spending_account_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface flexible_spending_account_calculatorResults {
  result: number;
  analysis?: string;
}

export interface flexible_spending_account_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface flexible_spending_account_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
