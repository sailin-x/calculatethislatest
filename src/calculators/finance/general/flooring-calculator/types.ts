export interface flooring_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface flooring_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface flooring_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface flooring_calculatorOutputs {
  result: number;
  analysis: flooring_calculatorAnalysis;
}
