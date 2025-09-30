export interface employee_turnover_cost_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface employee_turnover_cost_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface employee_turnover_cost_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface employee_turnover_cost_calculatorOutputs {
  result: number;
  analysis: employee_turnover_cost_calculatorAnalysis;
}
