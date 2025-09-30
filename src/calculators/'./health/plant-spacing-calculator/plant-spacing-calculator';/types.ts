export interface './health/plant-spacing-calculator/plant-spacing-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/plant-spacing-calculator/plant-spacing-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/plant-spacing-calculator/plant-spacing-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/plant-spacing-calculator/plant-spacing-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
