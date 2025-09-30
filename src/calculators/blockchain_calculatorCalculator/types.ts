export interface blockchain_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface blockchain_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface blockchain_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface blockchain_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
