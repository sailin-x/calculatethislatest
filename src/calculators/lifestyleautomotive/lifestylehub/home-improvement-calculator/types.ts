export interface home_improvement_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface home_improvement_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface home_improvement_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface home_improvement_calculatorOutputs {
  result: number;
  analysis: home_improvement_calculatorAnalysis;
}
