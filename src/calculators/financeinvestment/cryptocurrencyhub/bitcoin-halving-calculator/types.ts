export interface bitcoin_halving_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface bitcoin_halving_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface bitcoin_halving_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface bitcoin_halving_calculatorOutputs {
  result: number;
  analysis: bitcoin_halving_calculatorAnalysis;
}
