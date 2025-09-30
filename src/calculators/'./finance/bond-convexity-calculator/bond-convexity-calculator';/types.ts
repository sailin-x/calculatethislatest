export interface './finance/bond-convexity-calculator/bond-convexity-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/bond-convexity-calculator/bond-convexity-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/bond-convexity-calculator/bond-convexity-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/bond-convexity-calculator/bond-convexity-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
