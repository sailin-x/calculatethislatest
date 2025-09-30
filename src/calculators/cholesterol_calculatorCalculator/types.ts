export interface cholesterol_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface cholesterol_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface cholesterol_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface cholesterol_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
