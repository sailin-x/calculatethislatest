export interface dogecoin_mining_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface dogecoin_mining_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface dogecoin_mining_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface dogecoin_mining_calculatorOutputs {
  result: number;
  analysis: dogecoin_mining_calculatorAnalysis;
}
