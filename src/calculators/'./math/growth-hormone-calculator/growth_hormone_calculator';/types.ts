export interface './math/growth-hormone-calculator/growth_hormone_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './math/growth-hormone-calculator/growth_hormone_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './math/growth-hormone-calculator/growth_hormone_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './math/growth-hormone-calculator/growth_hormone_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
