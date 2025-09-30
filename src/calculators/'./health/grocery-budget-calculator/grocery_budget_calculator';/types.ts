export interface './health/grocery-budget-calculator/grocery_budget_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/grocery-budget-calculator/grocery_budget_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/grocery-budget-calculator/grocery_budget_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/grocery-budget-calculator/grocery_budget_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
