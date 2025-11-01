export interface total_cost_of_ownership_for_commercial_fleet_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface total_cost_of_ownership_for_commercial_fleet_calculatorResults {
  result: number;
  analysis?: string;
}

export interface total_cost_of_ownership_for_commercial_fleet_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface total_cost_of_ownership_for_commercial_fleet_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
