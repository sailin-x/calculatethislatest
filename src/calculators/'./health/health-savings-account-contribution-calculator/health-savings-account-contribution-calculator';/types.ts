export interface './health/health-savings-account-contribution-calculator/health-savings-account-contribution-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/health-savings-account-contribution-calculator/health-savings-account-contribution-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/health-savings-account-contribution-calculator/health-savings-account-contribution-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/health-savings-account-contribution-calculator/health-savings-account-contribution-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
