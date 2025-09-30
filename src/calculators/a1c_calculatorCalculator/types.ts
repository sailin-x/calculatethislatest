export interface a1c_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface a1c_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface a1c_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface a1c_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
