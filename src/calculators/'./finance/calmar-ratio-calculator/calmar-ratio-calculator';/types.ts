export interface './finance/calmar-ratio-calculator/calmar-ratio-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './finance/calmar-ratio-calculator/calmar-ratio-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './finance/calmar-ratio-calculator/calmar-ratio-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './finance/calmar-ratio-calculator/calmar-ratio-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
