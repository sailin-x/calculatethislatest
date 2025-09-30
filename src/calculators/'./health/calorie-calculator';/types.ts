export interface './health/calorie-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/calorie-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/calorie-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/calorie-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
