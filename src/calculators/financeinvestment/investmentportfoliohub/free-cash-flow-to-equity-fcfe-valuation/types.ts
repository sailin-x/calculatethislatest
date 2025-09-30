export interface free_cash_flow_to_equity_fcfe_valuationInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface free_cash_flow_to_equity_fcfe_valuationMetrics {
  result: number;
  efficiency?: number;
}

export interface free_cash_flow_to_equity_fcfe_valuationAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface free_cash_flow_to_equity_fcfe_valuationOutputs {
  result: number;
  analysis: free_cash_flow_to_equity_fcfe_valuationAnalysis;
}
