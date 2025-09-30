export interface staking_rewards_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface staking_rewards_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface staking_rewards_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface staking_rewards_calculatorOutputs {
  result: number;
  analysis: staking_rewards_calculatorAnalysis;
}
