export interface './business/ad-viewability-impact-on-roi-calculator/ad_viewability_impact_on_roi_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/ad-viewability-impact-on-roi-calculator/ad_viewability_impact_on_roi_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/ad-viewability-impact-on-roi-calculator/ad_viewability_impact_on_roi_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/ad-viewability-impact-on-roi-calculator/ad_viewability_impact_on_roi_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
