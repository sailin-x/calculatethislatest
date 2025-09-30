export interface growth_hormone_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface growth_hormone_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface growth_hormone_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface growth_hormone_calculatorOutputs {
  result: number;
  analysis: growth_hormone_calculatorAnalysis;
}
