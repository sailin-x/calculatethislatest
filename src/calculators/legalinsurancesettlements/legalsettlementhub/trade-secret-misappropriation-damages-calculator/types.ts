export interface trade_secret_misappropriation_damages_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface trade_secret_misappropriation_damages_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface trade_secret_misappropriation_damages_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface trade_secret_misappropriation_damages_calculatorOutputs {
  result: number;
  analysis: trade_secret_misappropriation_damages_calculatorAnalysis;
}
