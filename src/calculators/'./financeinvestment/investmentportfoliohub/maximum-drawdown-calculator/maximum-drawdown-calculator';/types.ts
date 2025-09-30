export interface './financeinvestment/investmentportfoliohub/maximum-drawdown-calculator/maximum-drawdown-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './financeinvestment/investmentportfoliohub/maximum-drawdown-calculator/maximum-drawdown-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './financeinvestment/investmentportfoliohub/maximum-drawdown-calculator/maximum-drawdown-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './financeinvestment/investmentportfoliohub/maximum-drawdown-calculator/maximum-drawdown-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
