export interface ethereum_2_0_staking_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface ethereum_2_0_staking_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface ethereum_2_0_staking_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface ethereum_2_0_staking_calculatorOutputs {
  result: number;
  analysis: ethereum_2_0_staking_calculatorAnalysis;
}
