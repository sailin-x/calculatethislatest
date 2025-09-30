export interface 401k_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface 401k_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface 401k_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface 401k_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
