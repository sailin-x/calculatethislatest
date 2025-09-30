export interface maximum_drawdown_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface maximum_drawdown_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface maximum_drawdown_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface maximum_drawdown_calculatorOutputs {
  result: number;
  analysis: maximum_drawdown_calculatorAnalysis;
}
