export interface brick_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface brick_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface brick_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface brick_calculatorOutputs {
  result: number;
  analysis: brick_calculatorAnalysis;
}
