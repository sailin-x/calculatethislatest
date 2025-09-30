export interface './business/total-cost-of-ownership-for-commercial-fleet-calculator/total_cost_of_ownership_for_commercial_fleet_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/total-cost-of-ownership-for-commercial-fleet-calculator/total_cost_of_ownership_for_commercial_fleet_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/total-cost-of-ownership-for-commercial-fleet-calculator/total_cost_of_ownership_for_commercial_fleet_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/total-cost-of-ownership-for-commercial-fleet-calculator/total_cost_of_ownership_for_commercial_fleet_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
