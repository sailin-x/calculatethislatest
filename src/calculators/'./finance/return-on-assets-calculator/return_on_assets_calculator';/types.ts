export interface './finance/return-on-assets-calculator/return_on_assets_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/return-on-assets-calculator/return_on_assets_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/return-on-assets-calculator/return_on_assets_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/return-on-assets-calculator/return_on_assets_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
