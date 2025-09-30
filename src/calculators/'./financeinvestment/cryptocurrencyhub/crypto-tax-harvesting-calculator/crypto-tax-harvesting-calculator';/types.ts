export interface './financeinvestment/cryptocurrencyhub/crypto-tax-harvesting-calculator/crypto-tax-harvesting-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './financeinvestment/cryptocurrencyhub/crypto-tax-harvesting-calculator/crypto-tax-harvesting-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './financeinvestment/cryptocurrencyhub/crypto-tax-harvesting-calculator/crypto-tax-harvesting-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './financeinvestment/cryptocurrencyhub/crypto-tax-harvesting-calculator/crypto-tax-harvesting-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
