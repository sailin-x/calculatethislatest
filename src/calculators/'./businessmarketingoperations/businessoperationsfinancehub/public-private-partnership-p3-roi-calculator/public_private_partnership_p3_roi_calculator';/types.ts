export interface './businessmarketingoperations/businessoperationsfinancehub/public-private-partnership-p3-roi-calculator/public_private_partnership_p3_roi_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './businessmarketingoperations/businessoperationsfinancehub/public-private-partnership-p3-roi-calculator/public_private_partnership_p3_roi_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './businessmarketingoperations/businessoperationsfinancehub/public-private-partnership-p3-roi-calculator/public_private_partnership_p3_roi_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './businessmarketingoperations/businessoperationsfinancehub/public-private-partnership-p3-roi-calculator/public_private_partnership_p3_roi_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
