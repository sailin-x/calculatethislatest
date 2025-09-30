export interface body_recomposition_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface body_recomposition_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface body_recomposition_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface body_recomposition_calculatorOutputs {
  result: number;
  analysis: body_recomposition_calculatorAnalysis;
}
