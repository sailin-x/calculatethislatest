export interface './math/machine-learning-calculator/machine_learning_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './math/machine-learning-calculator/machine_learning_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './math/machine-learning-calculator/machine_learning_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './math/machine-learning-calculator/machine_learning_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
