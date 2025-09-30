export interface './financeinvestment/investmentportfoliohub/internal-rate-of-return-calculator/internal-rate-of-return-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './financeinvestment/investmentportfoliohub/internal-rate-of-return-calculator/internal-rate-of-return-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './financeinvestment/investmentportfoliohub/internal-rate-of-return-calculator/internal-rate-of-return-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './financeinvestment/investmentportfoliohub/internal-rate-of-return-calculator/internal-rate-of-return-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
