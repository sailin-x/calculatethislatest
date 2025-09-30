export interface profit_margin_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface profit_margin_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface profit_margin_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface profit_margin_calculatorOutputs {
  result: number;
  analysis: profit_margin_calculatorAnalysis;
}
