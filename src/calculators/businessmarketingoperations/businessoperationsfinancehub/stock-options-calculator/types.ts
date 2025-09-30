export interface stock_options_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface stock_options_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface stock_options_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface stock_options_calculatorOutputs {
  result: number;
  analysis: stock_options_calculatorAnalysis;
}
