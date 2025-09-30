export interface correlation_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface correlation_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface correlation_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface correlation_calculatorOutputs {
  result: number;
  analysis: correlation_calculatorAnalysis;
}
