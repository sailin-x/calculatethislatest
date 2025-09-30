export interface probate_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface probate_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface probate_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface probate_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
