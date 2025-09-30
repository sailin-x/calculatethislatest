export interface maximum_drawdown_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface maximum_drawdown_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface maximum_drawdown_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface maximum_drawdown_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
