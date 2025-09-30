export interface shitcoin_investment_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface shitcoin_investment_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface shitcoin_investment_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface shitcoin_investment_calculatorOutputs {
  result: number;
  analysis: shitcoin_investment_calculatorAnalysis;
}
