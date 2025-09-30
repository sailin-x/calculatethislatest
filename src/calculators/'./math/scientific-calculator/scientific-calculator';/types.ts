export interface './math/scientific-calculator/scientific-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './math/scientific-calculator/scientific-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './math/scientific-calculator/scientific-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './math/scientific-calculator/scientific-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
