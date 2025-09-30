export interface post_money_valuation_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface post_money_valuation_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface post_money_valuation_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface post_money_valuation_calculatorOutputs {
  result: number;
  analysis: post_money_valuation_calculatorAnalysis;
}
