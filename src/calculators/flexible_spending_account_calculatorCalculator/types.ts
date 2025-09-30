export interface flexible_spending_account_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface flexible_spending_account_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface flexible_spending_account_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface flexible_spending_account_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
