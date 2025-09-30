export interface calorie_cycling_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface calorie_cycling_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface calorie_cycling_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface calorie_cycling_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
