export interface './finance/crypto-staking/crypto-staking';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/crypto-staking/crypto-staking';Results {
  result: number;
  analysis?: string;
}

export interface './finance/crypto-staking/crypto-staking';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/crypto-staking/crypto-staking';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
