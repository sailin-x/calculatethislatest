export interface './finance/general/irs-offer-in-compromise-oic-calculator/irs-offer-in-compromise-oic-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/irs-offer-in-compromise-oic-calculator/irs-offer-in-compromise-oic-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/irs-offer-in-compromise-oic-calculator/irs-offer-in-compromise-oic-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/irs-offer-in-compromise-oic-calculator/irs-offer-in-compromise-oic-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
