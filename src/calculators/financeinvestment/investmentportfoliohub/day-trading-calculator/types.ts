export interface day_trading_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface day_trading_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface day_trading_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface day_trading_calculatorOutputs {
  result: number;
  analysis: day_trading_calculatorAnalysis;
}
