export interface qui_tam_reward_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface qui_tam_reward_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface qui_tam_reward_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface qui_tam_reward_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
