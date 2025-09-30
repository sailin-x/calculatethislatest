export interface grocery_budget_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface grocery_budget_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface grocery_budget_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface grocery_budget_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
