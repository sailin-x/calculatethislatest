export interface black_litterman_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface black_litterman_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface black_litterman_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface black_litterman_calculatorOutputs {
  result: number;
  analysis: black_litterman_calculatorAnalysis;
}
