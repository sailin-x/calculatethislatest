export interface './health/bmr-tdee/bmr-tdee';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/bmr-tdee/bmr-tdee';Results {
  result: number;
  analysis?: string;
}

export interface './health/bmr-tdee/bmr-tdee';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/bmr-tdee/bmr-tdee';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
