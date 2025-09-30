export interface './financeinvestment/investmentportfoliohub/compound-annual-growth-rate-cagr-calculator/compound_annual_growth_rate_cagr_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './financeinvestment/investmentportfoliohub/compound-annual-growth-rate-cagr-calculator/compound_annual_growth_rate_cagr_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './financeinvestment/investmentportfoliohub/compound-annual-growth-rate-cagr-calculator/compound_annual_growth_rate_cagr_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './financeinvestment/investmentportfoliohub/compound-annual-growth-rate-cagr-calculator/compound_annual_growth_rate_cagr_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
