export interface './financeinvestment/investmentportfoliohub/dividend-discount-model-ddm-calculator/dividend-discount-model-ddm-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './financeinvestment/investmentportfoliohub/dividend-discount-model-ddm-calculator/dividend-discount-model-ddm-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './financeinvestment/investmentportfoliohub/dividend-discount-model-ddm-calculator/dividend-discount-model-ddm-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './financeinvestment/investmentportfoliohub/dividend-discount-model-ddm-calculator/dividend-discount-model-ddm-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
