export interface free_cash_flow_to_firm_fcff_valuationInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface free_cash_flow_to_firm_fcff_valuationMetrics {
  result: number;
  efficiency?: number;
}

export interface free_cash_flow_to_firm_fcff_valuationAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface free_cash_flow_to_firm_fcff_valuationOutputs {
  result: number;
  analysis: free_cash_flow_to_firm_fcff_valuationAnalysis;
}
