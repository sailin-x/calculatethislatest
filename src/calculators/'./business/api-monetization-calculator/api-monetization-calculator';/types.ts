export interface './business/api-monetization-calculator/api-monetization-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './business/api-monetization-calculator/api-monetization-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './business/api-monetization-calculator/api-monetization-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './business/api-monetization-calculator/api-monetization-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
