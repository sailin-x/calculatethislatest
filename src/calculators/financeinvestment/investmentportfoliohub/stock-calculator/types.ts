export interface stock_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface stock_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface stock_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface stock_calculatorOutputs {
  result: number;
  analysis: stock_calculatorAnalysis;
}
