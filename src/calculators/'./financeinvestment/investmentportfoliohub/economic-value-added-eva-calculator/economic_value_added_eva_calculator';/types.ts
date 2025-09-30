export interface './financeinvestment/investmentportfoliohub/economic-value-added-eva-calculator/economic_value_added_eva_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './financeinvestment/investmentportfoliohub/economic-value-added-eva-calculator/economic_value_added_eva_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './financeinvestment/investmentportfoliohub/economic-value-added-eva-calculator/economic_value_added_eva_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './financeinvestment/investmentportfoliohub/economic-value-added-eva-calculator/economic_value_added_eva_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
