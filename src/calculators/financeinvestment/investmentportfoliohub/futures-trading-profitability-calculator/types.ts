export interface futures_trading_profitability_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface futures_trading_profitability_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface futures_trading_profitability_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface futures_trading_profitability_calculatorOutputs {
  result: number;
  analysis: futures_trading_profitability_calculatorAnalysis;
}
