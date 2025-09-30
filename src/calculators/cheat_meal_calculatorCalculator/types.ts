export interface cheat_meal_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface cheat_meal_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface cheat_meal_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface cheat_meal_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
