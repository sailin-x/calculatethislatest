export interface health_savings_account_hsa_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface health_savings_account_hsa_calculatorResults {
  result: number;
  analysis?: string;
}

export interface health_savings_account_hsa_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface health_savings_account_hsa_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
