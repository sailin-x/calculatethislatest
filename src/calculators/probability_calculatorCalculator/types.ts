export interface probability_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface probability_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface probability_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface probability_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
