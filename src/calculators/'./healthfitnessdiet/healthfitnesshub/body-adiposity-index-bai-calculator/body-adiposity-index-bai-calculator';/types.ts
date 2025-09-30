export interface './healthfitnessdiet/healthfitnesshub/body-adiposity-index-bai-calculator/body-adiposity-index-bai-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './healthfitnessdiet/healthfitnesshub/body-adiposity-index-bai-calculator/body-adiposity-index-bai-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './healthfitnessdiet/healthfitnesshub/body-adiposity-index-bai-calculator/body-adiposity-index-bai-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './healthfitnessdiet/healthfitnesshub/body-adiposity-index-bai-calculator/body-adiposity-index-bai-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
