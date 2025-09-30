export interface './health/bmi-calculator/bmi-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/bmi-calculator/bmi-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/bmi-calculator/bmi-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/bmi-calculator/bmi-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
