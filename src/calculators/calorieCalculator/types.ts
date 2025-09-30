export interface calorieCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface calorieCalculatorResults {
  result: number;
  analysis?: string;
}

export interface calorieCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface calorieCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
