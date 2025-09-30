export interface skewness_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface skewness_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface skewness_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface skewness_calculatorOutputs {
  result: number;
  analysis: skewness_calculatorAnalysis;
}
