export interface savings_goal_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface savings_goal_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface savings_goal_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface savings_goal_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
