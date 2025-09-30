export interface meal_prep_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface meal_prep_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface meal_prep_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface meal_prep_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
