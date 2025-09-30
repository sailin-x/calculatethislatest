export interface './math/matrix-calculator/matrix_calculator';Inputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface './math/matrix-calculator/matrix_calculator';Results {
  result: number;
  analysis?: string;
}

export interface './math/matrix-calculator/matrix_calculator';Metrics {
  result: number;
  // Add more metrics as needed
}

export interface './math/matrix-calculator/matrix_calculator';Analysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
