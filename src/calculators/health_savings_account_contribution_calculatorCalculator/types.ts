export interface health_savings_account_contribution_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface health_savings_account_contribution_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface health_savings_account_contribution_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface health_savings_account_contribution_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
