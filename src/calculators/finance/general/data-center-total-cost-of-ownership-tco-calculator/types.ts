export interface data_center_total_cost_of_ownership_tco_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface data_center_total_cost_of_ownership_tco_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface data_center_total_cost_of_ownership_tco_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface data_center_total_cost_of_ownership_tco_calculatorOutputs {
  result: number;
  analysis: data_center_total_cost_of_ownership_tco_calculatorAnalysis;
}
