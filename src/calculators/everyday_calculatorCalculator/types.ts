export interface everyday_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface everyday_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface everyday_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface everyday_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
