export interface './finance/general/return-on-ad-spend-roas-calculator/return-on-ad-spend-roas-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/return-on-ad-spend-roas-calculator/return-on-ad-spend-roas-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/return-on-ad-spend-roas-calculator/return-on-ad-spend-roas-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/return-on-ad-spend-roas-calculator/return-on-ad-spend-roas-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
