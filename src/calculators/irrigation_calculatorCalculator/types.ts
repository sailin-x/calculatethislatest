export interface irrigation_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface irrigation_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface irrigation_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface irrigation_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
