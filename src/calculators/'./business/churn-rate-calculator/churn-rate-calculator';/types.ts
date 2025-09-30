export interface './business/churn-rate-calculator/churn-rate-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/churn-rate-calculator/churn-rate-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/churn-rate-calculator/churn-rate-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/churn-rate-calculator/churn-rate-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
