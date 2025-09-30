export interface './financeinvestment/investmentportfoliohub/tender-offer-valuation-calculator/tender-offer-valuation-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './financeinvestment/investmentportfoliohub/tender-offer-valuation-calculator/tender-offer-valuation-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './financeinvestment/investmentportfoliohub/tender-offer-valuation-calculator/tender-offer-valuation-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './financeinvestment/investmentportfoliohub/tender-offer-valuation-calculator/tender-offer-valuation-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
