export interface thyroid_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface thyroid_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface thyroid_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface thyroid_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
