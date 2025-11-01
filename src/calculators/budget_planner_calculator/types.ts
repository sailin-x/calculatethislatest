export interface budget_planner_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface budget_planner_calculatorResults {
  result: number;
  analysis?: string;
}

export interface budget_planner_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface budget_planner_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
