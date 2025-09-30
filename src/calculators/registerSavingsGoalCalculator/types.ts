export interface registerSavingsGoalCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerSavingsGoalCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerSavingsGoalCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerSavingsGoalCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
