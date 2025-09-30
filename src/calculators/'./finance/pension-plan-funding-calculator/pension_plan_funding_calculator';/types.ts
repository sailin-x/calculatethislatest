export interface './finance/pension-plan-funding-calculator/pension_plan_funding_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/pension-plan-funding-calculator/pension_plan_funding_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/pension-plan-funding-calculator/pension_plan_funding_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/pension-plan-funding-calculator/pension_plan_funding_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
