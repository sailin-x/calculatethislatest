export interface './health/nutrition-label-calculator/nutrition-label-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/nutrition-label-calculator/nutrition-label-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/nutrition-label-calculator/nutrition-label-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/nutrition-label-calculator/nutrition-label-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
