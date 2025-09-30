export interface restricted_stock_unit_rsu_vs_stock_option_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface restricted_stock_unit_rsu_vs_stock_option_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface restricted_stock_unit_rsu_vs_stock_option_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface restricted_stock_unit_rsu_vs_stock_option_calculatorOutputs {
  result: number;
  analysis: restricted_stock_unit_rsu_vs_stock_option_calculatorAnalysis;
}
