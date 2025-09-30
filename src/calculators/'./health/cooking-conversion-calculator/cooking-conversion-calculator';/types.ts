export interface './health/cooking-conversion-calculator/cooking-conversion-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/cooking-conversion-calculator/cooking-conversion-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/cooking-conversion-calculator/cooking-conversion-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/cooking-conversion-calculator/cooking-conversion-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
