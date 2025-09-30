export interface glycemic_index_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface glycemic_index_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface glycemic_index_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface glycemic_index_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
