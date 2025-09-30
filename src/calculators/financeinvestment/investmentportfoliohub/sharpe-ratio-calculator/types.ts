export interface sharpe_ratio_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface sharpe_ratio_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface sharpe_ratio_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface sharpe_ratio_calculatorOutputs {
  result: number;
  analysis: sharpe_ratio_calculatorAnalysis;
}
