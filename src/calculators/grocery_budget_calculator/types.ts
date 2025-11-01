export interface grocery_budget_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface grocery_budget_calculatorResults {
  result: number;
  analysis?: string;
}

export interface grocery_budget_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface grocery_budget_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
