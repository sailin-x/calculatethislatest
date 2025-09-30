export interface './finance/blockchain-gas-fee-calculator/blockchain-gas-fee-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/blockchain-gas-fee-calculator/blockchain-gas-fee-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/blockchain-gas-fee-calculator/blockchain-gas-fee-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/blockchain-gas-fee-calculator/blockchain-gas-fee-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
