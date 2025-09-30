export interface complex_numbersCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface complex_numbersCalculatorResults {
  result: number;
  analysis?: string;
}

export interface complex_numbersCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface complex_numbersCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
