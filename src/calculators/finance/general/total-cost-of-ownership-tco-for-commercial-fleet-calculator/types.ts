export interface total_cost_of_ownership_tco_for_commercial_fleet_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface total_cost_of_ownership_tco_for_commercial_fleet_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface total_cost_of_ownership_tco_for_commercial_fleet_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface total_cost_of_ownership_tco_for_commercial_fleet_calculatorOutputs {
  result: number;
  analysis: total_cost_of_ownership_tco_for_commercial_fleet_calculatorAnalysis;
}
