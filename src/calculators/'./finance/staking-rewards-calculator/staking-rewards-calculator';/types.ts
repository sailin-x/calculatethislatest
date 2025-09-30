export interface './finance/staking-rewards-calculator/staking-rewards-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/staking-rewards-calculator/staking-rewards-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/staking-rewards-calculator/staking-rewards-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/staking-rewards-calculator/staking-rewards-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
