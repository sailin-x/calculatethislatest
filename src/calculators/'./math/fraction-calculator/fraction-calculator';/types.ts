export interface './math/fraction-calculator/fraction-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './math/fraction-calculator/fraction-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './math/fraction-calculator/fraction-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './math/fraction-calculator/fraction-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
