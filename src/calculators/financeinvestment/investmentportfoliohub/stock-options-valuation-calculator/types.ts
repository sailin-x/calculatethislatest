export interface stock_options_valuation_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface stock_options_valuation_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface stock_options_valuation_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface stock_options_valuation_calculatorOutputs {
  result: number;
  analysis: stock_options_valuation_calculatorAnalysis;
}
