export interface cooking_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface cooking_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface cooking_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface cooking_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
