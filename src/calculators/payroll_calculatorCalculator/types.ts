export interface payroll_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface payroll_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface payroll_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface payroll_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
