export interface free_cash_flow_to_equity_fcfe_valuationCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface free_cash_flow_to_equity_fcfe_valuationCalculatorResults {
  result: number;
  analysis?: string;
}

export interface free_cash_flow_to_equity_fcfe_valuationCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface free_cash_flow_to_equity_fcfe_valuationCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
