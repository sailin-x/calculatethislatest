export interface employee_turnover_cost_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface employee_turnover_cost_calculatorResults {
  result: number;
  analysis?: string;
}

export interface employee_turnover_cost_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface employee_turnover_cost_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
