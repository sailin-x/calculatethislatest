export interface employment_law_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface employment_law_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface employment_law_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface employment_law_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
