export interface staking_rewards_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface staking_rewards_calculatorResults {
  result: number;
  analysis?: string;
}

export interface staking_rewards_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface staking_rewards_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
