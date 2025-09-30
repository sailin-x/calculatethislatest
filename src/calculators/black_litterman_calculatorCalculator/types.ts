export interface black_litterman_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface black_litterman_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface black_litterman_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface black_litterman_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
