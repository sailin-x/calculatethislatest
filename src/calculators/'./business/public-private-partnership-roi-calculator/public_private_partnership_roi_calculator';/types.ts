export interface './business/public-private-partnership-roi-calculator/public_private_partnership_roi_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/public-private-partnership-roi-calculator/public_private_partnership_roi_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/public-private-partnership-roi-calculator/public_private_partnership_roi_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/public-private-partnership-roi-calculator/public_private_partnership_roi_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
