export interface data_center_total_cost_of_ownership_tco_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface data_center_total_cost_of_ownership_tco_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface data_center_total_cost_of_ownership_tco_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface data_center_total_cost_of_ownership_tco_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
