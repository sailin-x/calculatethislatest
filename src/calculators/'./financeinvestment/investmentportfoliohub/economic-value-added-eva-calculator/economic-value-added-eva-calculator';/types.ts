export interface './financeinvestment/investmentportfoliohub/economic-value-added-eva-calculator/economic-value-added-eva-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './financeinvestment/investmentportfoliohub/economic-value-added-eva-calculator/economic-value-added-eva-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './financeinvestment/investmentportfoliohub/economic-value-added-eva-calculator/economic-value-added-eva-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './financeinvestment/investmentportfoliohub/economic-value-added-eva-calculator/economic-value-added-eva-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
