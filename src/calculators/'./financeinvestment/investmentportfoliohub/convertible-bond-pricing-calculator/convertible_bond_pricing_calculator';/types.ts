export interface './financeinvestment/investmentportfoliohub/convertible-bond-pricing-calculator/convertible_bond_pricing_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './financeinvestment/investmentportfoliohub/convertible-bond-pricing-calculator/convertible_bond_pricing_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './financeinvestment/investmentportfoliohub/convertible-bond-pricing-calculator/convertible_bond_pricing_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './financeinvestment/investmentportfoliohub/convertible-bond-pricing-calculator/convertible_bond_pricing_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
