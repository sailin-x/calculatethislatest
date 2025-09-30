export interface './financeinvestment/investmentportfoliohub/stock-buyback-roi-calculator/stock-buyback-roi-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './financeinvestment/investmentportfoliohub/stock-buyback-roi-calculator/stock-buyback-roi-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './financeinvestment/investmentportfoliohub/stock-buyback-roi-calculator/stock-buyback-roi-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './financeinvestment/investmentportfoliohub/stock-buyback-roi-calculator/stock-buyback-roi-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
