export interface './health/keto-calculator/keto-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/keto-calculator/keto-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/keto-calculator/keto-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/keto-calculator/keto-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
