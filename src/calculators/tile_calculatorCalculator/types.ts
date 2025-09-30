export interface tile_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface tile_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface tile_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface tile_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
