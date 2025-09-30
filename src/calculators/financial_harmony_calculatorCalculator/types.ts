export interface financial_harmony_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface financial_harmony_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface financial_harmony_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface financial_harmony_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
