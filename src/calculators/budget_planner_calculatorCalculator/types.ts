export interface budget_planner_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface budget_planner_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface budget_planner_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface budget_planner_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
