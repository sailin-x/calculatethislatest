export interface savings_goal_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface savings_goal_calculatorResults {
  result: number;
  analysis?: string;
}

export interface savings_goal_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface savings_goal_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
