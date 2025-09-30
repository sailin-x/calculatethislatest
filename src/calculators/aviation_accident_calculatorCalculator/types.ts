export interface aviation_accident_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface aviation_accident_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface aviation_accident_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface aviation_accident_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
