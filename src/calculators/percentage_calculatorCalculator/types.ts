export interface percentage_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface percentage_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface percentage_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface percentage_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
