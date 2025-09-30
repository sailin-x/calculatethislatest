export interface roofing_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface roofing_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface roofing_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface roofing_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
