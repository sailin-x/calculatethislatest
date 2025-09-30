export interface airdrop_value_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface airdrop_value_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface airdrop_value_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface airdrop_value_calculatorOutputs {
  result: number;
  analysis: airdrop_value_calculatorAnalysis;
}
