export interface sleep_calculatorCalculatorInputs {
  // Calculator-specific input fields
  value?: number;
  rate?: number;
  amount?: number;
  quantity?: number;
  // Add more fields as needed for this calculator
}

export interface sleep_calculatorCalculatorResults {
  result: number;
  analysis?: string;
}

export interface sleep_calculatorCalculatorMetrics {
  result: number;
  // Add more metrics as needed
}

export interface sleep_calculatorCalculatorAnalysis {
  recommendation: string;
  riskLevel: 'Low' | 'Medium' | 'High';
}
