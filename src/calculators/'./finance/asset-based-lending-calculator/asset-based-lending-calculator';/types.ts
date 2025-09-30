export interface './finance/asset-based-lending-calculator/asset-based-lending-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/asset-based-lending-calculator/asset-based-lending-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/asset-based-lending-calculator/asset-based-lending-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/asset-based-lending-calculator/asset-based-lending-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
