export interface portfolio_optimization_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface portfolio_optimization_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface portfolio_optimization_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface portfolio_optimization_calculatorOutputs {
  result: number;
  analysis: portfolio_optimization_calculatorAnalysis;
}
