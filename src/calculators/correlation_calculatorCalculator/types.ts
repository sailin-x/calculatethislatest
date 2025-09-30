export interface correlation_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface correlation_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface correlation_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface correlation_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
