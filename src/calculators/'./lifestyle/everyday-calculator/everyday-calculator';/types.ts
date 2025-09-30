export interface './lifestyle/everyday-calculator/everyday-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './lifestyle/everyday-calculator/everyday-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './lifestyle/everyday-calculator/everyday-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './lifestyle/everyday-calculator/everyday-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
