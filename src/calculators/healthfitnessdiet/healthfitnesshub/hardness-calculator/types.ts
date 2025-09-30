export interface hardness_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface hardness_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface hardness_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface hardness_calculatorOutputs {
  result: number;
  analysis: hardness_calculatorAnalysis;
}
