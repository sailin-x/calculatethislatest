export interface database_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface database_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface database_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface database_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
