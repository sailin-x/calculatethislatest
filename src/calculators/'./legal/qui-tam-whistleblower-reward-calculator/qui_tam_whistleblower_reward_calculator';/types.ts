export interface './legal/qui-tam-whistleblower-reward-calculator/qui_tam_whistleblower_reward_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './legal/qui-tam-whistleblower-reward-calculator/qui_tam_whistleblower_reward_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './legal/qui-tam-whistleblower-reward-calculator/qui_tam_whistleblower_reward_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './legal/qui-tam-whistleblower-reward-calculator/qui_tam_whistleblower_reward_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
