export interface chlorine_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface chlorine_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface chlorine_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface chlorine_calculatorOutputs {
  result: number;
  analysis: chlorine_calculatorAnalysis;
}
