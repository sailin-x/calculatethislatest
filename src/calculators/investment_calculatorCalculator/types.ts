export interface investment_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface investment_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface investment_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface investment_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
