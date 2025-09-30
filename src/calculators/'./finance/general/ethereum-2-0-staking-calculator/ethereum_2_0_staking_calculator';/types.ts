export interface './finance/general/ethereum-2-0-staking-calculator/ethereum_2_0_staking_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/ethereum-2-0-staking-calculator/ethereum_2_0_staking_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/ethereum-2-0-staking-calculator/ethereum_2_0_staking_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/ethereum-2-0-staking-calculator/ethereum_2_0_staking_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
