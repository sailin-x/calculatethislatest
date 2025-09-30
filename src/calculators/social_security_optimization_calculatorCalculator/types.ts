export interface social_security_optimization_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface social_security_optimization_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface social_security_optimization_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface social_security_optimization_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
