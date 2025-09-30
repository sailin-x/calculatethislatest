export interface './financeinvestment/investmentportfoliohub/distressed-debt-investing-roi-calculator/distressed-debt-investing-roi-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './financeinvestment/investmentportfoliohub/distressed-debt-investing-roi-calculator/distressed-debt-investing-roi-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './financeinvestment/investmentportfoliohub/distressed-debt-investing-roi-calculator/distressed-debt-investing-roi-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './financeinvestment/investmentportfoliohub/distressed-debt-investing-roi-calculator/distressed-debt-investing-roi-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
