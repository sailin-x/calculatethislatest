export interface qui_tam_whistleblower_reward_calculatorInputs {
  amount: number;
  rate?: number;
  time?: number;
}

export interface qui_tam_whistleblower_reward_calculatorMetrics {
  result: number;
  efficiency?: number;
}

export interface qui_tam_whistleblower_reward_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}

export interface qui_tam_whistleblower_reward_calculatorOutputs {
  result: number;
  analysis: qui_tam_whistleblower_reward_calculatorAnalysis;
}
