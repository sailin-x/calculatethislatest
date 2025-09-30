export interface './finance/health-savings-account-hsa-calculator/health-savings-account-hsa-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/health-savings-account-hsa-calculator/health-savings-account-hsa-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/health-savings-account-hsa-calculator/health-savings-account-hsa-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/health-savings-account-hsa-calculator/health-savings-account-hsa-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
