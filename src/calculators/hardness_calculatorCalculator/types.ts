export interface hardness_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface hardness_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface hardness_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface hardness_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
