export interface './health/basal-metabolic-rate-calculator/basal-metabolic-rate-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/basal-metabolic-rate-calculator/basal-metabolic-rate-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/basal-metabolic-rate-calculator/basal-metabolic-rate-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/basal-metabolic-rate-calculator/basal-metabolic-rate-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
