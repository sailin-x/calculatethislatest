export interface savingsGoalCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface savingsGoalCalculatorResults {
  result: number;
  analysis?: string;
}

export interface savingsGoalCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface savingsGoalCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
