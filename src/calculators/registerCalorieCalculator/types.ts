export interface registerCalorieCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface registerCalorieCalculatorResults {
  result: number;
  analysis?: string;
}

export interface registerCalorieCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface registerCalorieCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
