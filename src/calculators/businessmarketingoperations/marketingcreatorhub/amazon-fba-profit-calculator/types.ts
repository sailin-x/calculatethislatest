export interface amazon_fba_profit_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface amazon_fba_profit_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface amazon_fba_profit_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface amazon_fba_profit_calculatorOutputs {
  result: number;
  analysis: amazon_fba_profit_calculatorAnalysis;
}
