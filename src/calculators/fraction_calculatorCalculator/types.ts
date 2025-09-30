export interface fraction_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface fraction_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface fraction_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface fraction_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
