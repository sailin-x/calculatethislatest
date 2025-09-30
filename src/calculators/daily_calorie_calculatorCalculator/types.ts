export interface daily_calorie_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface daily_calorie_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface daily_calorie_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface daily_calorie_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
