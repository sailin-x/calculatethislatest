export interface defi_liquidity_pool_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface defi_liquidity_pool_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface defi_liquidity_pool_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface defi_liquidity_pool_calculatorOutputs {
  result: number;
  analysis: defi_liquidity_pool_calculatorAnalysis;
}
