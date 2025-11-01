export interface calorie_cycling_calculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface calorie_cycling_calculatorResults {
  result: number;
  analysis?: string;
}

export interface calorie_cycling_calculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface calorie_cycling_calculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
