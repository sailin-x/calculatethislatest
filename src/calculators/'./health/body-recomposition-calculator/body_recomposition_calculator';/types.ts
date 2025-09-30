export interface './health/body-recomposition-calculator/body_recomposition_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/body-recomposition-calculator/body_recomposition_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/body-recomposition-calculator/body_recomposition_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/body-recomposition-calculator/body_recomposition_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
