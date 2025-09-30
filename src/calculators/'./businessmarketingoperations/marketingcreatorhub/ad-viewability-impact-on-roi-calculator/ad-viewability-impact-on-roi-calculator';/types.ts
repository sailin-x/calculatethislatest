export interface './businessmarketingoperations/marketingcreatorhub/ad-viewability-impact-on-roi-calculator/ad-viewability-impact-on-roi-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './businessmarketingoperations/marketingcreatorhub/ad-viewability-impact-on-roi-calculator/ad-viewability-impact-on-roi-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './businessmarketingoperations/marketingcreatorhub/ad-viewability-impact-on-roi-calculator/ad-viewability-impact-on-roi-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './businessmarketingoperations/marketingcreatorhub/ad-viewability-impact-on-roi-calculator/ad-viewability-impact-on-roi-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
