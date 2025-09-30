export interface forex_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface forex_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface forex_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface forex_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
