export interface './healthfitnessdiet/healthfitnesshub/body-frame-size-calculator/body-frame-size-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './healthfitnessdiet/healthfitnesshub/body-frame-size-calculator/body-frame-size-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './healthfitnessdiet/healthfitnesshub/body-frame-size-calculator/body-frame-size-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './healthfitnessdiet/healthfitnesshub/body-frame-size-calculator/body-frame-size-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
