export interface swing_trading_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface swing_trading_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface swing_trading_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface swing_trading_calculatorOutputs {
  result: number;
  analysis: swing_trading_calculatorAnalysis;
}
