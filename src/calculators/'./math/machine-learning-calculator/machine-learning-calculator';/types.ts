export interface './math/machine-learning-calculator/machine-learning-calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './math/machine-learning-calculator/machine-learning-calculator';Results {
  result: number;
  analysis?: string;
}

export interface './math/machine-learning-calculator/machine-learning-calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './math/machine-learning-calculator/machine-learning-calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
