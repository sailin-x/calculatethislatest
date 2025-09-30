export interface './health/garden-yield-calculator/garden-yield-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './health/garden-yield-calculator/garden-yield-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './health/garden-yield-calculator/garden-yield-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './health/garden-yield-calculator/garden-yield-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
