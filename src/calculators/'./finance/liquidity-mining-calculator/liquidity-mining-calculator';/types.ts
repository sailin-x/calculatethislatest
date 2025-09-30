export interface './finance/liquidity-mining-calculator/liquidity-mining-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/liquidity-mining-calculator/liquidity-mining-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/liquidity-mining-calculator/liquidity-mining-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/liquidity-mining-calculator/liquidity-mining-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
