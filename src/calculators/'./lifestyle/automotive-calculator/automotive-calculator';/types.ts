export interface './lifestyle/automotive-calculator/automotive-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './lifestyle/automotive-calculator/automotive-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './lifestyle/automotive-calculator/automotive-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './lifestyle/automotive-calculator/automotive-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
