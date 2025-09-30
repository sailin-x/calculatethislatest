export interface health_savings_account_hsa_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface health_savings_account_hsa_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface health_savings_account_hsa_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface health_savings_account_hsa_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
