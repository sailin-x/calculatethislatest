export interface './healthfitnessdiet/healthfitnesshub/a1c-calculator/a1c-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './healthfitnessdiet/healthfitnesshub/a1c-calculator/a1c-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './healthfitnessdiet/healthfitnesshub/a1c-calculator/a1c-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './healthfitnessdiet/healthfitnesshub/a1c-calculator/a1c-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
