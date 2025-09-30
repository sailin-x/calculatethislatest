export interface './health/pest-control-cost-calculator/pest_control_cost_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/pest-control-cost-calculator/pest_control_cost_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/pest-control-cost-calculator/pest_control_cost_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/pest-control-cost-calculator/pest_control_cost_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
