export interface expense_ratio_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface expense_ratio_calculatorResults {
  result: number;
  analysis?: string;
}

export interface expense_ratio_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface expense_ratio_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
