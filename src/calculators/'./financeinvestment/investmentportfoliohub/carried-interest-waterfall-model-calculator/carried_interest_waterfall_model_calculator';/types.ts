export interface './financeinvestment/investmentportfoliohub/carried-interest-waterfall-model-calculator/carried_interest_waterfall_model_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './financeinvestment/investmentportfoliohub/carried-interest-waterfall-model-calculator/carried_interest_waterfall_model_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './financeinvestment/investmentportfoliohub/carried-interest-waterfall-model-calculator/carried_interest_waterfall_model_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './financeinvestment/investmentportfoliohub/carried-interest-waterfall-model-calculator/carried_interest_waterfall_model_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
