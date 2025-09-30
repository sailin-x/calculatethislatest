export interface ebitda_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface ebitda_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface ebitda_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface ebitda_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
