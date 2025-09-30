export interface financial_coaching_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface financial_coaching_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface financial_coaching_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface financial_coaching_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
