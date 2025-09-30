export interface './finance/general/basal-metabolic-rate-bmr-calculator/basal-metabolic-rate-bmr-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/general/basal-metabolic-rate-bmr-calculator/basal-metabolic-rate-bmr-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/general/basal-metabolic-rate-bmr-calculator/basal-metabolic-rate-bmr-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/general/basal-metabolic-rate-bmr-calculator/basal-metabolic-rate-bmr-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
