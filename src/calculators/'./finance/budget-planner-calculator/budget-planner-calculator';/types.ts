export interface './finance/budget-planner-calculator/budget-planner-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/budget-planner-calculator/budget-planner-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/budget-planner-calculator/budget-planner-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/budget-planner-calculator/budget-planner-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
