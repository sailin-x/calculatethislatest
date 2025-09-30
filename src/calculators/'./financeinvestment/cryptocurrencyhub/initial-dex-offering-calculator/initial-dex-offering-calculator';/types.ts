export interface './financeinvestment/cryptocurrencyhub/initial-dex-offering-calculator/initial-dex-offering-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './financeinvestment/cryptocurrencyhub/initial-dex-offering-calculator/initial-dex-offering-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './financeinvestment/cryptocurrencyhub/initial-dex-offering-calculator/initial-dex-offering-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './financeinvestment/cryptocurrencyhub/initial-dex-offering-calculator/initial-dex-offering-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
