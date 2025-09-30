export interface './finance/defi-yield-optimization-calculator/defi-yield-optimization-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/defi-yield-optimization-calculator/defi-yield-optimization-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/defi-yield-optimization-calculator/defi-yield-optimization-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/defi-yield-optimization-calculator/defi-yield-optimization-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
