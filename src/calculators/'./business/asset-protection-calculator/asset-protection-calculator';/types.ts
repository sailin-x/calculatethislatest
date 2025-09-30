export interface './business/asset-protection-calculator/asset-protection-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/asset-protection-calculator/asset-protection-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/asset-protection-calculator/asset-protection-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/asset-protection-calculator/asset-protection-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
