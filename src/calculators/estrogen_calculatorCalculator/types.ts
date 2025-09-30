export interface estrogen_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface estrogen_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface estrogen_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface estrogen_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
