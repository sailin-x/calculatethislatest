export interface retirement_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface retirement_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface retirement_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface retirement_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
