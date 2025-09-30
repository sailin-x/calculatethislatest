export interface './financeinvestment/cryptocurrencyhub/initial-coin-offering-calculator/initial-coin-offering-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './financeinvestment/cryptocurrencyhub/initial-coin-offering-calculator/initial-coin-offering-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './financeinvestment/cryptocurrencyhub/initial-coin-offering-calculator/initial-coin-offering-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './financeinvestment/cryptocurrencyhub/initial-coin-offering-calculator/initial-coin-offering-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
