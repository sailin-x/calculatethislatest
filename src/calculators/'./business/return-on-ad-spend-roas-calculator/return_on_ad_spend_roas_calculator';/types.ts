export interface './business/return-on-ad-spend-roas-calculator/return_on_ad_spend_roas_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/return-on-ad-spend-roas-calculator/return_on_ad_spend_roas_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/return-on-ad-spend-roas-calculator/return_on_ad_spend_roas_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/return-on-ad-spend-roas-calculator/return_on_ad_spend_roas_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
