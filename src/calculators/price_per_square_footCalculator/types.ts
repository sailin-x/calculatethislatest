export interface price_per_square_footCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface price_per_square_footCalculatorResults {
  result: number;
  analysis?: string;
}

export interface price_per_square_footCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface price_per_square_footCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
