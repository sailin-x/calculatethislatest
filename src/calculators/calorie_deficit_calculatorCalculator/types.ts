export interface calorie_deficit_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface calorie_deficit_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface calorie_deficit_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface calorie_deficit_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
