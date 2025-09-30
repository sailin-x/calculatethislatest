export interface estrogen_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface estrogen_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface estrogen_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface estrogen_calculatorOutputs {
  result: number;
  analysis: estrogen_calculatorAnalysis;
}
