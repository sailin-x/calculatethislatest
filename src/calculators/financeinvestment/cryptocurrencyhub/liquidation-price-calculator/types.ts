export interface liquidation_price_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface liquidation_price_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface liquidation_price_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface liquidation_price_calculatorOutputs {
  result: number;
  analysis: liquidation_price_calculatorAnalysis;
}
