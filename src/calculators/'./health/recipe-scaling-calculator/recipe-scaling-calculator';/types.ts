export interface './health/recipe-scaling-calculator/recipe-scaling-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/recipe-scaling-calculator/recipe-scaling-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/recipe-scaling-calculator/recipe-scaling-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/recipe-scaling-calculator/recipe-scaling-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
