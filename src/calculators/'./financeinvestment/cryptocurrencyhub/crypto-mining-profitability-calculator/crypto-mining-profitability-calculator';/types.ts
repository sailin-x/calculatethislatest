export interface './financeinvestment/cryptocurrencyhub/crypto-mining-profitability-calculator/crypto-mining-profitability-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './financeinvestment/cryptocurrencyhub/crypto-mining-profitability-calculator/crypto-mining-profitability-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './financeinvestment/cryptocurrencyhub/crypto-mining-profitability-calculator/crypto-mining-profitability-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './financeinvestment/cryptocurrencyhub/crypto-mining-profitability-calculator/crypto-mining-profitability-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
