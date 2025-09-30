export interface glycemic_load_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface glycemic_load_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface glycemic_load_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface glycemic_load_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
