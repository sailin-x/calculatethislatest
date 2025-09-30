export interface './financeinvestment/investmentportfoliohub/tender-offer-valuation-calculator/tender_offer_valuation_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './financeinvestment/investmentportfoliohub/tender-offer-valuation-calculator/tender_offer_valuation_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './financeinvestment/investmentportfoliohub/tender-offer-valuation-calculator/tender_offer_valuation_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './financeinvestment/investmentportfoliohub/tender-offer-valuation-calculator/tender_offer_valuation_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
