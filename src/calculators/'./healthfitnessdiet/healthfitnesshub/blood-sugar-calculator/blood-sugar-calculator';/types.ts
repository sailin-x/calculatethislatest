export interface './healthfitnessdiet/healthfitnesshub/blood-sugar-calculator/blood-sugar-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './healthfitnessdiet/healthfitnesshub/blood-sugar-calculator/blood-sugar-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './healthfitnessdiet/healthfitnesshub/blood-sugar-calculator/blood-sugar-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './healthfitnessdiet/healthfitnesshub/blood-sugar-calculator/blood-sugar-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
