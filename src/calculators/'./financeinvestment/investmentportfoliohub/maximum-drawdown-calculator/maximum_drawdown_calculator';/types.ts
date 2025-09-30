export interface './financeinvestment/investmentportfoliohub/maximum-drawdown-calculator/maximum_drawdown_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './financeinvestment/investmentportfoliohub/maximum-drawdown-calculator/maximum_drawdown_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './financeinvestment/investmentportfoliohub/maximum-drawdown-calculator/maximum_drawdown_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './financeinvestment/investmentportfoliohub/maximum-drawdown-calculator/maximum_drawdown_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
