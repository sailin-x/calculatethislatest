export interface siding_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface siding_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface siding_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface siding_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
