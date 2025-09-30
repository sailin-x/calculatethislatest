export interface keto_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface keto_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface keto_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface keto_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
