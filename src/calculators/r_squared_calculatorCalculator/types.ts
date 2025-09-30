export interface r_squared_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface r_squared_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface r_squared_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface r_squared_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
