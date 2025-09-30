export interface calories_burned_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface calories_burned_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface calories_burned_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface calories_burned_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
