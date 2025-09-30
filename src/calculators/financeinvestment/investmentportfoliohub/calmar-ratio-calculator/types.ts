export interface calmar_ratio_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface calmar_ratio_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface calmar_ratio_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface calmar_ratio_calculatorOutputs {
  result: number;
  analysis: calmar_ratio_calculatorAnalysis;
}
