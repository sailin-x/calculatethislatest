export interface registerFlexibleSpendingAccountCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerFlexibleSpendingAccountCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerFlexibleSpendingAccountCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerFlexibleSpendingAccountCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
