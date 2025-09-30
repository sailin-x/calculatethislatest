export interface workforce_planning_headcount_budget_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface workforce_planning_headcount_budget_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface workforce_planning_headcount_budget_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface workforce_planning_headcount_budget_calculatorOutputs {
  result: number;
  analysis: workforce_planning_headcount_budget_calculatorAnalysis;
}
