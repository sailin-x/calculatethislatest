export interface sortino_ratio_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface sortino_ratio_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface sortino_ratio_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface sortino_ratio_calculatorOutputs {
  result: number;
  analysis: sortino_ratio_calculatorAnalysis;
}
