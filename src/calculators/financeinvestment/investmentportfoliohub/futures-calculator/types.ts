export interface futures_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface futures_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface futures_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface futures_calculatorOutputs {
  result: number;
  analysis: futures_calculatorAnalysis;
}
