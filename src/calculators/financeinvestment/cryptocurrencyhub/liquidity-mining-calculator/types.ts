export interface liquidity_mining_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface liquidity_mining_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface liquidity_mining_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface liquidity_mining_calculatorOutputs {
  result: number;
  analysis: liquidity_mining_calculatorAnalysis;
}
