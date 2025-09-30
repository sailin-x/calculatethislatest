export interface mortgage_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface mortgage_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface mortgage_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface mortgage_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
