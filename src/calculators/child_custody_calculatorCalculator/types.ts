export interface child_custody_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface child_custody_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface child_custody_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface child_custody_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
