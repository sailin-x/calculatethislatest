export interface technical_debt_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface technical_debt_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface technical_debt_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface technical_debt_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
