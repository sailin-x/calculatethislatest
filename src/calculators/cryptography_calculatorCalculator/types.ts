export interface cryptography_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface cryptography_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface cryptography_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface cryptography_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
