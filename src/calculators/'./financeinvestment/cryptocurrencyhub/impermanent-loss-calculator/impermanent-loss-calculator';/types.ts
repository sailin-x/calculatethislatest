export interface './financeinvestment/cryptocurrencyhub/impermanent-loss-calculator/impermanent-loss-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './financeinvestment/cryptocurrencyhub/impermanent-loss-calculator/impermanent-loss-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './financeinvestment/cryptocurrencyhub/impermanent-loss-calculator/impermanent-loss-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './financeinvestment/cryptocurrencyhub/impermanent-loss-calculator/impermanent-loss-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
