export interface dash_diet_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface dash_diet_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface dash_diet_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface dash_diet_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
