export interface flooring_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface flooring_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface flooring_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface flooring_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
