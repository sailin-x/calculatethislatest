export interface options_trading_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface options_trading_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface options_trading_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface options_trading_calculatorOutputs {
  result: number;
  analysis: options_trading_calculatorAnalysis;
}
