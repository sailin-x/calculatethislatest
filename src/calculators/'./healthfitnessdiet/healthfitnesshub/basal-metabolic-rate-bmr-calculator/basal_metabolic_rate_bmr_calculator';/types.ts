export interface './healthfitnessdiet/healthfitnesshub/basal-metabolic-rate-bmr-calculator/basal_metabolic_rate_bmr_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './healthfitnessdiet/healthfitnesshub/basal-metabolic-rate-bmr-calculator/basal_metabolic_rate_bmr_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './healthfitnessdiet/healthfitnesshub/basal-metabolic-rate-bmr-calculator/basal_metabolic_rate_bmr_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './healthfitnessdiet/healthfitnesshub/basal-metabolic-rate-bmr-calculator/basal_metabolic_rate_bmr_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
