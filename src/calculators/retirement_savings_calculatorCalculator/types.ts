export interface retirement_savings_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface retirement_savings_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface retirement_savings_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface retirement_savings_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
