export interface './finance/financial-goal-calculator/financial_goal_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/financial-goal-calculator/financial_goal_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/financial-goal-calculator/financial_goal_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/financial-goal-calculator/financial_goal_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
