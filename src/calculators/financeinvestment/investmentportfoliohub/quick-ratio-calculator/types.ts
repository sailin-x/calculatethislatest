export interface quick_ratio_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface quick_ratio_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface quick_ratio_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface quick_ratio_calculatorOutputs {
  result: number;
  analysis: quick_ratio_calculatorAnalysis;
}
