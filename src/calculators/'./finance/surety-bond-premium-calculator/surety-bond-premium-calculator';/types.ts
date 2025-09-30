export interface './finance/surety-bond-premium-calculator/surety-bond-premium-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/surety-bond-premium-calculator/surety-bond-premium-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/surety-bond-premium-calculator/surety-bond-premium-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/surety-bond-premium-calculator/surety-bond-premium-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
