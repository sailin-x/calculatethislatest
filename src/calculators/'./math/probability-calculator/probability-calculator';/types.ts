export interface './math/probability-calculator/probability-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './math/probability-calculator/probability-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './math/probability-calculator/probability-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './math/probability-calculator/probability-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
