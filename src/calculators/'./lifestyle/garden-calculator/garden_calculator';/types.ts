export interface './lifestyle/garden-calculator/garden_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './lifestyle/garden-calculator/garden_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './lifestyle/garden-calculator/garden_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './lifestyle/garden-calculator/garden_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
